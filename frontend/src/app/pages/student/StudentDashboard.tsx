import { Link, useOutletContext } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { StatCard } from "../../components/ui/stat-card";
import { MatchRing } from "../../components/ui/match-ring";
import type { StudentProfile } from "../../services/firebase";
import {
  TrendingUp,
  Target,
  FileText,
  Briefcase,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function StudentDashboard() {
  const { student } = useOutletContext<{ student: StudentProfile | null }>();

  const stats = [
    { label: "Total Applications", value: "12", icon: FileText, trend: { value: "+2", isPositive: true, label: "this week" }, color: "text-blue-600 bg-blue-50" },
    { label: "Matches Found", value: "24", icon: Target, trend: { value: "+5", isPositive: true, label: "new matches" }, color: "text-emerald-600 bg-emerald-50" },
    { label: "Profile Strength", value: `${student?.profileStrength || 0}%`, icon: TrendingUp, trend: { value: "Top 10%", isPositive: true, label: "of applicants" }, color: "text-purple-600 bg-purple-50" },
  ];

  const recommendations = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      match: 92,
      location: "Mountain View, CA",
      logo: "https://logo.clearbit.com/google.com",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Frontend Developer",
      match: 88,
      location: "Redmond, WA",
      logo: "https://logo.clearbit.com/microsoft.com",
    },
    {
      id: 3,
      company: "Apple",
      role: "iOS Developer",
      match: 85,
      location: "Cupertino, CA",
      logo: "https://logo.clearbit.com/apple.com",
    },
  ];

  const recentActivity = [
    { action: "Applied to Software Engineer at Google", time: "2 hours ago", type: "application" },
    { action: "Profile viewed by Microsoft", time: "5 hours ago", type: "view" },
    { action: "Resume updated successfully", time: "1 day ago", type: "system" },
    { action: "Shortlisted for Frontend Developer at Meta", time: "2 days ago", type: "success" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Greeting Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {student ? student.name.split(" ")[0] : "Student"} 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your career journey today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-2" asChild>
            <Link to="/student/resume">Update Resume</Link>
          </Button>
          <Button className="rounded-xl bg-gradient-brand border-0" asChild>
            <Link to="/student/jobs">Find Jobs</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            colorClass={stat.color}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Profile Completion */}
          <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-primary/5 via-background to-background p-6 hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Profile Completion</h3>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground font-medium">Add skills to unlock more matches</span>
                    <span className="font-bold text-primary">{student?.profileStrength || 0}%</span>
                  </div>
                  <Progress value={student?.profileStrength || 0} className="h-2.5 bg-primary/10" />
                </div>
              </div>
              <Button variant="outline" className="rounded-xl shrink-0 border-2" asChild>
                <Link to="/student/profile">
                  Complete Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Recommended Jobs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Top Recommendations</h2>
              <Button variant="ghost" className="rounded-xl text-primary font-semibold hover:bg-primary/10" asChild>
                <Link to="/student/jobs">
                  View All Matches
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.slice(0, 4).map((job) => (
                <Card
                  key={job.id}
                  className="p-5 border-2 hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1 group relative overflow-hidden flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center overflow-hidden border">
                      <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
                    </div>
                    <MatchRing score={job.match} size={52} strokeWidth={5} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {job.role}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">{job.company}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Briefcase className="w-3 h-3" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-5 rounded-xl group-hover:bg-primary transition-colors" variant="secondary" asChild>
                    <Link to={`/student/match/${job.id}`}>
                      View Details
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="p-6 border-2 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold tracking-tight">Recent Activity</h3>
            </div>
            
            <div className="space-y-6 flex-1">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-4 relative">
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-border" />
                  )}
                  
                  <div className="relative z-10 w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center bg-background border-2 shadow-sm">
                    {activity.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {activity.type === "application" && <FileText className="w-4 h-4 text-blue-500" />}
                    {activity.type === "view" && <Target className="w-4 h-4 text-purple-500" />}
                    {activity.type === "system" && <Clock className="w-4 h-4 text-muted-foreground" />}
                  </div>

                  <div className="flex-1 pt-1 pb-2">
                    <p className="text-sm font-medium leading-tight">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-6 rounded-xl border-dashed">
              View full history
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}