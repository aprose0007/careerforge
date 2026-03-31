import { Card } from "./card";
import { type LucideIcon } from "lucide-react";
import { cn } from "./utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  colorClass?: string;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, colorClass = "text-primary", className }: StatCardProps) {
  return (
    <Card className={cn("p-6 border-2 hover:shadow-lg transition-all hover:-translate-y-0.5", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-2 text-sm">
              <span className={cn("font-medium", trend.isPositive ? "text-emerald-600" : "text-red-500")}>
                {trend.value}
              </span>
              {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-accent/50", colorClass)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
