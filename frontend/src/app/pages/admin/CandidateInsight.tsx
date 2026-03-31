import { useParams, Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { MatchRing } from "../../components/ui/match-ring";
import {
  ArrowLeft,
  Mail,
  Phone,
  Award,
  MapPin,
  Calendar,
  Briefcase,
  FileText,
  CheckCircle,
  X,
  Download,
  ExternalLink,
} from "lucide-react";
import { Separator } from "../../components/ui/separator";

export default function CandidateInsight() {
  const { studentId } = useParams();

  const candidate = {
    id: studentId,
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    university: "Stanford University",
    department: "Computer Science",
    degree: "B.S. Computer Science",
    cgpa: 3.85,
    graduationYear: 2026,
    profileStrength: 85,
    matchScore: 92,
  };

  const resumeData = {
    summary:
      "Passionate software engineer with strong expertise in modern web technologies and a proven track record of building scalable applications.",
    experience: [
      {
        title: "Software Engineering Intern",
        company: "Tech Startup Inc.",
        duration: "Jun 2025 - Aug 2025",
        description: "Built full-stack features using React and Node.js, improving user engagement by 25%.",
      },
      {
        title: "Frontend Developer",
        company: "University Lab",
        duration: "Jan 2025 - May 2025",
        description: "Developed research data visualization tools using React and D3.js.",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        description: "Full-stack e-commerce platform with payment integration.",
      },
      {
        name: "Task Management App",
        tech: ["TypeScript", "React", "Firebase"],
        description: "Collaborative task management tool with real-time updates.",
      },
    ],
  };

  const extractedSkills = {
    technical: ["React", "TypeScript", "Node.js", "JavaScript", "Python", "Git", "MongoDB", "REST APIs"],
    soft: ["Problem Solving", "Team Collaboration", "Communication", "Leadership"],
  };

  const matchedSkills = ["React", "TypeScript", "Node.js", "JavaScript", "Git", "REST APIs", "Problem Solving"];
  const missingSkills = ["Google Cloud Platform", "Kubernetes", "Go"];

  const applications = [
    { company: "Google", role: "Software Engineer", status: "shortlisted", date: "March 25, 2026" },
    { company: "Microsoft", role: "Frontend Developer", status: "applied", date: "March 23, 2026" },
    { company: "Apple", role: "iOS Developer", status: "pending", date: "March 20, 2026" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-xl border-2" asChild>
            <Link to="/admin/students">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Candidate Insight</h1>
            <p className="text-muted-foreground">Detailed profile and analysis</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-xl border-2">
            <Download className="w-4 h-4 mr-2" />
            Export Profile
          </Button>
          <Button className="h-12 rounded-xl px-6 bg-gradient-brand border-0 shadow-md">
            <Mail className="w-4 h-4 mr-2" />
            Contact Student
          </Button>
        </div>
      </div>

      {/* Candidate Overview */}
      <Card className="p-8 border-2 space-y-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
            <div className="w-24 h-24 rounded-2xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-md">
              <span className="text-4xl font-bold text-white">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="space-y-4 flex-1 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{candidate.name}</h2>
                <p className="text-lg font-medium text-primary mt-1">{candidate.department}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 shrink-0 text-foreground/40" />
                  <span className="truncate">{candidate.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 shrink-0 text-foreground/40" />
                  {candidate.phone}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0 text-foreground/40" />
                  {candidate.location}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 shrink-0 text-foreground/40" />
                  Class of {candidate.graduationYear}
                </div>
              </div>
            </div>
          </div>
          
          <div className="shrink-0 flex flex-col items-center p-6 bg-card/50 rounded-2xl border-2 shadow-sm backdrop-blur-sm">
            <MatchRing score={candidate.matchScore} size={90} strokeWidth={8} />
            <span className="text-sm font-semibold text-muted-foreground mt-3 uppercase tracking-wider">Overall Match</span>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Academic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2 p-4 rounded-xl bg-accent/30 border border-border/50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Briefcase className="w-4 h-4 text-primary" />
              University
            </div>
            <p className="font-semibold text-foreground">{candidate.university}</p>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-accent/30 border border-border/50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Award className="w-4 h-4 text-primary" />
              Degree
            </div>
            <p className="font-semibold text-foreground">{candidate.degree}</p>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-accent/30 border border-border/50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Award className="w-4 h-4 text-primary" />
              CGPA
            </div>
            <p className="font-bold text-primary text-2xl leading-none">{candidate.cgpa}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Resume Review */}
          <Card className="p-8 border-2 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Resume Review</h3>
                <p className="text-muted-foreground mt-1 text-sm">Automated parsing and extraction</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-2">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original
              </Button>
            </div>

            <div className="space-y-8">
              {/* Summary */}
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 font-bold text-foreground text-lg">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  Professional Summary
                </h4>
                <p className="text-muted-foreground leading-relaxed pl-10 border-l-2 border-primary/20 bg-accent/20 p-4 rounded-r-xl">{resumeData.summary}</p>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-bold text-foreground text-lg">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                  </div>
                  Experience
                </h4>
                <div className="space-y-4 pl-10">
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="space-y-2 p-5 border-2 rounded-xl bg-card hover:border-primary/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h5 className="font-bold text-foreground">{exp.title}</h5>
                          <p className="text-sm font-medium text-primary mt-0.5">{exp.company}</p>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-accent px-2.5 py-1 rounded-md">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 font-bold text-foreground text-lg">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  Projects
                </h4>
                <div className="space-y-4 pl-10">
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="space-y-3 p-5 border-2 rounded-xl bg-card hover:border-primary/40 transition-colors">
                      <h5 className="font-bold text-foreground">{project.name}</h5>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="rounded-md bg-accent/50 text-xs font-semibold px-2">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Profile Strength */}
          <Card className="p-6 border-2 space-y-5">
            <h3 className="text-lg font-bold tracking-tight">Profile Strength</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold tracking-tight text-foreground">{candidate.profileStrength}<span className="text-xl text-muted-foreground">%</span></span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Excellent</span>
              </div>
              <Progress value={candidate.profileStrength} className="h-3" />
            </div>
            <p className="text-sm text-muted-foreground">
              Candidate has provided comprehensive details across all profile sections.
            </p>
          </Card>

          {/* Extracted Skills */}
          <Card className="p-6 border-2 space-y-6">
            <h3 className="text-lg font-bold tracking-tight">Extracted Skills</h3>
            
            <div className="space-y-5">
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Technical</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.technical.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-md font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.soft.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-md font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Skills Gap Assessment */}
          <Card className="p-6 border-2 space-y-6 bg-gradient-to-br from-card to-accent/20">
            <h3 className="text-lg font-bold tracking-tight">Gap Assessment</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <h4 className="font-semibold text-sm">Key Matched Skills</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-6">
                  {matchedSkills.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-emerald-100/50 text-emerald-700 font-medium text-[11px] border border-emerald-200">
                      {skill}
                    </span>
                  ))}
                  {matchedSkills.length > 4 && (
                    <span className="px-2 py-1 rounded-md bg-accent text-muted-foreground font-medium text-[11px]">
                      +{matchedSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-500" />
                  <h4 className="font-semibold text-sm">Missing for Top Roles</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-6">
                  {missingSkills.map((skill) => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-rose-50 text-rose-700 font-medium text-[11px] border border-rose-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Application History */}
      <Card className="p-8 border-2 space-y-6">
        <h3 className="text-2xl font-bold tracking-tight">Application Activity</h3>
        <div className="space-y-3">
          {applications.map((app, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border-2 hover:border-primary/40 bg-card transition-colors gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-base leading-tight">{app.role}</p>
                  <p className="text-sm font-medium text-muted-foreground mt-1">{app.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 justify-between sm:justify-end">
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {app.date}
                </span>
                <Badge
                  variant="secondary"
                  className={`rounded-lg px-3 py-1 font-bold ${
                    app.status === "shortlisted"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : app.status === "applied"
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-amber-100 text-amber-700 border border-amber-200"
                  }`}
                >
                  {app.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
