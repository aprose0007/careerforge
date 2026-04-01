import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { GraduationCap, ShieldCheck } from "lucide-react";

export default function RoleSelection() {
  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome to CareerIntel</h2>
        <p className="text-muted-foreground font-medium">Select your portal to continue</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
        <Button asChild className="h-20 rounded-2xl border-2 bg-card hover:bg-accent text-foreground hover:border-primary/50 transition-all shadow-sm justify-start px-6">
          <Link to="/student/login" className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Student Portal</div>
              <div className="text-sm text-muted-foreground font-normal">Login or register to build your career</div>
            </div>
          </Link>
        </Button>

        <Button asChild className="h-20 rounded-2xl border-2 bg-card hover:bg-accent text-foreground hover:border-primary/50 transition-all shadow-sm justify-start px-6">
          <Link to="/admin/login" className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Admin / University Portal</div>
              <div className="text-sm text-muted-foreground font-normal">Manage placements and students</div>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
