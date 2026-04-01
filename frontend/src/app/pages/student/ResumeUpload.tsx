import { useState, useCallback } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Upload, FileText, CheckCircle, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { uploadResume, updateStudent, saveResumeData, auth } from "../../services/firebase";
import { calculateMatch, extractSkillsFromText } from "../../services/matcher";
import { KNOWN_SKILLS } from "../../config/skills";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

// Set worker for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    
    return fullText;
  };

  const extractTextFromImage = async (file: File): Promise<string> => {
    const result = await Tesseract.recognize(file, 'eng');
    return result.data.text;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.type.startsWith("image/"))) {
      setFile(droppedFile);
    } else {
      setError("Please upload a PDF or Image file.");
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
      } else {
        setError("Please upload a PDF or Image file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !auth.currentUser) return;
    
    setIsUploading(true);
    setError(null);
    try {
      const { downloadUrl, fileName } = await uploadResume(file, auth.currentUser.uid);
      
      await updateStudent(auth.currentUser.uid, {
        resumeUrl: downloadUrl,
        resumeFileName: fileName
      });
      
      setIsUploading(false);
      setUploadComplete(true);
    } catch (err: any) {
      setError("Upload failed: " + err.message);
      setIsUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file || !auth.currentUser) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      // 1. Extract Text
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (file.type.startsWith("image/")) {
        text = await extractTextFromImage(file);
      }

      // 2. Perform AI Analysis (Prioritize Remote AI Engine if available, else use Local)
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      let extractedSkills: string[] = [];
      
      if (backendUrl) {
        try {
          const response = await fetch(`${backendUrl}/analyze-resume`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resume_text: text })
          });
          if (response.ok) {
            const data = await response.json();
            extractedSkills = data.skills;
          } else {
            console.warn("AI Engine failed, falling back to client-side extraction");
            extractedSkills = extractSkillsFromText(text, KNOWN_SKILLS);
          }
        } catch (err) {
          console.warn("AI Engine unreachable, falling back to client-side extraction");
          extractedSkills = extractSkillsFromText(text, KNOWN_SKILLS);
        }
      } else {
        extractedSkills = extractSkillsFromText(text, KNOWN_SKILLS);
      }
      
      const uid = auth.currentUser.uid;

      // 3. Update Student Profile in Firestore (current skills AND text)
      await updateStudent(uid, {
        skills: extractedSkills,
        resumeText: text,
        lastAnalyzed: new Date().toISOString()
      });

      // 4. Save Record
      await saveResumeData(uid, {
        fileUrl: "local_blob", 
        extractedText: text,
        extractedSkills: extractedSkills
      });

      setIsAnalyzing(false);
    } catch (err: any) {
      setError("Analysis failed: " + err.message);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Resume Upload</h1>
        <p className="text-muted-foreground text-lg">
          Upload your resume to get AI-powered insights and job matches
        </p>
      </div>

      {error && (
        <Card className="p-4 border-destructive/50 bg-destructive/10 text-destructive flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </Card>
      )}

      <Card
        className={`p-12 border-2 border-dashed transition-all ${
          isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${
            isDragging ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
          }`}>
            <Upload className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{isDragging ? "Drop your resume here" : "Drag and drop your resume"}</h3>
            <p className="text-muted-foreground">or click to browse files</p>
            <p className="text-sm text-muted-foreground">PDF or Image format recommended (Max 10MB)</p>
          </div>
          <input type="file" id="fileInput" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileInput} className="hidden" />
          <Button variant="outline" className="h-12 rounded-xl px-8 border-2" onClick={() => document.getElementById("fileInput")?.click()}>
            Browse Files
          </Button>
        </div>
      </Card>

      {file && (
        <Card className="p-6 border-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 w-full min-w-0">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <h3 className="font-semibold truncate">{file.name}</h3>
                <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                {uploadComplete && (
                  <div className="flex items-center gap-2 text-green-600 mt-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload complete</span>
                  </div>
                )}
              </div>
            </div>
            {!uploadComplete ? (
              <Button onClick={handleUpload} disabled={isUploading} className="w-full sm:w-auto h-12 rounded-xl px-8 shrink-0">
                {isUploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Uploading...</> : "Upload"}
              </Button>
            ) : (
              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full sm:w-auto h-12 rounded-xl px-8 shrink-0">
                {isAnalyzing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing...</> : "Analyze Resume"}
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Previous Uploads Mock */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Previous Uploads</h2>
        <div className="space-y-3">
          {[
            { name: "Resume_Alex_Johnson_v2.pdf", date: "March 20, 2026", status: "analyzed" },
            { name: "Resume_Alex_Johnson_v1.pdf", date: "March 15, 2026", status: "analyzed" },
          ].map((upload, index) => (
            <Card key={index} className="p-4 border-2 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium truncate">{upload.name}</h4>
                    <p className="text-sm text-muted-foreground">{upload.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 font-medium">Analyzed</span>
                  <Button variant="ghost" size="sm" className="rounded-lg">View Results</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
