import { Outlet } from "react-router";
import { Card } from "../components/ui/card";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-accent to-primary/10 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-lg space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold tracking-wider">CI</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground leading-tight tracking-tight">
              AI-Powered Career Intelligence
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Match your skills with perfect opportunities. Get personalized insights and recommendations to accelerate your career growth.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 space-y-2 border-2 hover:border-primary/50 transition-colors bg-card/80 backdrop-blur-md shadow-sm">
              <div className="text-3xl font-bold text-primary">95%</div>
              <p className="text-sm font-medium text-muted-foreground">Match Accuracy</p>
            </Card>
            <Card className="p-6 space-y-2 border-2 hover:border-primary/50 transition-colors bg-card/80 backdrop-blur-md shadow-sm">
              <div className="text-3xl font-bold text-primary">10k+</div>
              <p className="text-sm font-medium text-muted-foreground">Active Students</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Side - Dynamic Outlet */}
      <div className="flex-1 flex items-center justify-center p-8 bg-card shadow-[-20px_0_40px_rgba(0,0,0,0.02)] z-10">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
