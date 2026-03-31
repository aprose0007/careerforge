import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../components/ui/dialog";
import { Search, Filter, Download, Plus, Edit, Trash2, MapPin, DollarSign, Briefcase } from "lucide-react";
import { X } from "lucide-react";

export default function JobManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      requiredSkills: ["React", "TypeScript", "Node.js"],
      minCGPA: 3.5,
      postedDate: "March 20, 2026",
      applications: 45,
      status: "active",
      logo: "https://logo.clearbit.com/google.com",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Redmond, WA",
      type: "Full-time",
      salary: "$110k - $170k",
      requiredSkills: ["React", "JavaScript", "CSS"],
      minCGPA: 3.3,
      postedDate: "March 18, 2026",
      applications: 38,
      status: "active",
      logo: "https://logo.clearbit.com/microsoft.com",
    },
    {
      id: 3,
      title: "iOS Developer",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Full-time",
      salary: "$130k - $190k",
      requiredSkills: ["Swift", "iOS", "UIKit"],
      minCGPA: 3.6,
      postedDate: "March 15, 2026",
      applications: 32,
      status: "active",
      logo: "https://logo.clearbit.com/apple.com",
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$115k - $175k",
      requiredSkills: ["Java", "AWS", "Microservices"],
      minCGPA: 3.4,
      postedDate: "March 12, 2026",
      applications: 52,
      status: "active",
      logo: "https://logo.clearbit.com/amazon.com",
    },
    {
      id: 5,
      title: "Full Stack Engineer",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "Full-time",
      salary: "$125k - $185k",
      requiredSkills: ["React", "Node.js", "GraphQL"],
      minCGPA: 3.5,
      postedDate: "March 10, 2026",
      applications: 41,
      status: "closed",
      logo: "https://logo.clearbit.com/meta.com",
    },
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">Job Management</h1>
          <p className="text-muted-foreground text-lg">
            Create and manage job postings for students
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 rounded-xl px-6">
              <Plus className="w-5 h-5 mr-2" />
              Add New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Job</DialogTitle>
              <DialogDescription>Create a new job posting for students</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* Job Details Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g., Software Engineer" className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="e.g., Google" className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., San Francisco, CA" className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Input id="type" placeholder="e.g., Full-time" className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input id="salary" placeholder="e.g., $100k - $150k" className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="minCGPA">Minimum CGPA</Label>
                    <Input id="minCGPA" type="number" step="0.01" placeholder="e.g., 3.5" className="h-12 rounded-xl border-2" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the role, responsibilities, and requirements..."
                      className="rounded-xl border-2 min-h-[120px]"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label>Required Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      placeholder="Add a skill (e.g., React)"
                      className="h-12 rounded-xl border-2"
                    />
                    <Button type="button" onClick={addSkill} className="h-12 rounded-xl px-6">
                      Add
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary border-2 border-primary/20"
                        >
                          <span className="font-medium">{skill}</span>
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:bg-primary/20 rounded-full p-1 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl border-2">
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">
                Create Job
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Jobs</p>
            <p className="text-3xl font-semibold">186</p>
          </div>
        </Card>
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Active Jobs</p>
            <p className="text-3xl font-semibold text-green-600">142</p>
          </div>
        </Card>
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Applications</p>
            <p className="text-3xl font-semibold text-[#4F7FFF]">5,342</p>
          </div>
        </Card>
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Closed Jobs</p>
            <p className="text-3xl font-semibold text-red-600">44</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 border-2">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by job title or company..."
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

      {/* Jobs Table */}
      <Card className="border-2 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="font-semibold">Job</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">Salary</TableHead>
              <TableHead className="font-semibold">Skills</TableHead>
              <TableHead className="font-semibold">Applications</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-accent/30">
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.type}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                      <img src={job.logo} alt={job.company} className="w-7 h-7 object-contain" />
                    </div>
                    <span className="font-medium">{job.company}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {job.requiredSkills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs rounded-lg">
                        {skill}
                      </Badge>
                    ))}
                    {job.requiredSkills.length > 2 && (
                      <Badge variant="secondary" className="text-xs rounded-lg">
                        +{job.requiredSkills.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-primary">{job.applications}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`rounded-lg ${
                      job.status === "active"
                        ? "bg-green-50 text-green-600 border-green-100"
                        : "bg-red-50 text-red-600 border-red-100"
                    }`}
                  >
                    {job.status === "active" ? "Active" : "Closed"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-lg text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
