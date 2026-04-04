# CareerIntel / Resume Analyser

Student–admin career platform: Firebase (Auth, Firestore, Storage), React (Vite) frontend, FastAPI AI service for resume analysis and job matching.

## Local development

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your Firebase keys and optional VITE_BACKEND_URL
npm run dev
```

### Backend (optional; matching & `/analyze-resume` fall back client-side if unset)

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
cp .env.example .env
# Optional: ALLOWED_ORIGINS=http://localhost:5173
uvicorn main:app --reload --port 8000
```

- API: [http://127.0.0.1:8000](http://127.0.0.1:8000) — health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

## Deploy runbook (recommended order)

1. **Firebase** — Create/configure the web app; enable **Authentication** (Email, Google if used), **Firestore**, **Storage**. Deploy **security rules** for `users`, `jobs`, `applications`, `recommendations`, `resumes`, and storage paths before production traffic.

2. **Railway (FastAPI)** — New project → deploy from GitHub → set **Root Directory** to `backend` (this repo is a monorepo).

   | Variable | Example | Purpose |
   |----------|---------|---------|
   | `ALLOWED_ORIGINS` | `https://your-app.vercel.app,http://localhost:5173` | CORS for browser calls from the SPA |
   | `PORT` | *(set by Railway)* | Listen port |

   After deploy, copy the **public HTTPS URL** (no trailing slash) for the next step.

3. **Vercel (frontend)** — Import repo; set **Root Directory** to `frontend` (or build from `frontend` per your setup).

   | Variable | Purpose |
   |----------|---------|
   | `VITE_FIREBASE_API_KEY` | Firebase Web SDK |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Web SDK |
   | `VITE_FIREBASE_PROJECT_ID` | Firebase Web SDK |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Web SDK |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Web SDK |
   | `VITE_FIREBASE_APP_ID` | Firebase Web SDK |
   | `VITE_BACKEND_URL` | Railway API base URL (e.g. `https://xxx.up.railway.app`) |

   Redeploy after any `VITE_*` change (values are baked in at build time).

4. **CORS sanity check** — Open the live site, sign in as a student, open DevTools → Network. Calls to Railway for `/analyze-resume` or `/match-jobs` should succeed (200). If blocked, fix `ALLOWED_ORIGINS` on Railway to include your exact Vercel URL (scheme + host, no path).

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on push/PR to `main` or `master`: frontend `npm ci` + `npm run build`, backend `pip install` + import check.

## Alternative hosting

- **Render:** See `render.yaml`; set `ALLOWED_ORIGINS` in the dashboard for the Python service.
- **Firebase Hosting:** See root `firebase.json` (build output `frontend/dist`).

## Design reference

Original UI design: [Figma — AI Career Intelligence](https://www.figma.com/design/5ffjrIFwj0p6b4288ZXtFZ/AI-Career-Intelligence-UI-Design).
