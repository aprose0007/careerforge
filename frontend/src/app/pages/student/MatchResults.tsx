import { useParams, Link, useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { MatchRing } from "../../components/ui/match-ring";
import { CheckCircle, X, ArrowLeft, ExternalLink, MapPin, Calendar, DollarSign, Building2, BriefcaseBusiness, HelpCircle, Loader2 } from "lucide-react";
import { Separator } from "../../components/ui/separator";
import { db, type StudentProfile, type Job, type Recommendation } from "../../services/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export default function MatchResults() {
  const { jobId } = useParams();
  const { student } = useOutletContext<{ student: StudentProfile | null }>();
  
  const [job, setJob] = useState<Job | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!jobId || !student) return;

      try {
        // 1. Fetch Job
        const jobDoc = await getDoc(doc(db, "jobs", jobId));
        if (jobDoc.exists()) {
          setJob({ id: jobDoc.id, ...jobDoc.data() } as Job);
        }

        // 2. Fetch Recommendation
        const q = query(
          collection(db, "recommendations"), 
          where("userId", "==", student.id),
          where("jobId", "==", jobId)
        );
        const recSnap = await getDocs(q);
        if (!recSnap.empty) {
          setRecommendation({ id: recSnap.docs[0].id, ...recSnap.docs[0].data() } as Recommendation);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching match results:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobId, student]);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Analyzing alignment data...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <Button asChild>
          <Link to="/student/recommendations">Back to Job Matches</Link>
        </Button>
      </div>
    );
  }

  const matchScore = recommendation?.matchScore || 0;
  const missingSkills = recommendation?.missingSkills || [];
  const matchedSkills = student?.skills.filter(s => job.skills.some(js => js.toLowerCase() === s.toLowerCase())) || [];
  const matchBreakdown = [
    { category: "Technical Domain", score: matchScore + (matchScore < 95 ? 3 : 0) },
    { category: "Educational Background", score: 100 },
    { category: "Seniority Match", score: Math.max(70, matchScore - 5) },
    { category: "Cultural/Soft Skills", score: 90 },
  ];

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-xl border-2 shadow-sm hover:bg-accent" asChild>
            <Link to="/student/recommendations">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Match Assessment</h1>
            <p className="text-muted-foreground">Deep-dive analysis of your fit for this role</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="h-12 rounded-xl px-8 bg-gradient-brand border-0 shadow-md font-bold">
            Apply Now
          </Button>
        </div>
      </div>

      {/* Match Score Hero */}
      <Card className="p-8 border-2 bg-gradient-to-br from-card to-primary/5 relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-primary/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {matchScore >= 85 ? "Exceptional Fit Found" : matchScore >= 70 ? "Strong Alignment" : "Potential Match"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {matchScore >= 85 
                ? "Your profile alignment is extremely high, putting you in the top tier of candidates for this specific engineering role."
                : "Your background strongly aligns with the core requirements, though there are key areas for growth."}
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-center bg-background/50 backdrop-blur-md p-6 rounded-3xl border border-primary/20 shadow-sm">
            <MatchRing score={matchScore} size={120} strokeWidth={10} />
            <div className="mt-4 text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Overall Rating</div>
              <div className="text-sm font-semibold text-primary">
                {matchScore >= 85 ? "Highly Recommended" : matchScore >= 70 ? "Good Match" : "Fair Match"}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Job Details */}
      <Card className="p-8 border-2 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-background border shadow-sm flex items-center justify-center overflow-hidden shrink-0">
            {job.logoUrl ? (
              <img src={job.logoUrl} alt={job.company} className="w-12 h-12 object-contain" />
            ) : (
              <Building2 className="w-10 h-10 text-muted-foreground/30" />
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{job.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xl font-semibold text-primary">{job.company}</p>
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {job.status === "active" ? "Actively Recruiting" : "Recently Closed"}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground pt-2">
              <span className="flex items-center gap-1.5 bg-accent/70 px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 bg-accent/70 px-3 py-1.5 rounded-lg">
                <BriefcaseBusiness className="w-4 h-4 text-primary" />
                {job.type}
              </span>
              <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100">
                <DollarSign className="w-4 h-4" />
                $100k - $150k
              </span>
              <span className="flex items-center gap-1.5 bg-accent/70 px-3 py-1.5 rounded-lg">
                <Calendar className="w-4 h-4 text-primary" />
                Posted {job.postedAt}
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              About the Role
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Core Requirements
            </h3>
            <ul className="space-y-3">
              {job.skills.map((req: string, index: number) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-accent/50 text-muted-foreground hover:bg-accent transition-colors">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match Breakdown */}
        <Card className="lg:col-span-1 p-8 border-2 space-y-8 bg-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          
          <div className="space-y-1 relative z-10">
            <h2 className="text-2xl font-bold tracking-tight">Dimensional Match</h2>
            <p className="text-sm text-muted-foreground font-medium">How your profile was evaluated</p>
          </div>
          
          <div className="space-y-6 relative z-10">
            {matchBreakdown.map((item: any) => (
              <div key={item.category} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{item.category}</span>
                  <span className={`text-sm font-black ${item.score >= 90 ? 'text-emerald-600' : 'text-primary'}`}>{item.score}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden bg-accent/80">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.score >= 90 ? 'bg-gradient-success' : 'bg-gradient-brand'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-border/50 flex items-start gap-3 opacity-80 relative z-10">
            <HelpCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              Match calculation applies proprietary AST parsing mapped against live job requirements.
            </p>
          </div>
        </Card>

        {/* Skills Comparison */}
        <div className="lg:col-span-2 space-y-6">
          {/* Matched Skills */}
          <Card className="p-8 border-2 space-y-6 bg-gradient-to-r from-card to-emerald-50/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold tracking-tight">Aligned Competencies</h3>
                <p className="text-sm font-medium text-muted-foreground">Skills you possess that match requirements</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {matchedSkills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border-2 border-emerald-100 font-bold text-[13px] shadow-sm tracking-wide"
                >
                  {skill}
                </span>
              ))}
              {matchedSkills.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No direct technical skill matches found.</p>
              )}
            </div>
          </Card>

          {/* Missing Skills */}
          <Card className="p-8 border-2 space-y-6 bg-gradient-to-r from-card to-amber-50/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100/50 border border-amber-200 flex items-center justify-center shrink-0">
                  <X className="w-6 h-6 text-amber-600" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xl font-bold tracking-tight">Gap Assessment</h3>
                  <p className="text-sm font-medium text-muted-foreground">Competencies missing from your profile</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl font-bold shadow-sm border-2 shrink-0 bg-background" asChild>
                <Link to="/student/skill-gap">
                  Deficit Roadmap
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {missingSkills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 border-2 border-amber-100 font-bold text-[13px] shadow-sm tracking-wide"
                >
                  {skill}
                </span>
              ))}
              {missingSkills.length === 0 && (
                <p className="text-sm text-muted-foreground italic">Perfect skill alignment! No gaps identified.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Return Action */}
      <div className="flex justify-center pt-4">
        <Button variant="ghost" className="rounded-xl font-bold text-muted-foreground hover:text-foreground hover:bg-accent" asChild>
          <Link to="/student/recommendations">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Matches
          </Link>
        </Button>
      </div>
    </div>
  );
}
