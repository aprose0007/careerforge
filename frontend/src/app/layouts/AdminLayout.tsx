import { Outlet } from "react-router";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
} from "lucide-react";

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Students", path: "/admin/students" },
  { icon: Briefcase, label: "Jobs", path: "/admin/jobs" },
  { icon: FileText, label: "Applications", path: "/admin/applications" },
];

export default function AdminLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          items={adminNavItems}
          userRole="admin" 
          userName="Sarah Mitchell" 
          userEmail="sarah.admin@university.edu"
        />
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
