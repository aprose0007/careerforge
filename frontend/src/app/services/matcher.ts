/**
 * Simple TF-IDF and Cosine Similarity Matcher for Frontend AI matching.
 * This replaces the need for a Python backend.
 */

export interface MatchResult {
  score: number;
  missingSkills: string[];
}

/**
 * Basic Tokenizer and Text Preprocessing
 */
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2); // Filter out very short words/stop words
};

/**
 * Calculate TF-IDF Vectors for two documents
 */
const calculateVectors = (doc1: string, doc2: string): [Map<string, number>, Map<string, number>] => {
  const tokens1 = tokenize(doc1);
  const tokens2 = tokenize(doc2);
  const allTerms = new Set([...tokens1, ...tokens2]);

  const tf1 = new Map<string, number>();
  const tf2 = new Map<string, number>();

  // Term Frequency
  tokens1.forEach(term => tf1.set(term, (tf1.get(term) || 0) + 1));
  tokens2.forEach(term => tf2.set(term, (tf2.get(term) || 0) + 1));

  // Simplified TF-IDF (local matching)
  const vec1 = new Map<string, number>();
  const vec2 = new Map<string, number>();

  allTerms.forEach(term => {
    // Normalizing by total terms in each doc
    vec1.set(term, (tf1.get(term) || 0) / tokens1.length);
    vec2.set(term, (tf2.get(term) || 0) / tokens2.length);
  });

  return [vec1, vec2];
};

/**
 * Cosine Similarity between two Map-based vectors
 */
const cosineSimilarity = (vec1: Map<string, number>, vec2: Map<string, number>): number => {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  const allTerms = new Set([...vec1.keys(), ...vec2.keys()]);

  allTerms.forEach(term => {
    const val1 = vec1.get(term) || 0;
    const val2 = vec2.get(term) || 0;
    dotProduct += val1 * val2;
    magnitude1 += val1 * val1;
    magnitude2 += val2 * val2;
  });

  const divisor = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
  return divisor === 0 ? 0 : dotProduct / divisor;
};

/**
 * Core Matching Function
 */
export const calculateMatch = (resumeText: string, jobDescription: string, userSkills: string[], jobSkills: string[]): MatchResult => {
  if (!resumeText || !jobDescription) return { score: 0, missingSkills: [] };

  // 1. Semantic Score (Cosine Similarity)
  const [vec1, vec2] = calculateVectors(resumeText, jobDescription);
  const semanticScore = cosineSimilarity(vec1, vec2);

  // 2. Skill Gap Analysis
  const userSkillSet = new Set(userSkills.map(s => s.toLowerCase().trim()));
  const missingSkills = jobSkills.filter(skill => !userSkillSet.has(skill.toLowerCase().trim()));

  // 3. Combined Score (70% semantic, 30% skill match percentage)
  const skillMatchPercentage = jobSkills.length === 0 ? 1 : 1 - (missingSkills.length / jobSkills.length);
  const finalScore = Math.round((semanticScore * 0.7 + skillMatchPercentage * 0.3) * 100);

  return {
    score: Math.min(100, finalScore),
    missingSkills
  };
};

/**
 * Basic Keyword Extraction (Mock for skill extraction from text)
 */
export const extractSkillsFromText = (text: string, knownSkills: string[]): string[] => {
  const tokens = new Set(tokenize(text));
  return knownSkills.filter(skill => tokens.has(skill.toLowerCase().trim()));
};
