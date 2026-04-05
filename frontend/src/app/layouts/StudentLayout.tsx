import { useState } from "react";
import { Outlet } from "react-router";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { useStudent } from "../hooks/useStudent";
import {
  LayoutDashboard,
  User,
  Upload,
  Target,
  Briefcase,
  FileText,
} from "lucide-react";

const studentNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
  { icon: User, label: "Profile", path: "/student/profile" },
  { icon: Upload, label: "Resume", path: "/student/resume" },
  { icon: Target, label: "Skill Gap", path: "/student/skill-gap" },
  { icon: Briefcase, label: "Job Matches", path: "/student/jobs" },
  { icon: FileText, label: "Applications", path: "/student/applications" },
];

export default function StudentLayout() {
  const { student, loading } = useStudent();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Syncing your journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          items={studentNavItems} 
          userRole="student"
          userName={student?.name || "Student"}
          userEmail={student?.email || "student@university.edu"}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto scroll-smooth w-full">
          <Outlet context={{ student }} />
        </main>
      </div>
    </div>
  );
}
