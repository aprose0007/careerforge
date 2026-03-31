import { useState, useEffect } from "react";
import { getStudent, auth, type StudentProfile } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useStudent() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profile = await getStudent(user.uid);
          setStudent(profile);
          setError(null);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setStudent(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { student, loading, error };
}
