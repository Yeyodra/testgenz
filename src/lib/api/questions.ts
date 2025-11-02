/**
 * API Service untuk Questions
 */

export interface QuestionChoice {
  label: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  choices: QuestionChoice[];
}

export interface ApiQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  category?: string;
  difficulty?: string;
}

export interface QuestionsResponse {
  success: boolean;
  data: ApiQuestion[];
  total: number;
}

/**
 * Transform API response ke format yang dibutuhkan komponen
 */
export function transformQuestions(apiQuestions: ApiQuestion[]): Question[] {
  return apiQuestions.map((q, index) => ({
    id: index + 1,
    question: q.text,
    choices: q.options.map((option, i) => ({
      label: String.fromCharCode(65 + i), // A, B, C, D
      text: option,
    })),
  }));
}

/**
 * Fetch questions dari API
 */
export async function fetchQuestions(params?: {
  category?: string;
  difficulty?: string;
  limit?: number;
}): Promise<Question[]> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.category) {
      searchParams.append('category', params.category);
    }
    if (params?.difficulty) {
      searchParams.append('difficulty', params.difficulty);
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }

    const url = `/api/questions${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data: QuestionsResponse = await response.json();
    
    if (!data.success) {
      throw new Error('API returned error');
    }

    return transformQuestions(data.data);
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

