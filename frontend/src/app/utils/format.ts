// Formatting utilities

/**
 * Returns a Tailwind color class based on match score percentage
 */
export function matchScoreColor(score: number): string {
  if (score >= 85) return "text-emerald-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 55) return "text-amber-600";
  return "text-red-500";
}

export function matchScoreBg(score: number): string {
  if (score >= 85) return "bg-emerald-50 border-emerald-100";
  if (score >= 70) return "bg-blue-50 border-blue-100";
  if (score >= 55) return "bg-amber-50 border-amber-100";
  return "bg-red-50 border-red-100";
}

export function matchScoreRingColor(score: number): string {
  if (score >= 85) return "#10B981";
  if (score >= 70) return "#4F7FFF";
  if (score >= 55) return "#F59E0B";
  return "#EF4444";
}

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Format relative time
 */
export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Get initials from full name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Status badge config
 */
export type AppStatus = "applied" | "shortlisted" | "interview" | "offered" | "rejected" | "pending";

export function statusConfig(status: AppStatus): { label: string; className: string } {
  const configs: Record<AppStatus, { label: string; className: string }> = {
    applied: { label: "Applied", className: "bg-blue-50 text-blue-600 border-blue-100" },
    shortlisted: { label: "Shortlisted", className: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    interview: { label: "Interview", className: "bg-purple-50 text-purple-600 border-purple-100" },
    offered: { label: "Offered", className: "bg-green-50 text-green-700 border-green-200" },
    rejected: { label: "Rejected", className: "bg-red-50 text-red-600 border-red-100" },
    pending: { label: "Pending", className: "bg-amber-50 text-amber-600 border-amber-100" },
  };
  return configs[status] ?? configs.pending;
}
