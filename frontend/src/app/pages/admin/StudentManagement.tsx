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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Search, Filter, Download, Eye, Mail, Phone, Award, Users, GraduationCap, Target, ExternalLink } from "lucide-react";
import { Separator } from "../../components/ui/separator";

export default function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      cgpa: 3.85,
      department: "Computer Science",
      graduationYear: 2026,
      skills: ["React", "TypeScript", "Node.js", "Python"],
      matchScore: 92,
      applications: 12,
      status: "active",
      avatarBg: "bg-blue-100",
      avatarText: "text-blue-700"
    },
    {
      id: 2,
      name: "Emma Davis",
      email: "emma.davis@university.edu",
      phone: "+1 (555) 234-5678",
      cgpa: 3.92,
      department: "Computer Science",
      graduationYear: 2026,
      skills: ["Java", "Spring Boot", "SQL", "React"],
      matchScore: 88,
      applications: 8,
      status: "active",
      avatarBg: "bg-emerald-100",
      avatarText: "text-emerald-700"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@university.edu",
      phone: "+1 (555) 345-6789",
      cgpa: 3.78,
      department: "Software Engineering",
      graduationYear: 2026,
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      matchScore: 85,
      applications: 15,
      status: "active",
      avatarBg: "bg-purple-100",
      avatarText: "text-purple-700"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      phone: "+1 (555) 456-7890",
      cgpa: 3.95,
      department: "Computer Science",
      graduationYear: 2025,
      skills: ["React", "Node.js", "GraphQL", "AWS"],
      matchScore: 94,
      applications: 10,
      status: "active",
      avatarBg: "bg-amber-100",
      avatarText: "text-amber-700"
    },
    {
      id: 5,
      name: "James Brown",
      email: "james.brown@university.edu",
      phone: "+1 (555) 567-8901",
      cgpa: 3.72,
      department: "Information Technology",
      graduationYear: 2026,
      skills: ["JavaScript", "Vue.js", "MongoDB", "Express"],
      matchScore: 82,
      applications: 6,
      status: "active",
      avatarBg: "bg-rose-100",
      avatarText: "text-rose-700"
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Talent Directory</h1>
          <p className="text-muted-foreground">
            Monitor and evaluate student outcomes and engagement metrics
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="p-6 border-2 overflow-hidden relative group hover:border-primary/50 transition-all bg-card shadow-sm">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Enrollment</p>
              <p className="text-3xl font-black text-foreground">2,458</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-2 overflow-hidden relative group hover:border-emerald-500/50 transition-all bg-card shadow-sm">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <p className="text-xs font-bold text-emerald-600/80 uppercase tracking-wider">Actively Applying</p>
              <p className="text-3xl font-black text-emerald-600">2,234</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 overflow-hidden relative group hover:border-blue-500/50 transition-all bg-card shadow-sm">
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <p className="text-xs font-bold text-blue-600/80 uppercase tracking-wider">Median CGPA</p>
              <p className="text-3xl font-black text-[#4F7FFF]">3.72</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 overflow-hidden relative group hover:border-purple-500/50 transition-all bg-card shadow-sm">
          <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <p className="text-xs font-bold text-purple-600/80 uppercase tracking-wider">Placed Candidates</p>
              <p className="text-3xl font-black text-purple-600">1,672</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-5 border-2 bg-gradient-to-r from-card to-accent/20">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search by student name, email, or major..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-2 font-medium bg-background"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="h-12 flex-1 sm:flex-none rounded-xl border-2 font-bold shadow-sm hover:bg-accent/80">
              <Filter className="w-4 h-4 mr-2" />
              Criteria
            </Button>
            <Button variant="outline" className="h-12 flex-1 sm:flex-none rounded-xl border-2 font-bold shadow-sm hover:bg-accent/80">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Card className="border-2 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/40 hover:bg-accent/40">
                <TableHead className="font-bold text-foreground h-12">Candidate Profile</TableHead>
                <TableHead className="font-bold text-foreground">Cohort</TableHead>
                <TableHead className="font-bold text-foreground">Performance</TableHead>
                <TableHead className="font-bold text-foreground">Core Competencies</TableHead>
                <TableHead className="font-bold text-foreground text-center">Avg. Match</TableHead>
                <TableHead className="font-bold text-foreground text-right w-[100px]">Insights</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="hover:bg-accent/20 transition-colors group">
                  <TableCell className="w-[30%]">
                    <div className="flex items-center gap-3 py-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${student.avatarBg} ${student.avatarText}`}>
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-foreground truncate">{student.name}</span>
                        <span className="text-sm font-medium text-muted-foreground truncate">{student.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="w-[15%]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground truncate">{student.department}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Class of {student.graduationYear}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="w-[10%]">
                    <Badge
                      variant="outline"
                      className={`px-2 py-0.5 rounded-md font-bold text-[11px] border ${
                        student.cgpa >= 3.8
                          ? "bg-green-50 text-green-700 border-green-200"
                          : student.cgpa >= 3.5
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      <Award className="w-3 h-3 mr-1 opacity-70" />
                      {student.cgpa}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="w-[20%]">
                    <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                      {student.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider bg-accent/80 text-muted-foreground">
                          {skill}
                        </Badge>
                      ))}
                      {student.skills.length > 2 && (
                        <Badge variant="outline" className="px-1.5 py-0.5 rounded-md font-bold text-[10px] border-dashed text-muted-foreground/60">
                          +{student.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center w-[15%]">
                    <div className="flex flex-col items-center gap-1.5 w-full max-w-[120px] mx-auto">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Score</span>
                        <span className="text-sm font-black text-primary">{student.matchScore}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-accent overflow-hidden">
                        <div
                          className="h-full bg-gradient-brand rounded-full"
                          style={{ width: `${student.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right w-[10%] pr-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl border-2 rounded-2xl shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold tracking-tight">Talent Profile</DialogTitle>
                          <DialogDescription className="font-medium text-muted-foreground">Comprehensive academic and professional history</DialogDescription>
                        </DialogHeader>
                        {selectedStudent && (
                          <div className="space-y-6 mt-4">
                            {/* Basic Info */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-card to-accent/20 border-2">
                              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 ${selectedStudent.avatarBg} ${selectedStudent.avatarText}`}>
                                {selectedStudent.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold truncate">{selectedStudent.name}</h3>
                                <p className="text-sm font-semibold text-primary">{selectedStudent.department} • Class of {selectedStudent.graduationYear}</p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <Mail className="w-3.5 h-3.5" />
                                    {selectedStudent.email}
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <Phone className="w-3.5 h-3.5" />
                                    {selectedStudent.phone}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <Card className="p-4 border-2 bg-gradient-to-br from-background to-blue-50/50">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Academic Result</p>
                                <div className="flex items-end gap-2">
                                  <p className="text-3xl font-black text-blue-600">{selectedStudent.cgpa}</p>
                                  <p className="text-sm font-semibold text-muted-foreground pb-1">CGPA</p>
                                </div>
                              </Card>
                              <Card className="p-4 border-2 bg-gradient-to-br from-background to-primary/5">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Employability Score</p>
                                <div className="flex items-end gap-2">
                                  <p className="text-3xl font-black text-primary">{selectedStudent.matchScore}%</p>
                                  <p className="text-sm font-semibold text-muted-foreground pb-1">Avg Match</p>
                                </div>
                              </Card>
                            </div>

                            {/* Skills */}
                            <div className="space-y-3">
                              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Verified Competencies</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedStudent.skills.map((skill: string) => (
                                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-xs font-bold rounded-lg border border-border bg-accent text-accent-foreground">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-6 border-t border-border mt-4">
                              <Button variant="outline" className="flex-1 rounded-xl border-2 font-bold h-11 hover:bg-accent">
                                Send direct message
                              </Button>
                              <Button className="flex-1 rounded-xl bg-gradient-brand font-bold shadow-md border-0 h-11" asChild>
                                <Link to={`/admin/candidate/${selectedStudent.id}`} className="flex items-center justify-center">
                                  Access Deep Insight
                                  <ExternalLink className="w-4 h-4 ml-2" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
