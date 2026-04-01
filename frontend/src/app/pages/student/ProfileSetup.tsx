import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Progress } from "../../components/ui/progress";
import { X, UserRound, GraduationCap, Code2, Heart, Save } from "lucide-react";
import { Separator } from "../../components/ui/separator";

export default function ProfileSetup() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [interests, setInterests] = useState(["Web Development", "AI/ML"]);
  const [newInterest, setNewInterest] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            Complete your profile to unlock highly accurate job matches
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="w-full sm:w-auto rounded-xl border-2 font-bold hover:bg-accent h-11 px-6">
            Discard
          </Button>
          <Button className="w-full sm:w-auto rounded-xl font-bold bg-gradient-brand shadow-md border-0 h-11 px-6">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-6 border-2 bg-gradient-to-r from-card to-accent/20">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">Profile Vitality</span>
            <span className="text-sm font-black text-primary">85% Completed</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden bg-accent">
            <div 
              className="h-full rounded-full bg-gradient-brand transition-all duration-1000"
              style={{ width: "85%" }}
            />
          </div>
          <p className="text-xs font-semibold text-muted-foreground pt-1">
            Add a link to your portfolio to reach 100%.
          </p>
        </div>
      </Card>

      <div className="space-y-8">
        {/* Personal Information */}
        <Card className="p-8 border-2 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none group-hover:bg-primary/10 transition-colors" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <UserRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Personal Identity</h2>
              <p className="text-sm font-medium text-muted-foreground">Basic info about who you are</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">First Name</Label>
              <Input
                id="firstName"
                defaultValue="Alex"
                className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Last Name</Label>
              <Input
                id="lastName"
                defaultValue="Johnson"
                className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="alex.johnson@university.edu"
                className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Mobile Number</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-primary/50"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Professional Summary</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                className="rounded-xl border-2 min-h-[100px] font-medium bg-background resize-none focus-visible:border-primary/50 p-4"
                defaultValue="Passionate software engineer with a love for building innovative web applications."
              />
            </div>
          </div>
        </Card>

        {/* Academic Details */}
        <Card className="p-8 border-2 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Academic History</h2>
              <p className="text-sm font-medium text-muted-foreground">Your educational foundation</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="university" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Institution</Label>
              <Input
                id="university"
                defaultValue="Stanford University"
                className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-blue-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Degree Pursued</Label>
              <Input
                id="degree"
                defaultValue="B.S. Computer Science"
                className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-blue-500/50"
              />
            </div>

            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <Label htmlFor="department" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Department / Major</Label>
              <Input
                id="department"
                defaultValue="Computer Science"
                className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-blue-500/50"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cgpa" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Current CGPA</Label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.01"
                  defaultValue="3.85"
                  className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-blue-500/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Graduation Year</Label>
                <Input
                  id="year"
                  type="number"
                  defaultValue="2026"
                  className="h-12 rounded-xl border-2 font-semibold bg-background focus-visible:border-blue-500/50"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Dual Form Section for Skills + Interests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills */}
          <Card className="p-8 border-2 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[80px] pointer-events-none" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Technical Skills</h2>
              </div>
            </div>
            
            <div className="space-y-5 relative z-10">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="e.g. React, Python..."
                  className="h-12 rounded-xl border-2 font-medium bg-background focus-visible:border-emerald-500/50"
                />
                <Button onClick={addSkill} variant="secondary" className="h-12 rounded-xl px-6 font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 shadow-sm">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm"
                  >
                    <span className="font-bold text-[13px] tracking-wide">{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:bg-emerald-200/50 rounded-md p-1 transition-colors text-emerald-600/70 hover:text-emerald-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Interests */}
          <Card className="p-8 border-2 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-[80px] pointer-events-none" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-amber-100/50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Domain Interests</h2>
              </div>
            </div>
            
            <div className="space-y-5 relative z-10">
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addInterest()}
                  placeholder="e.g. AI, FinTech..."
                  className="h-12 rounded-xl border-2 font-medium bg-background focus-visible:border-amber-500/50"
                />
                <Button onClick={addInterest} variant="secondary" className="h-12 rounded-xl px-6 font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 shadow-sm">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {interests.map((interest) => (
                  <div
                    key={interest}
                    className="flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60 shadow-sm"
                  >
                    <span className="font-bold text-[13px] tracking-wide">{interest}</span>
                    <button
                      onClick={() => removeInterest(interest)}
                      className="hover:bg-amber-200/50 rounded-md p-1 transition-colors text-amber-600/70 hover:text-amber-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
