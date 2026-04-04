import { useState, useEffect, useCallback } from "react";
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
import { Search, Filter, Download, Plus, Edit, Trash2, MapPin, DollarSign, MapPinned } from "lucide-react";
import { X } from "lucide-react";
import {
  getJobs,
  createJob,
  createJobsIfNew,
  deleteJob,
  type Job,
} from "../../services/firebase";
import { CHENNAI_INTERNSHIP_SEED } from "../../data/chennaiInternships";

export default function JobManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formType, setFormType] = useState("Internship");
  const [formCompensation, setFormCompensation] = useState("");
  const [formMinCgpa, setFormMinCgpa] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setBanner(null);
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load jobs";
      setBanner({ type: "err", text: msg });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const resetForm = () => {
    setFormTitle("");
    setFormCompany("");
    setFormLocation("");
    setFormType("Internship");
    setFormCompensation("");
    setFormMinCgpa("");
    setFormDescription("");
    setSkills([]);
  };

  const handleCreateJob = async () => {
    if (!formTitle.trim() || !formCompany.trim() || !formLocation.trim()) {
      setBanner({ type: "err", text: "Title, company, and location are required." });
      return;
    }
    if (!formDescription.trim()) {
      setBanner({ type: "err", text: "Add a short job description (used for student matching)." });
      return;
    }
    if (skills.length === 0) {
      setBanner({ type: "err", text: "Add at least one required skill." });
      return;
    }
    setBanner(null);
    try {
      const minCgpa = formMinCgpa.trim() ? parseFloat(formMinCgpa) : undefined;
      await createJob({
        title: formTitle.trim(),
        company: formCompany.trim(),
        location: formLocation.trim(),
        type: formType.trim() || "Internship",
        skills,
        description: formDescription.trim(),
        status: "active",
        postedAt: new Date().toISOString().slice(0, 10),
        minCgpa: Number.isFinite(minCgpa) ? minCgpa : undefined,
        compensation: formCompensation.trim() || undefined,
        applicationsCount: 0,
      });
      setIsAddDialogOpen(false);
      resetForm();
      setBanner({ type: "ok", text: "Job posted to Firestore. Students will see it on Job Recommendations." });
      await loadJobs();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not create job";
      setBanner({ type: "err", text: msg });
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Delete this job from Firestore? Students will no longer see it.")) return;
    setBanner(null);
    try {
      await deleteJob(jobId);
      setBanner({ type: "ok", text: "Job deleted." });
      await loadJobs();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not delete job";
      setBanner({ type: "err", text: msg });
    }
  };

  const handleImportChennai = async () => {
    setBanner(null);
    try {
      const added = await createJobsIfNew(
        CHENNAI_INTERNSHIP_SEED,
        jobs.map((j) => ({ title: j.title, company: j.company, location: j.location }))
      );
      if (added === 0) {
        setBanner({ type: "ok", text: "Chennai sample internships are already present (matched by title + company + location)." });
      } else {
        setBanner({ type: "ok", text: `Imported ${added} Chennai internship posting(s).` });
      }
      await loadJobs();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Import failed";
      setBanner({ type: "err", text: msg });
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = jobs.filter((j) => j.status === "active").length;
  const closedCount = jobs.filter((j) => j.status === "closed").length;
  const totalApps = jobs.reduce((acc, j) => acc + (j.applicationsCount ?? 0), 0);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">Job Management</h1>
          <p className="text-muted-foreground text-lg">
            Create and manage job postings (stored in Firebase — visible to students on Job Recommendations)
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-12 rounded-xl px-6 border-2"
            onClick={handleImportChennai}
            disabled={loading}
          >
            <MapPinned className="w-5 h-5 mr-2" />
            Import Chennai internships
          </Button>
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button className="h-12 rounded-xl px-6">
                <Plus className="w-5 h-5 mr-2" />
                Add New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Job</DialogTitle>
                <DialogDescription>Create a posting — saved to Firestore for student matching</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g., Software Engineering Intern"
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="e.g., Zoho Corporation"
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="e.g., Chennai, Tamil Nadu"
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Input
                        id="type"
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        placeholder="Internship / Full-time"
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compensation">Stipend / salary (optional)</Label>
                      <Input
                        id="compensation"
                        value={formCompensation}
                        onChange={(e) => setFormCompensation(e.target.value)}
                        placeholder="e.g., ₹25k / month"
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="minCGPA">Minimum CGPA (optional)</Label>
                      <Input
                        id="minCGPA"
                        type="number"
                        step="0.1"
                        value={formMinCgpa}
                        onChange={(e) => setFormMinCgpa(e.target.value)}
                        placeholder="e.g., 7.5 (10-point scale)"
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Role, stack, duration, and how students apply — used for AI / keyword matching."
                        className="rounded-xl border-2 min-h-[120px]"
                      />
                    </div>
                  </div>

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
                              type="button"
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
                <Button type="button" onClick={handleCreateJob} className="rounded-xl">
                  Create Job
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {banner && (
        <div
          className={`p-4 rounded-xl border-2 text-sm font-medium ${
            banner.type === "ok"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {banner.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Jobs</p>
            <p className="text-3xl font-semibold">{loading ? "…" : jobs.length}</p>
          </div>
        </Card>
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Active Jobs</p>
            <p className="text-3xl font-semibold text-green-600">{loading ? "…" : activeCount}</p>
          </div>
        </Card>
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Applications (tracked)</p>
            <p className="text-3xl font-semibold text-[#4F7FFF]">{loading ? "…" : totalApps}</p>
          </div>
        </Card>
        <Card className="p-6 border-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Closed Jobs</p>
            <p className="text-3xl font-semibold text-red-600">{loading ? "…" : closedCount}</p>
          </div>
        </Card>
      </div>

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
            <Button type="button" variant="outline" className="h-12 rounded-xl border-2" disabled>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button type="button" variant="outline" className="h-12 rounded-xl border-2" disabled>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border-2 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="font-semibold">Job</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">Compensation</TableHead>
              <TableHead className="font-semibold">Skills</TableHead>
              <TableHead className="font-semibold">Applications</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                  Loading jobs from Firestore…
                </TableCell>
              </TableRow>
            )}
            {!loading && filteredJobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                  No jobs yet. Use &quot;Import Chennai internships&quot; or &quot;Add New Job&quot;.
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              filteredJobs.map((job) => {
                const jobSkills = job.skills ?? [];
                return (
                  <TableRow key={job.id} className="hover:bg-accent/30">
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.type}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center overflow-hidden text-sm font-bold text-muted-foreground">
                          {job.logoUrl ? (
                            <img src={job.logoUrl} alt="" className="w-7 h-7 object-contain" />
                          ) : (
                            job.company.charAt(0).toUpperCase()
                          )}
                        </div>
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        {job.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-600 max-w-[180px]">
                        <DollarSign className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-2">{job.compensation ?? "—"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {jobSkills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs rounded-lg">
                            {skill}
                          </Badge>
                        ))}
                        {jobSkills.length > 2 && (
                          <Badge variant="secondary" className="text-xs rounded-lg">
                            +{jobSkills.length - 2}
                          </Badge>
                        )}
                        {jobSkills.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{job.applicationsCount ?? 0}</span>
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
                        <Button type="button" variant="ghost" size="sm" className="rounded-lg" disabled title="Coming soon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-lg text-destructive hover:text-destructive"
                          title="Delete job"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
