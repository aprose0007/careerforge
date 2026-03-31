import { Link, useLocation } from "react-router";
import { cn } from "@/app/components/ui/utils";
import { LucideIcon, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarProps {
  items: NavItem[];
  userRole?: "student" | "admin";
  userName?: string;
  userEmail?: string;
}

export default function Sidebar({ items, userRole = "student", userName = "Alex Johnson", userEmail = "alex@university.edu" }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="w-64 border-r border-border bg-card/50 backdrop-blur-md flex flex-col h-full shadow-sm">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold tracking-wider">CI</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">CareerIntel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="mb-4 px-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</p>
        </div>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground font-medium"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
            {userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-destructive" asChild>
            <Link to="/">
              <LogOut className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}