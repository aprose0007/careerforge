import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { MapPin, Briefcase, Clock, Search, Filter, TrendingUp, Sparkles, Building2, Loader2 } from "lucide-react";
import { getJobs, saveRecommendations, type StudentProfile, type Job } from "../../services/firebase";

import { calculateMatch } from "../../services/matcher";

export default function JobRecommendations() {
  const { student } = useOutletContext<{ student: StudentProfile | null }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setAllJobs(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 2. Perform AI Matching (Prioritize Remote AI Engine if available, else use Local)
  useEffect(() => {
    const performMatching = async () => {
      if (!student || !allJobs.length) {
        setMatchedJobs(allJobs.map(j => ({ ...j, match: 0, missing_skills: [] })));
        return;
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      let results: any[] = [];

      if (backendUrl) {
        try {
          const response = await fetch(`${backendUrl}/match-jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resume_text: student.resumeText || "",
              user_skills: student.skills,
              jobs: allJobs.map(j => ({
                id: j.id,
                description: j.description,
                required_skills: j.skills
              }))
            })
          });

          if (response.ok) {
            const aiResults = await response.json();
            results = allJobs.map(job => {
              const aiMatch = aiResults.find((r: any) => r.job_id === job.id);
              return {
                ...job,
                match: aiMatch ? aiMatch.match_score : 0,
                missing_skills: aiMatch ? aiMatch.missing_skills : []
              };
            });
          } else {
            throw new Error("Render API failed");
          }
        } catch (err) {
          console.warn("AI Engine failed, falling back to client-side matching");
          results = allJobs.map(job => {
            const { score, missingSkills } = calculateMatch(
              student.resumeText || "",
              job.description,
              student.skills || [],
              job.skills || []
            );
            return { ...job, match: score, missing_skills: missingSkills };
          });
        }
      } else {
        // Pure Local Matching
        results = allJobs.map(job => {
          const { score, missingSkills } = calculateMatch(
            student.resumeText || "",
            job.description,
            student.skills || [],
            job.skills || []
          );
          return { ...job, match: score, missing_skills: missingSkills };
        });
      }

      // Final Sort & Persist
      results.sort((a, b) => b.match - a.match);
      setMatchedJobs(results);
      
      const recommendationsToSave = results.map(res => ({
        userId: student.id,
        jobId: res.id,
        matchScore: res.match,
        missingSkills: res.missing_skills,
        status: "new" as const
      }));
      await saveRecommendations(recommendationsToSave);
    };

    if (!isLoading) {
      performMatching();
    }
  }, [allJobs, student, isLoading]);

  const filteredJobs = matchedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === "all" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === "all" || job.type.toLowerCase().replace("-", "") === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Job Recommendations</h1>
          <p className="text-muted-foreground">
            Curated opportunities matched flawlessly with your exact skills
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-semibold shadow-sm text-sm">
          <Sparkles className="w-4 h-4" />
          <span>New roles found overnight</span>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="p-6 border-2 space-y-5 bg-gradient-to-b from-card to-accent/20">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search companies, roles, domains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 w-full rounded-xl border-2 font-medium bg-background"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-xl border-2 font-medium bg-background">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="wa">Washington</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="remote">Fully Remote</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-xl border-2 font-medium bg-background">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Job Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modalities</SelectItem>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="parttime">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Button */}
            <Button variant="outline" className="h-12 w-full sm:w-auto rounded-xl border-2 font-semibold bg-background shrink-0">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-muted-foreground mr-2">Showing {filteredJobs.length} premium matches</span>
          <Badge variant="secondary" className="rounded-lg bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer font-bold px-3 py-1 text-[11px] uppercase tracking-wider">
            Match Percentage
            <TrendingUp className="w-3.5 h-3.5 ml-1.5" />
          </Badge>
          <Badge variant="outline" className="rounded-lg text-muted-foreground cursor-pointer font-bold px-3 py-1 text-[11px] uppercase tracking-wider border-2 hover:bg-accent transition-colors">
            Date Posted
          </Badge>
        </div>
      </Card>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job: any) => (
          <Card
            key={job.id}
            className="group flex flex-col p-6 border-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden bg-card cursor-pointer"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex-1 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-background border shadow-sm flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                    {job.logoUrl ? (
                      <img src={job.logoUrl} alt={job.company} className="w-8 h-8 object-contain" />
                    ) : (
                      <Building2 className="w-7 h-7 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-2">{job.title}</h3>
                    <p className="text-sm font-semibold text-primary">{job.company}</p>
                    {job.status === "active" && (
                      <span className="inline-flex mt-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        Actively Hiring
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end shrink-0">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-inner font-bold text-sm ${
                    job.match >= 90 ? "border-emerald-100 bg-emerald-50 text-emerald-700" :
                    job.match >= 80 ? "border-blue-100 bg-blue-50 text-blue-700" :
                    "border-amber-100 bg-amber-50 text-amber-700"
                  }`}>
                    {job.match}%
                  </div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1 tracking-wider">Match</span>
                </div>
              </div>

              {/* Details Tags */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-accent/70 px-2.5 py-1.5 rounded-md">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5 bg-accent/70 px-2.5 py-1.5 rounded-md">
                  <Briefcase className="w-3.5 h-3.5" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1.5 bg-accent/70 px-2.5 py-1.5 rounded-md">
                  <Clock className="w-3.5 h-3.5" />
                  {job.postedAt}
                </span>
              </div>

              {/* Skills */}
              <div className="space-y-3 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Required Skills Match</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 4).map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="rounded-md px-2 py-0.5 font-bold text-[11px] uppercase tracking-wider bg-primary/10 text-primary">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 4 && (
                    <Badge variant="outline" className="rounded-md border-dashed px-2 py-0.5 text-muted-foreground/50 text-[11px] font-bold">+{job.skills.length - 4}</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-5 mt-5 border-t border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">Status</span>
                <span className="font-black text-lg text-foreground leading-none capitalize">{job.status}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl px-4 border-2 font-bold hover:bg-accent" asChild>
                  <Link to={`/student/match/${job.id}`}>Specs</Link>
                </Button>
                <Button className="rounded-xl px-4 bg-gradient-brand shadow-md border-0 font-bold hover:shadow-lg transition-shadow">
                  Apply Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" className="h-14 rounded-2xl px-12 border-2 text-base font-bold shadow-sm hover:shadow-md transition-all">
          Load More Matches
        </Button>
      </div>
    </div>
  );
}
