# CareerIntel AI Backend (FastAPI)

This is the AI processing layer for the Career Intelligence Platform. It handles resume parsing, skill extraction, and semantic job matching using TF-IDF and Cosine Similarity.

## Prerequisites

- Python 3.8+
- pip (Python package manager)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

Start the FastAPI server using uvicorn:

```bash
python main.py
```

The server will be available at `http://localhost:8000`.

## API Endpoints

### 1. Analyze Resume
`POST /analyze-resume`
Extracts technical skills and metadata from raw text.

**Request Body:**
```json
{
  "resume_text": "Experienced Python developer with React knowledge..."
}
```

### 2. Match Jobs
`POST /match-jobs`
Calculates match scores and identifies skill gaps for a list of jobs.

**Request Body:**
```json
{
  "resume_text": "...",
  "user_skills": ["python", "react"],
  "jobs": [
    {
      "id": "job1",
      "description": "Looking for a Django expert...",
      "required_skills": ["python", "django"]
    }
  ]
}
```

## Modular Structure

- `main.py`: Entry point and API definitions.
- `resume_parser.py`: Text cleaning and preprocessing logic.
- `skill_extractor.py`: Keyword-based skill identification.
- `matcher.py`: TF-IDF vectorization and cosine similarity matching.
