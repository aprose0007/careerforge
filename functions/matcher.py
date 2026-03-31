from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def calculate_match_score(resume_text: str, job_description: str) -> float:
    """
    Calculate semantic match score between resume and job description.
    - Uses TF-IDF for vectorization
    - Uses Cosine Similarity for scoring
    """
    if not resume_text or not job_description:
        return 0.0
        
    documents = [resume_text, job_description]
    
    # Simple vectorization
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)
    
    # Compute cosine similarity
    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    
    return float(similarity[0][0])

def analyze_skill_gap(resume_skills: list, job_required_skills: list) -> list:
    """
    Identify missing skills based on job requirements.
    - Compares lists (case-insensitive)
    - Returns set of missing items
    """
    if not job_required_skills:
        return []
        
    resume_set = {s.lower() for s in resume_skills}
    job_set = {s.lower() for s in job_required_skills}
    
    missing = list(job_set - resume_set)
    
    return missing
