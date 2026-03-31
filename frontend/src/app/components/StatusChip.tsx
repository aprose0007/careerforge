import { cn } from "../components/ui/utils";

interface StatusChipProps {
  status: "applied" | "shortlisted" | "rejected" | "selected" | "pending";
  className?: string;
}

export default function StatusChip({ status, className }: StatusChipProps) {
  const variants = {
    applied: "bg-blue-50 text-[#4F7FFF] border-[#4F7FFF]/20",
    shortlisted: "bg-emerald-50 text-emerald-600 border-emerald-200",
    rejected: "bg-red-50 text-red-600 border-red-200",
    selected: "bg-green-50 text-green-600 border-green-200",
    pending: "bg-amber-50 text-amber-600 border-amber-200",
  };

  const labels = {
    applied: "Applied",
    shortlisted: "Shortlisted",
    rejected: "Rejected",
    selected: "Selected",
    pending: "Pending",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full border-2 text-xs font-medium transition-colors",
        variants[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}