import { createBrowserRouter } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import RoleSelection from "./pages/auth/RoleSelection";
import StudentLogin from "./pages/auth/StudentLogin";
import StudentSignup from "./pages/auth/StudentSignup";
import AdminLogin from "./pages/auth/AdminLogin";

import StudentDashboard from "./pages/student/StudentDashboard";
import ProfileSetup from "./pages/student/ProfileSetup";
import ResumeUpload from "./pages/student/ResumeUpload";
import MatchResults from "./pages/student/MatchResults";
import SkillGapAnalysis from "./pages/student/SkillGapAnalysis";
import JobRecommendations from "./pages/student/JobRecommendations";
import ApplicationTracker from "./pages/student/ApplicationTracker";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentManagement from "./pages/admin/StudentManagement";
import JobManagement from "./pages/admin/JobManagement";
import ApplicationManagement from "./pages/admin/ApplicationManagement";
import CandidateInsight from "./pages/admin/CandidateInsight";

import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { index: true, Component: RoleSelection },
      { path: "student/login", Component: StudentLogin },
      { path: "student/signup", Component: StudentSignup },
      { path: "admin/login", Component: AdminLogin },
    ],
  },
  {
    path: "/student",
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "profile", Component: ProfileSetup },
      { path: "resume", Component: ResumeUpload },
      { path: "match/:jobId", Component: MatchResults },
      { path: "skill-gap", Component: SkillGapAnalysis },
      { path: "jobs", Component: JobRecommendations },
      { path: "applications", Component: ApplicationTracker },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "students", Component: StudentManagement },
      { path: "jobs", Component: JobManagement },
      { path: "applications", Component: ApplicationManagement },
      { path: "candidate/:studentId", Component: CandidateInsight },
    ],
  },
]);
