import { useLocation } from "react-router";
import { Bell, Moon, Sun, Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TopNavProps {
  onMenuClick?: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const location = useLocation();
  
  // Format pathname into a readable title
  const pathParts = location.pathname.split("/").filter(Boolean);
  const title = pathParts.length > 1 
    ? pathParts[1].replace("-", " ") 
    : pathParts[0] || "Dashboard";

  return (
    <div className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 shadow-sm flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {onMenuClick && (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="w-6 h-6" />
          </Button>
        )}
        <h1 className="text-xl font-semibold capitalize hidden md:block">
          {title}
        </h1>
        <div className="relative max-w-md w-full md:ml-8 hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search jobs, skills, or candidates..." 
            className="w-full pl-9 h-10 bg-muted/50 border-none rounded-full focus-visible:ring-1 focus-visible:bg-background"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Toggle placeholder */}
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
          <Sun className="w-5 h-5 hidden dark:block" />
          <Moon className="w-5 h-5 block dark:hidden" />
        </Button>

        <Button variant="outline" size="icon" className="relative rounded-full border-border bg-background">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background"></span>
        </Button>
      </div>
    </div>
  );
}