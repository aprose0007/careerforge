import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { signInWithEmail } from "../../services/firebase";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Hardcoded restriction as requested: ONLY one admin allowed
    if (email.trim().toLowerCase() !== "testing123@gmail.com" || password !== "testercanwork@123") {
      setIsLoading(false);
      return setError("Unauthorized: Only verified administrators can access this portal with the correct credentials.");
    }

    try {
      await signInWithEmail(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError("Invalid administrator credentials. Please check your password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Admin Portal</h2>
        <p className="text-muted-foreground font-medium">Sign in to manage the platform</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-sm font-semibold">Admin Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="testing123@gmail.com" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••" 
              className="h-12 rounded-xl pr-10" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <Button disabled={isLoading} type="submit" className="w-full h-12 rounded-xl shadow-md text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white border-0">
          {isLoading ? "Signing In..." : "Sign in as Admin"}
        </Button>
      </form>

      <p className="text-center text-xs mt-8 pt-4 border-t border-border">
        <Link to="/" className="text-muted-foreground hover:underline">Return to Portal Selection</Link>
      </p>
    </div>
  );
}
