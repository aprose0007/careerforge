import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { signInWithGoogle, updateStudent } from "../services/firebase";
import { LogIn, Github, Mail } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"student" | "admin">("student");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      
      // Auto-create/update profile on first login
      await updateStudent(user.uid, {
        name: user.displayName || "Anonymous User",
        email: user.email || "",
        lastAnalyzed: new Date().toISOString()
      });

      if (userType === "student") {
        navigate("/student");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType === "student") {
      navigate("/student");
    } else {
      navigate("/admin");
    }
  };

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

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-card shadow-[-20px_0_40px_rgba(0,0,0,0.02)] z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground font-medium">Sign in to your account to continue</p>
          </div>

          <Tabs defaultValue="student" onValueChange={(v) => setUserType(v as "student" | "admin")}>
            <TabsList className="grid w-full grid-cols-2 h-14 rounded-xl p-1 bg-muted/50 border border-border/50">
              <TabsTrigger value="student" className="rounded-lg font-semibold text-base py-2.5">Student</TabsTrigger>
              <TabsTrigger value="admin" className="rounded-lg font-semibold text-base py-2.5">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.edu"
                    className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                    <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl shadow-md text-base font-semibold bg-gradient-brand border-0">
                  Sign in as Student
                </Button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider">
                    <span className="bg-card px-3 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoogleLogin} 
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl border-2 hover:bg-accent hover:text-accent-foreground font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                      Connecting...
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2.5">
                  <Label htmlFor="admin-email" className="text-sm font-semibold">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@university.edu"
                    className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="admin-password" className="text-sm font-semibold">Password</Label>
                    <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot?</a>
                  </div>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-border bg-background focus-visible:ring-primary"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl shadow-md text-base font-semibold bg-gradient-brand border-0">
                  Sign in as Admin
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm font-medium text-muted-foreground pt-4">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:underline font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}