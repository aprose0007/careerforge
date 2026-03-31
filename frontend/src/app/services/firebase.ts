import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut 
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
  serverTimestamp
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
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
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
  const result = await signInWithPopup(auth, provider);
  return {
    uid: result.user.uid,
    email: result.user.email,
    displayName: result.user.displayName,
  };
}

export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const role = email.includes("admin") ? "admin" : "student";
  return { uid: result.user.uid, role };
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
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
}

export async function createApplication(application: Omit<Application, "id" | "appliedAt">) {
  const docRef = await addDoc(collection(db, "applications"), {
    ...application,
    appliedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function saveRecommendations(recommendations: Omit<Recommendation, "id">[]) {
  const batch = recommendations.map(rec => 
    setDoc(doc(collection(db, "recommendations")), rec)
  );
  await Promise.all(batch);
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
