// AI API Service Layer
// Replace BASE_URL with your actual AI backend endpoint

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://api.resumeai.example.com";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ResumeAnalysis {
  summary: string;
  extractedSkills: {
    technical: string[];
    soft: string[];
  };
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  overallScore: number;
}

export interface JobRecommendation {
  jobId: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  logoUrl?: string;
  postedAt: string;
}

export interface SkillGapResult {
  overallReadiness: number;
  matchedSkills: string[];
  missingSkills: {
    name: string;
    importance: "High" | "Medium" | "Low";
    marketDemand: number;
    avgSalaryImpact: string;
  }[];
  roadmap: {
    step: number;
    skill: string;
    duration: string;
    resources: {
      name: string;
      platform: string;
      type: "course" | "doc" | "cert" | "practice";
      url?: string;
    }[];
  }[];
  radarData: { subject: string; score: number; fullMark: number }[];
}

// ─── Helper ───────────────────────────────────────────────────────────────────

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // TODO: replace mock data returns below with real fetch calls
  console.log(`[api] ${options?.method ?? "GET"} ${BASE_URL}${endpoint}`);
  throw new Error("Mock data returned before fetch — see mock functions below.");
}

// ─── Resume Analysis ──────────────────────────────────────────────────────────

export async function analyzeResume(fileUrl: string): Promise<ResumeAnalysis> {
  // TODO: uncomment when real backend is ready
  // return apiFetch<ResumeAnalysis>("/analyze", { method: "POST", body: JSON.stringify({ fileUrl }) });
  void fileUrl;
  await new Promise((r) => setTimeout(r, 2500)); // simulate AI processing
  return {
    summary:
      "Highly motivated Computer Science student with strong proficiency in modern web technologies and a passion for building scalable, user-centric applications.",
    extractedSkills: {
      technical: ["React", "TypeScript", "Node.js", "JavaScript", "Python", "Git", "MongoDB", "REST APIs"],
      soft: ["Problem Solving", "Team Collaboration", "Communication", "Leadership"],
    },
    experience: [
      {
        title: "Software Engineering Intern",
        company: "Tech Startup Inc.",
        duration: "Jun 2025 – Aug 2025",
        description: "Built full-stack features using React and Node.js, improving user engagement by 25%.",
      },
      {
        title: "Frontend Developer",
        company: "University Research Lab",
        duration: "Jan 2025 – May 2025",
        description: "Developed research data visualization tools using React and D3.js.",
      },
    ],
    education: [{ degree: "B.S. Computer Science", institution: "Stanford University", year: 2026 }],
    overallScore: 85,
  };
}

// ─── Recommendations ──────────────────────────────────────────────────────────

export async function getRecommendations(studentId: string): Promise<JobRecommendation[]> {
  // TODO: real API call
  void studentId;
  await new Promise((r) => setTimeout(r, 800));
  return [
    {
      jobId: "job-001",
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      matchScore: 92,
      matchedSkills: ["React", "TypeScript", "Node.js", "JavaScript", "Git"],
      missingSkills: ["GCP", "Kubernetes", "Go"],
      logoUrl: "https://logo.clearbit.com/google.com",
      postedAt: "2026-03-20",
    },
    {
      jobId: "job-002",
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Redmond, WA",
      type: "Full-time",
      matchScore: 88,
      matchedSkills: ["React", "TypeScript", "JavaScript", "CSS"],
      missingSkills: ["Azure", "C#"],
      logoUrl: "https://logo.clearbit.com/microsoft.com",
      postedAt: "2026-03-22",
    },
    {
      jobId: "job-003",
      title: "Full Stack Engineer",
      company: "Stripe",
      location: "Remote",
      type: "Full-time",
      matchScore: 84,
      matchedSkills: ["Node.js", "TypeScript", "REST APIs", "MongoDB"],
      missingSkills: ["Ruby", "Go"],
      logoUrl: "https://logo.clearbit.com/stripe.com",
      postedAt: "2026-03-25",
    },
    {
      jobId: "job-004",
      title: "iOS Developer",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Full-time",
      matchScore: 65,
      matchedSkills: ["Git", "Problem Solving"],
      missingSkills: ["Swift", "SwiftUI", "Xcode", "CoreData"],
      logoUrl: "https://logo.clearbit.com/apple.com",
      postedAt: "2026-03-18",
    },
    {
      jobId: "job-005",
      title: "Backend Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full-time",
      matchScore: 79,
      matchedSkills: ["Node.js", "Python", "REST APIs", "MongoDB"],
      missingSkills: ["AWS", "Java", "Microservices"],
      logoUrl: "https://logo.clearbit.com/amazon.com",
      postedAt: "2026-03-24",
    },
    {
      jobId: "job-006",
      title: "ML Engineer Intern",
      company: "OpenAI",
      location: "San Francisco, CA",
      type: "Internship",
      matchScore: 72,
      matchedSkills: ["Python", "Git", "Problem Solving"],
      missingSkills: ["PyTorch", "CUDA", "LLM Fine-tuning"],
      logoUrl: "https://logo.clearbit.com/openai.com",
      postedAt: "2026-03-26",
    },
  ];
}

// ─── Skill Gap ────────────────────────────────────────────────────────────────

export async function getSkillGap(studentId: string, jobId?: string): Promise<SkillGapResult> {
  // TODO: real API call
  void studentId; void jobId;
  await new Promise((r) => setTimeout(r, 600));
  return {
    overallReadiness: 72,
    matchedSkills: ["React", "TypeScript", "Node.js", "JavaScript", "Git", "REST APIs", "Problem Solving"],
    missingSkills: [
      { name: "Google Cloud Platform", importance: "High", marketDemand: 92, avgSalaryImpact: "$145k" },
      { name: "Kubernetes", importance: "High", marketDemand: 88, avgSalaryImpact: "$150k" },
      { name: "Docker", importance: "High", marketDemand: 85, avgSalaryImpact: "$135k" },
      { name: "Go (Golang)", importance: "Medium", marketDemand: 75, avgSalaryImpact: "$140k" },
    ],
    roadmap: [
      {
        step: 1,
        skill: "Docker",
        duration: "2–3 weeks",
        resources: [
          { name: "Docker Mastery", platform: "Udemy", type: "course", url: "https://udemy.com" },
          { name: "Docker Documentation", platform: "Docker.com", type: "doc", url: "https://docs.docker.com" },
        ],
      },
      {
        step: 2,
        skill: "Google Cloud Platform",
        duration: "4–6 weeks",
        resources: [
          { name: "GCP Fundamentals", platform: "Coursera", type: "course", url: "https://coursera.org" },
          { name: "GCP Documentation", platform: "Google", type: "doc", url: "https://cloud.google.com/docs" },
          { name: "Associate Cloud Engineer", platform: "Google", type: "cert", url: "https://cloud.google.com/certification" },
        ],
      },
      {
        step: 3,
        skill: "Kubernetes",
        duration: "6–8 weeks",
        resources: [
          { name: "Kubernetes for Developers", platform: "Linux Foundation", type: "course" },
          { name: "CKA Certification", platform: "CNCF", type: "cert" },
        ],
      },
    ],
    radarData: [
      { subject: "Frontend", score: 90, fullMark: 100 },
      { subject: "Backend", score: 75, fullMark: 100 },
      { subject: "DevOps", score: 40, fullMark: 100 },
      { subject: "Data/AI", score: 55, fullMark: 100 },
      { subject: "System Design", score: 60, fullMark: 100 },
      { subject: "Soft Skills", score: 80, fullMark: 100 },
    ],
  };
}
