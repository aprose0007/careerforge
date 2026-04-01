import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          items={adminNavItems}
          userRole="admin" 
          userName="Sarah Mitchell" 
          userEmail="sarah.admin@university.edu"
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto scroll-smooth w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
