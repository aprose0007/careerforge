import { Badge } from "./badge";
import { cn } from "./utils";
import { Check, X, Clock } from "lucide-react";

type SkillState = "matched" | "missing" | "learning" | "default";

interface SkillBadgeProps {
  skill: string;
  state?: SkillState;
  className?: string;
}

export function SkillBadge({ skill, state = "default", className }: SkillBadgeProps) {
  const styles: Record<SkillState, string> = {
    matched: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    missing: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    learning: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  const Icon = {
    matched: Check,
    missing: X,
    learning: Clock,
    default: null,
  }[state];

  return (
    <Badge
      variant="outline"
      className={cn("px-3 py-1 text-sm font-medium rounded-lg gap-1.5 transition-colors", styles[state], className)}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {skill}
    </Badge>
  );
}
