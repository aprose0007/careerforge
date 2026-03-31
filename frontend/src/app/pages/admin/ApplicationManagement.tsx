import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Filter, Download, Eye, Layers, Building2, CalendarDays, CheckCircle2, Clock, XCircle, ChevronRight } from "lucide-react";

export default function ApplicationManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const applications = [
    {
      id: 1,
      studentName: "Alex Johnson",
      studentEmail: "alex.johnson@university.edu",
      jobTitle: "Software Engineer",
      company: "Google",
      matchScore: 92,
      appliedDate: "March 25, 2026",
      status: "shortlisted" as const,
      companyLogo: "https://logo.clearbit.com/google.com",
    },
    {
      id: 2,
      studentName: "Emma Davis",
      studentEmail: "emma.davis@university.edu",
      jobTitle: "Frontend Developer",
      company: "Microsoft",
      matchScore: 88,
      appliedDate: "March 24, 2026",
      status: "applied" as const,
      companyLogo: "https://logo.clearbit.com/microsoft.com",
    },
    {
      id: 3,
      studentName: "Michael Chen",
      studentEmail: "michael.chen@university.edu",
      jobTitle: "Backend Engineer",
      company: "Amazon",
      matchScore: 85,
      appliedDate: "March 23, 2026",
      status: "pending" as const,
      companyLogo: "https://logo.clearbit.com/amazon.com",
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      studentEmail: "sarah.wilson@university.edu",
      jobTitle: "Full Stack Engineer",
      company: "Meta",
      matchScore: 94,
      appliedDate: "March 22, 2026",
      status: "shortlisted" as const,
      companyLogo: "https://logo.clearbit.com/meta.com",
    },
    {
      id: 5,
      studentName: "James Brown",
      studentEmail: "james.brown@university.edu",
      jobTitle: "iOS Developer",
      company: "Apple",
      matchScore: 82,
      appliedDate: "March 21, 2026",
      status: "rejected" as const,
      companyLogo: "https://logo.clearbit.com/apple.com",
    },
    {
      id: 6,
      studentName: "Olivia Taylor",
      studentEmail: "olivia.taylor@university.edu",
      jobTitle: "Software Engineer",
      company: "Netflix",
      matchScore: 80,
      appliedDate: "March 20, 2026",
      status: "applied" as const,
      companyLogo: "https://logo.clearbit.com/netflix.com",
    },
    {
      id: 7,
      studentName: "William Martinez",
      studentEmail: "william.martinez@university.edu",
      jobTitle: "Frontend Engineer",
      company: "Stripe",
      matchScore: 78,
      appliedDate: "March 19, 2026",
      status: "shortlisted" as const,
      companyLogo: "https://logo.clearbit.com/stripe.com",
    },
    {
      id: 8,
      studentName: "Sophia Anderson",
      studentEmail: "sophia.anderson@university.edu",
      jobTitle: "Software Engineer",
      company: "Airbnb",
      matchScore: 76,
      appliedDate: "March 18, 2026",
      status: "pending" as const,
      companyLogo: "https://logo.clearbit.com/airbnb.com",
    },
  ];

  const statusCounts = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    pending: applications.filter((a) => a.status === "pending").length,
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Application Pipeline</h1>
          <p className="text-muted-foreground">
            Review and direct student candidate flows toward placements
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-5 border-2 overflow-hidden relative group hover:border-primary/50 transition-all bg-card shadow-sm cursor-default">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="space-y-1 relative z-10 text-center">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Volume</p>
            <p className="text-2xl font-black text-foreground">{statusCounts.total}</p>
          </div>
        </Card>
        
        <Card className="p-5 border-2 overflow-hidden relative group hover:border-blue-500/50 transition-all bg-blue-50/30 shadow-sm cursor-default">
          <div className="absolute top-0 left-0 w-1 bg-blue-500 h-full" />
          <div className="space-y-1 relative z-10 text-center">
             <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-blue-600/80 uppercase tracking-wider">
               <Layers className="w-3 h-3" /> In Process
             </div>
            <p className="text-2xl font-black text-[#4F7FFF]">{statusCounts.applied}</p>
          </div>
        </Card>
        
        <Card className="p-5 border-2 overflow-hidden relative group hover:border-green-500/50 transition-all bg-green-50/30 shadow-sm cursor-default">
          <div className="absolute top-0 left-0 w-1 bg-green-500 h-full" />
          <div className="space-y-1 relative z-10 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-green-600/80 uppercase tracking-wider">
               <CheckCircle2 className="w-3 h-3" /> Shortlisted
             </div>
            <p className="text-2xl font-black text-green-600">{statusCounts.shortlisted}</p>
          </div>
        </Card>
        
        <Card className="p-5 border-2 overflow-hidden relative group hover:border-amber-500/50 transition-all bg-amber-50/30 shadow-sm cursor-default">
          <div className="absolute top-0 left-0 w-1 bg-amber-500 h-full" />
          <div className="space-y-1 relative z-10 text-center">
             <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-amber-600/80 uppercase tracking-wider">
               <Clock className="w-3 h-3" /> Reviewing
             </div>
            <p className="text-2xl font-black text-amber-600">{statusCounts.pending}</p>
          </div>
        </Card>
        
        <Card className="p-5 border-2 overflow-hidden relative group hover:border-red-500/50 transition-all bg-red-50/30 shadow-sm cursor-default">
          <div className="absolute top-0 left-0 w-1 bg-red-500 h-full" />
          <div className="space-y-1 relative z-10 text-center">
             <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-red-600/80 uppercase tracking-wider">
               <XCircle className="w-3 h-3" /> Rejected
             </div>
            <p className="text-2xl font-black text-red-600">{statusCounts.rejected}</p>
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-5 border-2 bg-gradient-to-r from-card to-accent/20">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Filter by candidate, role, or partnering organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 font-medium bg-background"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="h-12 flex-1 sm:flex-none rounded-xl border-2 font-bold shadow-sm hover:bg-accent/80">
              <Filter className="w-4 h-4 mr-2" />
              Funnel View
            </Button>
            <Button variant="outline" className="h-12 flex-1 sm:flex-none rounded-xl border-2 font-bold shadow-sm hover:bg-accent/80">
              <Download className="w-4 h-4 mr-2" />
              Extract Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card className="border-2 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/40 hover:bg-accent/40">
                <TableHead className="font-bold text-foreground h-12">Applicant</TableHead>
                <TableHead className="font-bold text-foreground">Target Role</TableHead>
                <TableHead className="font-bold text-foreground">Fit Score</TableHead>
                <TableHead className="font-bold text-foreground">Submission</TableHead>
                <TableHead className="font-bold text-foreground">Disposition</TableHead>
                <TableHead className="font-bold text-foreground text-right w-[120px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id} className="hover:bg-accent/20 transition-colors group">
                  <TableCell className="w-[20%]">
                    <div className="space-y-1">
                      <p className="font-bold text-foreground">{app.studentName}</p>
                      <p className="text-sm font-medium text-muted-foreground">{app.studentEmail}</p>
                    </div>
                  </TableCell>
                  
                  <TableCell className="w-[25%]">
                    <div className="flex flex-col gap-2">
                       <span className="font-bold text-foreground">{app.jobTitle}</span>
                       <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded overflow-hidden bg-background border flex items-center justify-center shrink-0">
                            {app.companyLogo ? (
                               <img src={app.companyLogo} alt={app.company} className="w-3.5 h-3.5 object-contain" />
                            ) : (
                               <Building2 className="w-3 h-3 text-muted-foreground/30" />
                            )}
                          </div>
                          <span className="text-sm font-semibold text-muted-foreground">{app.company}</span>
                       </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="w-[15%]">
                    <div className="flex flex-col items-start gap-1.5 w-full max-w-[120px]">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Match</span>
                        <span className="text-sm font-black text-primary">{app.matchScore}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-accent overflow-hidden">
                        <div
                          className="h-full bg-gradient-brand rounded-full"
                          style={{ width: `${app.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="w-[15%]">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                       <CalendarDays className="w-4 h-4 text-muted-foreground/70" />
                       {app.appliedDate}
                    </div>
                  </TableCell>
                  
                  <TableCell className="w-[15%]">
                    <Select defaultValue={app.status}>
                      <SelectTrigger className="w-[150px] h-10 rounded-xl border-2 font-bold bg-background transition-colors focus:ring-primary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-2 shadow-lg">
                        <SelectItem value="applied" className="font-bold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[#4F7FFF]"></div>
                            Applied
                          </div>
                        </SelectItem>
                        <SelectItem value="shortlisted" className="font-bold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div>
                            Shortlisted
                          </div>
                        </SelectItem>
                        <SelectItem value="rejected" className="font-bold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-red-500"></div>
                            Rejected
                          </div>
                        </SelectItem>
                        <SelectItem value="selected" className="font-bold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
                            Selected
                          </div>
                        </SelectItem>
                        <SelectItem value="pending" className="font-bold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-sm bg-amber-500"></div>
                            Pending
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  
                  <TableCell className="text-right w-[10%] pr-4">
                     <Button variant="ghost" size="sm" className="rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary w-full justify-between" asChild>
                       <Link to={`/admin/candidate/${app.id}`}>
                         Inspect
                         <ChevronRight className="w-4 h-4" />
                       </Link>
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
