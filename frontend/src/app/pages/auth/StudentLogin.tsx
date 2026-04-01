import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { signInWithGoogle, signInWithEmail, updateStudent } from "../../services/firebase";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      await updateStudent(user.uid, {
        name: user.displayName || "Anonymous User",
        email: user.email || "",
      });
      navigate("/student");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const authPromise = signInWithEmail(email, password);
      const timeoutPromise = new Promise<any>((_, reject) => 
        setTimeout(() => reject(new Error("Network timeout: Firebase is taking too long to respond. Please disable any adblockers and refresh.")), 10000)
      );
      
      await Promise.race([authPromise, timeoutPromise]);
      navigate("/student");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Student Portal</h2>
        <p className="text-muted-foreground font-medium">Sign in to your account</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@university.edu" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
          </div>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="h-12 rounded-xl" />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full h-12 rounded-xl shadow-md text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white border-0">
          {isLoading ? "Signing In..." : "Sign in"}
        </Button>

      </form>

      <p className="text-center text-sm font-medium text-muted-foreground mt-4">
        Don't have an account? <Link to="/student/signup" className="text-primary hover:underline font-bold">Sign up</Link>
      </p>
      <p className="text-center text-xs mt-4">
        <Link to="/" className="text-muted-foreground hover:underline">Change Portal</Link>
      </p>
    </div>
  );
}
