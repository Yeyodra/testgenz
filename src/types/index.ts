export interface Answer {
  questionId: number;
  value: string; // ID Opsi ("A", "B", "C", "D")
}

export interface UserData {
  nama: string;
  email?: string;
}

// Tipe untuk respons dari endpoint /api/analyze
export interface AnalysisResponse {
  result: string; // Nama tipe cuaca (e.g., "Sunny", "Rainy")
  analysis: string; // Kalimat unique summary dari AI
}

export interface ErrorResponse {
  error: string;
}
