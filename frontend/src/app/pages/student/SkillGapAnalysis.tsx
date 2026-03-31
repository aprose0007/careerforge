import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { CheckCircle, ArrowRight, BookOpen, Video, FileText, Award } from "lucide-react";

export default function SkillGapAnalysis() {
  const currentSkills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Language" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "JavaScript", level: 95, category: "Language" },
    { name: "Git", level: 88, category: "Tools" },
  ];

  const missingSkills = [
    {
      name: "Google Cloud Platform",
      importance: "High",
      demand: 92,
      averageSalary: "$145k",
    },
    {
      name: "Kubernetes",
      importance: "High",
      demand: 88,
      averageSalary: "$150k",
    },
    {
      name: "Go (Golang)",
      importance: "Medium",
      demand: 75,
      averageSalary: "$140k",
    },
    {
      name: "Docker",
      importance: "High",
      demand: 85,
      averageSalary: "$135k",
    },
  ];

  const learningRoadmap = [
    {
      step: 1,
      skill: "Google Cloud Platform",
      duration: "4-6 weeks",
      resources: [
        { type: "course", name: "GCP Fundamentals", platform: "Coursera", icon: Video },
        { type: "doc", name: "Official GCP Documentation", platform: "Google", icon: FileText },
        { type: "cert", name: "Associate Cloud Engineer", platform: "Google", icon: Award },
      ],
    },
    {
      step: 2,
      skill: "Docker",
      duration: "2-3 weeks",
      resources: [
        { type: "course", name: "Docker Mastery", platform: "Udemy", icon: Video },
        { type: "doc", name: "Docker Documentation", platform: "Docker", icon: FileText },
      ],
    },
    {
      step: 3,
      skill: "Kubernetes",
      duration: "6-8 weeks",
      resources: [
        { type: "course", name: "Kubernetes for Developers", platform: "Linux Foundation", icon: Video },
        { type: "cert", name: "CKA Certification", platform: "CNCF", icon: Award },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">Skill Gap Analysis</h1>
        <p className="text-muted-foreground text-lg">
          Identify and bridge skill gaps to unlock better opportunities
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-2 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current Skills</p>
            <p className="text-3xl font-semibold text-green-600">{currentSkills.length}</p>
            <p className="text-xs text-muted-foreground">Verified skills</p>
          </div>
        </Card>
        <Card className="p-6 border-2 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Skills to Learn</p>
            <p className="text-3xl font-semibold text-amber-600">{missingSkills.length}</p>
            <p className="text-xs text-muted-foreground">High-demand skills</p>
          </div>
        </Card>
        <Card className="p-6 border-2 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Estimated Timeline</p>
            <p className="text-3xl font-semibold text-[#4F7FFF]">12-17</p>
            <p className="text-xs text-muted-foreground">Weeks to upskill</p>
          </div>
        </Card>
      </div>

      {/* Current Skills */}
      <Card className="p-8 border-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Your Current Skills</h2>
          <Button variant="outline" className="rounded-xl" asChild>
            <Link to="/student/profile">
              Update Skills
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          {currentSkills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent text-muted-foreground">
                    {skill.category}
                  </span>
                </div>
                <span className="text-sm font-semibold text-primary">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Missing Skills */}
      <Card className="p-8 border-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Skills to Acquire</h2>
          <span className="text-sm text-muted-foreground">Based on target roles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missingSkills.map((skill) => (
            <Card key={skill.name} className="p-6 border-2 hover:shadow-lg transition-all">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full inline-block ${
                        skill.importance === "High"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}
                    >
                      {skill.importance} Priority
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-primary">{skill.demand}%</div>
                    <div className="text-xs text-muted-foreground">Market Demand</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Salary Impact</span>
                    <span className="font-semibold text-green-600">{skill.averageSalary}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Learning Roadmap */}
      <Card className="p-8 border-2 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Your Learning Roadmap</h2>
          <p className="text-muted-foreground">
            A personalized path to bridge your skill gaps
          </p>
        </div>

        <div className="space-y-6">
          {learningRoadmap.map((item, index) => (
            <div key={item.step} className="relative">
              {index !== learningRoadmap.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border"></div>
              )}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg">
                    {item.step}
                  </div>
                </div>
                <Card className="flex-1 p-6 border-2 bg-accent/30">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{item.skill}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated time: {item.duration}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">
                        Recommended Resources:
                      </h4>
                      <div className="space-y-2">
                        {item.resources.map((resource, idx) => {
                          const Icon = resource.icon;
                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 rounded-xl bg-background border hover:shadow-sm transition-shadow"
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{resource.name}</p>
                                <p className="text-xs text-muted-foreground">{resource.platform}</p>
                              </div>
                              <Button variant="ghost" size="sm" className="rounded-lg">
                                View
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <Card className="p-8 border-2 bg-gradient-to-br from-primary/5 to-accent text-center space-y-4">
        <BookOpen className="w-12 h-12 text-primary mx-auto" />
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">Ready to Start Learning?</h3>
          <p className="text-muted-foreground">
            Follow this roadmap to improve your profile and unlock better opportunities
          </p>
        </div>
        <Button className="h-12 rounded-xl px-8">Start Learning Journey</Button>
      </Card>
    </div>
  );
}
