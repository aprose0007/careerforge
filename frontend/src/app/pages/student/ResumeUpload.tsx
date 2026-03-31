import { useState, useCallback } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Upload, FileText, CheckCircle, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { uploadResume, updateStudent, saveResumeData } from "../../services/firebase";
import * as pdfjsLib from "pdfjs-dist";

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
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      setError("Please upload a PDF file.");
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        setError("Please upload a PDF file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    try {
      // 1. Upload to Firebase Storage
      const { downloadUrl, fileName } = await uploadResume(file, "current-user-id");
      
      // 2. Update Student Profile in Firestore
      await updateStudent("current-user-id", {
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
    if (!file) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      // 1. Extract Text
      const text = await extractTextFromPDF(file);
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/analyze-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: text })
      });
      
      if (!response.ok) throw new Error("AI Analysis failed");
      
      const data = await response.json();
      
      // 3. Update Student Profile in Firestore (current skills)
      await updateStudent("current-user-id", {
        skills: data.skills,
        lastAnalyzed: new Date().toISOString()
      });

      // 4. Save to 'resumes' collection
      await saveResumeData("current-user-id", {
        fileUrl: "https://example.com/resumes/current-user-id/" + file.name, // Mock URL if needed
        extractedText: text,
        extractedSkills: data.skills
      });

      setIsAnalyzing(false);
      // Navigate or show success
    } catch (err: any) {
      setError("Analysis failed: " + err.message + ". Make sure the AI Backend is running.");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Resume Upload</h1>
        <p className="text-muted-foreground text-lg">
          Upload your resume to get AI-powered insights and job matches
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className="p-4 border-destructive/50 bg-destructive/10 text-destructive flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </Card>
      )}

      {/* Upload Zone */}
      <Card
        className={`p-12 border-2 border-dashed transition-all ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${
              isDragging ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
            }`}
          >
            <Upload className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              {isDragging ? "Drop your resume here" : "Drag and drop your resume"}
            </h3>
            <p className="text-muted-foreground">or click to browse files</p>
            <p className="text-sm text-muted-foreground">PDF format recommended (Max 10MB)</p>
          </div>

          <input
            type="file"
            id="fileInput"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            className="hidden"
          />
          <Button
            variant="outline"
            className="h-12 rounded-xl px-8 border-2"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Browse Files
          </Button>
        </div>
      </Card>

      {/* File Preview */}
      {file && (
        <Card className="p-6 border-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{file.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                {uploadComplete && (
                  <div className="flex items-center gap-2 text-green-600 mt-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Upload complete</span>
                  </div>
                )}
              </div>
            </div>

            {!uploadComplete ? (
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="h-12 rounded-xl px-8"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="h-12 rounded-xl px-8"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Previous Uploads */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Previous Uploads</h2>
        
        <div className="space-y-3">
          {[
            { name: "Resume_Alex_Johnson_v2.pdf", date: "March 20, 2026", status: "analyzed" },
            { name: "Resume_Alex_Johnson_v1.pdf", date: "March 15, 2026", status: "analyzed" },
          ].map((upload, index) => (
            <Card key={index} className="p-4 border-2 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{upload.name}</h4>
                    <p className="text-sm text-muted-foreground">{upload.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 font-medium">
                    Analyzed
                  </span>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    View Results
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips */}
      <Card className="p-6 border-2 bg-accent/30">
        <h3 className="font-semibold mb-3">Tips for best results</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Use a PDF format for best parsing accuracy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Ensure your resume is up-to-date with latest skills and experience</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Include relevant keywords related to your target positions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Keep formatting simple and avoid complex layouts</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
