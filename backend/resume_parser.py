import re
import string

def preprocess_text(text: str) -> str:
    """
    Clean and preprocess text for analysis.
    - Convert to lowercase
    - Remove punctuation
    - Remove noise (multiple spaces, newlines, etc.)
    """
    if not text:
        return ""
        
    # Lowercase
    text = text.lower()
    
    # Remove newlines and excess spaces
    text = re.sub(r'[\r\n|\r|\n]+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    
    # Remove punctuation (optional, but good for some analyses)
    # text = text.translate(str.maketrans('', '', string.punctuation))
    
    return text.strip()

def extract_metadata(text: str) -> dict:
    """
    Extract basic metadata from text (emails, phones, URLs).
    """
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    phone_pattern = r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}'
    url_pattern = r'https?://[^\s<>"]+|www\.[^\s<>"]+'

    emails = re.findall(email_pattern, text)
    phones = re.findall(phone_pattern, text)
    urls = re.findall(url_pattern, text)

    return {
        "emails": emails,
        "phones": list(set(phones)),
        "urls": urls
    }
