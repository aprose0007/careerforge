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
  const { student } = useStudent();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          items={studentNavItems} 
          userRole="student"
          userName={student?.name || "Student"}
          userEmail={student?.email || "student@university.edu"}
        />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <Outlet context={{ student }} />
        </main>
      </div>
    </div>
  );
}
