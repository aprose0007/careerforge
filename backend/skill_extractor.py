import re

# Comprehensive list of technical skills
TECHNICAL_SKILLS = [
    # Languages
    "python", "javascript", "typescript", "java", "c++", "c#", "php", "ruby", "swift", "kotlin", "go", "rust", "r", "sql", "html", "css", "sass", "less",
    
    # Frontend
    "react", "angular", "vue", "next.js", "nuxt.js", "svelte", "jquery", "tailwind", "bootstrap", "material ui", "shadcn", "redux", "zustand",
    
    # Backend
    "node.js", "express.js", "nest.js", "django", "flask", "fasapi", "spring boot", "laravel", "asp.net", "graphql", "rest api", "trpc", 
    
    # Database
    "mongodb", "postgresql", "mysql", "redis", "firebase", "firestore", "supabase", "cassandra", "elasticsearch", "sqlite",
    
    # Cloud & DevOps
    "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "terraform", "ansible", "nginx", "ci/cd", "github actions", "vercel", "netlify",
    
    # Mobile
    "react native", "flutter", "ios", "android", "expo", "swiftui", "jetpack compose",
    
    # Data Science & ML
    "tensorflow", "pytorch", "scikit-learn", "numpy", "pandas", "matplotlib", "seaborn", "nltk", "spacy", "opencv", "big data", "hadoop", "spark",
    
    # Tools & Misc
    "git", "jira", "figma", "postman", "unity", "docker", "agile", "scrum", "unit testing", "jest", "cypress", "selenium", "webpack", "vite"
]

def extract_skills(text: str) -> list:
    """
    Extract technical skills from text using keyword matching.
    - Tokenizes text
    - Matches against TECHNICAL_SKILLS
    """
    extracted = []
    text = text.lower()
    
    # Use word boundary to avoid partial matches (e.g., 'java' in 'javascript')
    for skill in TECHNICAL_SKILLS:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text):
            extracted.append(skill)
            
    return list(set(extracted))
