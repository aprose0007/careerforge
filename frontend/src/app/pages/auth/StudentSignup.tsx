import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { signInWithGoogle, signUpWithEmail, updateStudent } from "../../services/firebase";

export default function StudentSignup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      try {
        await updateStudent(user.uid, {
          name: user.displayName || "Anonymous User",
          email: user.email || "",
        });
      } catch(e) { console.warn("Seed fail"); }
      navigate("/student");
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(err.message || "Failed to sign up with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setIsLoading(false);
        return;
      }
      
      const authPromise = signUpWithEmail(email, password, name);
      const timeoutPromise = new Promise<any>((_, reject) => 
        setTimeout(() => reject(new Error("Network timeout: Firebase is taking too long to respond. Please check your connection or refresh the page.")), 10000)
      );
      
      const user = await Promise.race([authPromise, timeoutPromise]);
      
      try {
        await updateStudent(user.uid, {
          name: name,
          email: email,
        });
      } catch (e) {
        console.warn("Firestore profile creation failed or hangs, but user created:", e);
      }
      navigate("/student");
    } catch (err: any) {
      console.error("Signup error catch triggered:", err);
      setError(err.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
        <p className="text-muted-foreground font-medium">Join as a Student</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailSignup} className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Johnson" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@university.edu" className="h-12 rounded-xl" />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="h-12 rounded-xl" />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full h-12 rounded-xl shadow-md text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white border-0">
          {isLoading ? "Creating..." : "Sign up"}
        </Button>

      </form>

      <p className="text-center text-sm font-medium text-muted-foreground mt-4">
        Already have an account? <Link to="/student/login" className="text-primary hover:underline font-bold">Sign in</Link>
      </p>
      <p className="text-center text-xs mt-4">
        <Link to="/" className="text-muted-foreground hover:underline">Change Portal</Link>
      </p>
    </div>
  );
}
