import { useState, useEffect } from "react";
import { getRecommendations, type JobRecommendation } from "../services/api";

export function useRecommendations(studentId = "mock-uid-001") {
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getRecommendations(studentId)
      .then((data) => { if (!cancelled) { setRecommendations(data); setLoading(false); } })
      .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [studentId]);

  return { recommendations, loading, error };
}
