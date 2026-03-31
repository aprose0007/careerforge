# Firebase Cloud Functions (Python)
from firebase_functions import https_fn, options
from firebase_admin import initialize_app
import json

# Local module imports
from resume_parser import preprocess_text, extract_metadata
from skill_extractor import extract_skills
from matcher import calculate_match_score, analyze_skill_gap

# Initialize Firebase Admin
initialize_app()

@https_fn.on_request(
    cors=options.CorsOptions(allow_origin="*", allow_methods=["POST"]),
    memory=options.MemoryOption.GB_1
)
def analyze_resume(req: https_fn.Request) -> https_fn.Response:
    """
    Firebase Function for skill extraction and text cleaning.
    """
    if req.method != "POST":
        return https_fn.Response("Method Not Allowed", status=405)
        
    data = req.get_json()
    resume_text = data.get("resume_text", "")
    
    if not resume_text:
        return https_fn.Response(json.dumps({"error": "Empty resume text"}), status=400, mimetype="application/json")
        
    cleaned_text = preprocess_text(resume_text)
    skills = extract_skills(cleaned_text)
    metadata = extract_metadata(cleaned_text)
    
    return https_fn.Response(
        json.dumps({
            "skills": skills,
            "metadata": metadata
        }),
        mimetype="application/json"
    )

@https_fn.on_request(
    cors=options.CorsOptions(allow_origin="*", allow_methods=["POST"]),
    memory=options.MemoryOption.GB_1
)
def match_jobs(req: https_fn.Request) -> https_fn.Response:
    """
    Firebase Function for semantic job matching and skill gap analysis.
    """
    if req.method != "POST":
        return https_fn.Response("Method Not Allowed", status=405)
        
    data = req.get_json()
    resume_text = data.get("resume_text", "")
    user_skills = data.get("user_skills", [])
    jobs = data.get("jobs", [])
    
    results = []
    
    # Preprocess resume text once
    cleaned_resume = preprocess_text(resume_text)
    
    for job in jobs:
        # Calculate semantic score
        cleaned_job = preprocess_text(job.get("description", ""))
        semantic_similarity = calculate_match_score(cleaned_resume, cleaned_job)
        
        # Calculate gap analysis
        missing_skills = analyze_skill_gap(user_skills, job.get("required_skills", []))
        
        # Final match score = (semantic similarity * 0.7) + (skill match % * 0.3)
        job_skills = job.get("required_skills", [])
        skill_coverage = 1.0 if not job_skills else 1.0 - (len(missing_skills) / len(job_skills))
        
        # Combine metrics
        final_score = int((semantic_similarity * 0.7 + skill_coverage * 0.3) * 100)
        
        results.append({
            "job_id": job.get("id"),
            "match_score": min(100, final_score),
            "missing_skills": missing_skills
        })
        
    # Sort results
    results.sort(key=lambda x: x["match_score"], reverse=True)
    
    return https_fn.Response(json.dumps(results), mimetype="application/json")
