import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  browserPopupRedirectResolver
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

// ─── Firebase Config ──────────────────────────────────────────────────────────
// These values should be replaced with your actual Firebase project settings
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "careerforge-48f3e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
};

import { initializeFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export const storage = getStorage(app);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cgpa: number;
  department: string;
  university: string;
  graduationYear: number;
  skills: string[];
  interests: string[];
  profileStrength: number;
  resumeUrl?: string;
  resumeFileName?: string;
  resumeText?: string;
  lastAnalyzed?: any;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  skills: string[];
  description: string;
  status: "active" | "closed";
  postedAt: string;
  logoUrl?: string;
  minCgpa?: number;
  /** Stipend or salary range for listings */
  compensation?: string;
  applicationsCount?: number;
}

export interface Application {
  id: string;
  studentId: string;
  jobId: string;
  status: "applied" | "shortlisted" | "interview" | "offered" | "rejected";
  appliedAt: any;
  matchScore: number;
}

export interface Recommendation {
  id: string;
  userId: string;
  jobId: string;
  matchScore: number;
  missingSkills: string[];
  status: "new" | "viewed" | "applied";
}

// ─── Auth ───────────────────────────────────────────────────────────────────

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    const result = await signInWithPopup(auth, provider);
    return {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
    };
  } catch (err: any) {
    if (err.code === 'auth/cancelled-popup-request' || err.code === 'auth/popup-blocked') {
      throw new Error("Google login blocked by your browser's strict Cross-Origin security. Please use Email Sign Up.");
    }
    throw err;
  }
}

export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return { uid: result.user.uid, email: result.user.email, displayName: result.user.displayName };
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return { uid: result.user.uid, email: result.user.email, displayName: name };
}

export async function signOut() {
  await firebaseSignOut(auth);
}

// ─── Firestore Operations ─────────────────────────────────────────────────────

export async function getStudent(studentId: string): Promise<StudentProfile | null> {
  const docRef = doc(db, "users", studentId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as StudentProfile) : null;
}

export async function updateStudent(studentId: string, data: Partial<StudentProfile>) {
  const docRef = doc(db, "users", studentId);
  // Using setDoc with merge: true to create if doesn't exist
  await setDoc(docRef, { ...data, id: studentId }, { merge: true });
}

export async function getJobs(): Promise<Job[]> {
  const querySnapshot = await getDocs(collection(db, "jobs"));
  return querySnapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      skills: Array.isArray(data.skills) ? data.skills : [],
      description: typeof data.description === "string" ? data.description : "",
    } as Job;
  });
}

export async function createJob(job: Omit<Job, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "jobs"), {
    ...job,
    skills: job.skills ?? [],
    status: job.status ?? "active",
    applicationsCount: job.applicationsCount ?? 0,
  });
  return docRef.id;
}

export async function deleteJob(jobId: string): Promise<void> {
  await deleteDoc(doc(db, "jobs", jobId));
}

/** Add multiple jobs (e.g. Chennai sample pack). Skips a row if same title+company+location already exists. */
export async function createJobsIfNew(
  jobs: Omit<Job, "id">[],
  existing: Pick<Job, "title" | "company" | "location">[]
): Promise<number> {
  const key = (j: Pick<Job, "title" | "company" | "location">) =>
    `${j.title}|${j.company}|${j.location}`.toLowerCase();
  const existingKeys = new Set(existing.map(key));
  let added = 0;
  for (const job of jobs) {
    if (existingKeys.has(key(job))) continue;
    await createJob(job);
    existingKeys.add(key(job));
    added += 1;
  }
  return added;
}

export async function createApplication(application: Omit<Application, "id" | "appliedAt">) {
  const docRef = await addDoc(collection(db, "applications"), {
    ...application,
    appliedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function saveRecommendations(recommendations: Omit<Recommendation, "id">[]) {
  await Promise.all(
    recommendations.map((rec) =>
      setDoc(doc(db, "recommendations", `${rec.userId}_${rec.jobId}`), rec, { merge: true })
    )
  );
}

export async function getRecommendations(userId: string): Promise<Recommendation[]> {
  const q = query(collection(db, "recommendations"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recommendation));
}

// ─── Storage Operations ────────────────────────────────────────────────────────

export async function uploadResume(file: File, studentId: string) {
  const storageRef = ref(storage, `resumes/${studentId}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return { downloadUrl, fileName: file.name };
}

export async function saveResumeData(userId: string, data: { fileUrl: string, extractedText: string, extractedSkills: string[] }) {
  const docRef = doc(collection(db, "resumes"));
  await setDoc(docRef, {
    ...data,
    userId,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}
