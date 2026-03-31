import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { StatCard } from "../../components/ui/stat-card";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  ArrowRight,
  UserCheck,
  Clock,
  LineChart as LineChartIcon,
  Plus,
  LayoutDashboard,
  Building2,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "2,458", icon: Users, trend: { value: "+12%", isPositive: true, label: "this month" }, color: "text-blue-600 bg-blue-50" },
    { label: "Partner Companies", value: "186", icon: Building2, trend: { value: "+8%", isPositive: true, label: "new growth" }, color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Applications", value: "5,342", icon: FileText, trend: { value: "+24%", isPositive: true, label: "volume peak" }, color: "text-purple-600 bg-purple-50" },
    { label: "Placement Rate", value: "68%", icon: TrendingUp, trend: { value: "+5%", isPositive: true, label: "success rate" }, color: "text-orange-600 bg-orange-50" },
  ];

  const applicationsData = [
    { month: "Oct", applications: 320, placements: 85 },
    { month: "Nov", applications: 410, placements: 112 },
    { month: "Dec", applications: 380, placements: 98 },
    { month: "Jan", applications: 520, placements: 145 },
    { month: "Feb", applications: 480, placements: 128 },
    { month: "Mar", applications: 620, placements: 178 },
  ];

  const topCompanies = [
    { name: "Google", applications: 245, logo: "https://logo.clearbit.com/google.com" },
    { name: "Microsoft", applications: 198, logo: "https://logo.clearbit.com/microsoft.com" },
    { name: "Apple", applications: 167, logo: "https://logo.clearbit.com/apple.com" },
    { name: "Meta", applications: 152, logo: "https://logo.clearbit.com/meta.com" },
    { name: "Amazon", applications: 134, logo: "https://logo.clearbit.com/amazon.com" },
  ];

  const recentActivity = [
    {
      student: "Alex Johnson",
      action: "Applied to Software Engineer @ Google",
      time: "5m ago",
      type: "application",
    },
    {
      student: "Emma Davis",
      action: "Shortlisted for Frontend Developer @ Meta",
      time: "15m ago",
      type: "shortlist",
    },
    {
      student: "Michael Chen",
      action: "Finalized core profile metadata",
      time: "1h ago",
      type: "profile",
    },
    {
      student: "Sarah Wilson",
      action: "Refreshed primary resume asset",
      time: "2h ago",
      type: "resume",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
            <LayoutDashboard className="w-3 h-3" />
            Control Center
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Overview</h1>
          <p className="text-muted-foreground">
            Strategic insights and platform engagement metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-2 shadow-sm">
             Audit Logs
          </Button>
          <Button className="rounded-xl flex items-center gap-2 bg-gradient-brand shadow-md border-0 font-bold">
            <Plus className="w-4 h-4" />
            Add New Job
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Charts & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Growth Analysis) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-2 relative overflow-hidden bg-gradient-to-br from-card to-accent/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Growth Projection</h2>
                <p className="text-sm text-muted-foreground mt-1">Application flow vs Placement conversion</p>
              </div>
              <div className="flex gap-2">
                 <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground px-2 py-1 bg-background rounded-lg border">
                    <div className="w-2 h-2 rounded-full bg-primary" /> Applications
                 </div>
                 <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground px-2 py-1 bg-background rounded-lg border">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> Placements
                 </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={applicationsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPlace" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600 }} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "2px solid hsl(var(--border))",
                      borderRadius: "16px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorApp)"
                  />
                  <Area
                    type="monotone"
                    dataKey="placements"
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPlace)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5 border-2 hover:border-primary/50 hover:shadow-md transition-all group bg-card">
              <div className="flex flex-col h-full justify-between gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                   <Users className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-base">Talent Pool</h3>
                   <p className="text-xs text-muted-foreground mt-1">2,4k candidates active</p>
                 </div>
                 <Button variant="ghost" size="sm" className="w-full justify-between font-bold group-hover:bg-primary/10 group-hover:text-primary" asChild>
                   <Link to="/admin/students">Directory <ArrowRight className="w-4 h-4" /></Link>
                 </Button>
              </div>
            </Card>

            <Card className="p-5 border-2 hover:border-primary/50 hover:shadow-md transition-all group bg-card">
              <div className="flex flex-col h-full justify-between gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                   <Briefcase className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-base">Job Market</h3>
                   <p className="text-xs text-muted-foreground mt-1">186 active postings</p>
                 </div>
                 <Button variant="ghost" size="sm" className="w-full justify-between font-bold group-hover:bg-primary/10 group-hover:text-primary" asChild>
                   <Link to="/admin/jobs">Listings <ArrowRight className="w-4 h-4" /></Link>
                 </Button>
              </div>
            </Card>

            <Card className="p-5 border-2 hover:border-primary/50 hover:shadow-md transition-all group bg-card">
              <div className="flex flex-col h-full justify-between gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                   <FileText className="w-5 h-5" />
                 </div>
                 <div>
                   <h3 className="font-bold text-base">Funnel Metrics</h3>
                   <p className="text-xs text-muted-foreground mt-1">5,3k submissions</p>
                 </div>
                 <Button variant="ghost" size="sm" className="w-full justify-between font-bold group-hover:bg-primary/10 group-hover:text-primary" asChild>
                   <Link to="/admin/applications">Pipeline <ArrowRight className="w-4 h-4" /></Link>
                 </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column (Partners & Intel) */}
        <div className="space-y-6">
          <Card className="p-6 border-2 h-full flex flex-col bg-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Top Recuiter Flows</h2>
              <Link to="/admin/jobs" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="space-y-4 flex-1">
              {topCompanies.map((company) => (
                <div key={company.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-accent/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border-2 flex items-center justify-center bg-white shadow-sm overflow-hidden p-1">
                      <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-sm truncate">{company.name}</span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Strategic Partner</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-foreground">{company.applications}</div>
                    <div className="text-[9px] font-bold text-muted-foreground">FLOWS</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-2 h-full flex flex-col bg-card">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
               <h2 className="text-lg font-bold">Live Activity</h2>
            </div>
            
            <div className="space-y-6 flex-1">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-4 relative">
                  {index !== recentActivity.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-accent/50" />
                  )}
                  
                  <div className="relative z-10 w-8 h-8 rounded-xl flex flex-shrink-0 items-center justify-center bg-background border-2 shadow-sm text-primary">
                    {activity.type === "application" && <FileText className="w-4 h-4" />}
                    {activity.type === "shortlist" && <UserCheck className="w-4 h-4 text-emerald-500" />}
                    {activity.type === "profile" && <LayoutDashboard className="w-4 h-4 text-purple-500" />}
                    {activity.type === "resume" && <FileText className="w-4 h-4 text-orange-500" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{activity.student}</p>
                    <p className="text-sm font-medium text-muted-foreground leading-tight mt-0.5 line-clamp-1">{activity.action}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-muted-foreground/60 uppercase">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
