from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

from resume_parser import preprocess_text, extract_metadata
from skill_extractor import extract_skills
from matcher import calculate_match_score, analyze_skill_gap

app = FastAPI(title="CareerIntel AI Engine")

# CORS: set ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5173 on Railway/production.
# Wildcard + credentials is invalid in browsers; we disable credentials when using "*".
_origins_raw = os.getenv("ALLOWED_ORIGINS", "").strip()
if _origins_raw:
    _allow_origins = [o.strip() for o in _origins_raw.split(",") if o.strip()]
    _allow_credentials = True
else:
    _allow_origins = ["*"]
    _allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allow_origins,
    allow_credentials=_allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Data Models ───────────────────────────────────────────────────────────────

class ResumeAnalyzeRequest(BaseModel):
    resume_text: str

class ResumeAnalyzeResponse(BaseModel):
    skills: List[str]
    metadata: dict

class JobDescription(BaseModel):
    id: str
    description: str
    required_skills: List[str]

class JobMatchRequest(BaseModel):
    resume_text: str
    user_skills: List[str]
    jobs: List[JobDescription]

class JobMatchResult(BaseModel):
    job_id: str
    match_score: float
    missing_skills: List[str]

# ─── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"status": "online", "service": "CareerIntel AI Engine"}


@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze-resume", response_model=ResumeAnalyzeResponse)
def analyze_resume(request: ResumeAnalyzeRequest):
    """
    Endpoint for skill extraction and text cleaning.
    """
    if not request.resume_text:
        raise HTTPException(status_code=400, detail="Empty resume text")
        
    cleaned_text = preprocess_text(request.resume_text)
    skills = extract_skills(cleaned_text)
    metadata = extract_metadata(cleaned_text)
    
    return {
        "skills": skills,
        "metadata": metadata
    }

@app.post("/match-jobs", response_model=List[JobMatchResult])
def match_jobs(request: JobMatchRequest):
    """
    Endpoint for semantic job matching and skill gap analysis.
    """
    results = []
    
    # Preprocess resume text once for consistency
    cleaned_resume = preprocess_text(request.resume_text)
    
    for job in request.jobs:
        # Calculate semantic score (cosine similarity)
        cleaned_job = preprocess_text(job.description)
        semantic_similarity = calculate_match_score(cleaned_resume, cleaned_job)
        
        # Calculate gap analysis
        missing_skills = analyze_skill_gap(request.user_skills, job.required_skills)
        
        # Final match score = (semantic similarity * 0.7) + (skill match % * 0.3)
        # Higher score if less skills are missing
        skill_coverage = 1.0 if not job.required_skills else 1.0 - (len(missing_skills) / len(job.required_skills))
        
        # Combine metrics for a robust score
        final_score = int((semantic_similarity * 0.7 + skill_coverage * 0.3) * 100)
        
        results.append({
            "job_id": job.id,
            "match_score": min(100, final_score), # Cap at 100
            "missing_skills": missing_skills
        })
        
    # Sort results by score (descending)
    results.sort(key=lambda x: x["match_score"], reverse=True)
    
    return results

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable for Railway, default to 8000 locally
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
