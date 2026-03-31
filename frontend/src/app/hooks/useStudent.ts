import { useState, useEffect } from "react";
import { getStudent, type StudentProfile } from "../services/firebase";

export function useStudent(studentId = "mock-uid-001") {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getStudent(studentId)
      .then((data) => { if (!cancelled) { setStudent(data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [studentId]);

  return { student, loading, error };
}
