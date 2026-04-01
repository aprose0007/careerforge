import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import StatusChip from "../../components/StatusChip";
import { Search, Filter, Download, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function ApplicationTracker() {
  const [searchQuery, setSearchQuery] = useState("");

  const applications = [
    {
      id: 1,
      jobTitle: "Software Engineer",
      company: "Google",
      status: "shortlisted" as const,
      appliedDate: "March 25, 2026",
      matchScore: 92,
      logo: "https://logo.clearbit.com/google.com",
    },
    {
      id: 2,
      jobTitle: "Frontend Developer",
      company: "Microsoft",
      status: "applied" as const,
      appliedDate: "March 23, 2026",
      matchScore: 88,
      logo: "https://logo.clearbit.com/microsoft.com",
    },
    {
      id: 3,
      jobTitle: "iOS Developer",
      company: "Apple",
      status: "pending" as const,
      appliedDate: "March 20, 2026",
      matchScore: 85,
      logo: "https://logo.clearbit.com/apple.com",
    },
    {
      id: 4,
      jobTitle: "Full Stack Engineer",
      company: "Meta",
      status: "applied" as const,
      appliedDate: "March 18, 2026",
      matchScore: 84,
      logo: "https://logo.clearbit.com/meta.com",
    },
    {
      id: 5,
      jobTitle: "Backend Engineer",
      company: "Amazon",
      status: "rejected" as const,
      appliedDate: "March 15, 2026",
      matchScore: 82,
      logo: "https://logo.clearbit.com/amazon.com",
    },
    {
      id: 6,
      jobTitle: "Software Engineer",
      company: "Netflix",
      status: "shortlisted" as const,
      appliedDate: "March 12, 2026",
      matchScore: 80,
      logo: "https://logo.clearbit.com/netflix.com",
    },
    {
      id: 7,
      jobTitle: "Frontend Engineer",
      company: "Stripe",
      status: "applied" as const,
      appliedDate: "March 10, 2026",
      matchScore: 78,
      logo: "https://logo.clearbit.com/stripe.com",
    },
    {
      id: 8,
      jobTitle: "Software Engineer",
      company: "Airbnb",
      status: "pending" as const,
      appliedDate: "March 8, 2026",
      matchScore: 76,
      logo: "https://logo.clearbit.com/airbnb.com",
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
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Application Tracker</h1>
        <p className="text-muted-foreground text-lg">
          Monitor and manage all your job applications in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-6 border-2 hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-3xl font-semibold">{statusCounts.total}</p>
          </div>
        </Card>
        <Card className="p-6 border-2 hover:shadow-md transition-shadow bg-blue-50/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Applied</p>
            <p className="text-3xl font-semibold text-[#4F7FFF]">{statusCounts.applied}</p>
          </div>
        </Card>
        <Card className="p-6 border-2 hover:shadow-md transition-shadow bg-green-50/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Shortlisted</p>
            <p className="text-3xl font-semibold text-green-600">{statusCounts.shortlisted}</p>
          </div>
        </Card>
        <Card className="p-6 border-2 hover:shadow-md transition-shadow bg-amber-50/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-semibold text-amber-600">{statusCounts.pending}</p>
          </div>
        </Card>
        <Card className="p-6 border-2 hover:shadow-md transition-shadow bg-red-50/50">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <p className="text-3xl font-semibold text-red-600">{statusCounts.rejected}</p>
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6 border-2">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search applications by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-2">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-2">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card className="border-2 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Job Title</TableHead>
              <TableHead className="font-semibold">Match Score</TableHead>
              <TableHead className="font-semibold">Applied Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} className="hover:bg-accent/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                      <img src={app.logo} alt={app.company} className="w-7 h-7 object-contain" />
                    </div>
                    <span className="font-medium">{app.company}</span>
                  </div>
                </TableCell>
                <TableCell>{app.jobTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[100px]">
                      <div className="h-2 rounded-full bg-accent overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${app.matchScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-primary">{app.matchScore}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{app.appliedDate}</TableCell>
                <TableCell>
                  <StatusChip status={app.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/student/match/${app.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Withdraw Application</DropdownMenuItem>
                      <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Empty State Message (if no applications) */}
      {/* <Card className="p-12 border-2 text-center">
        <div className="space-y-4">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">No applications yet</h3>
            <p className="text-muted-foreground">Start applying to jobs to track them here</p>
          </div>
          <Button className="h-12 rounded-xl px-8" asChild>
            <Link to="/student/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </Card> */}
    </div>
  );
}
