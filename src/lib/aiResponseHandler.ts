import groq from "./groqClient";
import { determineWeatherType } from "./temperamentLogic";
import type { Answer, UserData } from "@/types/index";

const MODEL_NAME = "llama-3.1-8b-instant";

function createPrompt(
  weatherType: string,
  userData: UserData,
  answerSummary: string,
): string {
  return `
      You are a creative psychologist analyzing a personality test based on the Four Temperaments (Sanguine=Sunny, Choleric=Stormy, Melancholic=Rainy, Phlegmatic=Cloudy).
      The user, ${userData.nama}, has been determined to have the primary weather type: ${weatherType}.

      Based on their specific answers below, generate a creative and insightful 2-sentence personality summary (around 30-50 words).

      IMPORTANT:
      1.  Start with a unique "Weather Title" based on their type (e.g., "You are the Soothing Afternoon Rain..." or "You are the Unpredictable Summer Storm...").
      2.  The second sentence MUST be a personalized description that creatively explains WHY, connecting their metaphor to their personality traits (e.g., "...bringing quiet reflection and deep analysis to everything you touch." or "...full of passionate energy that can change the mood in an instant.").
      3.  Do NOT add any extra text, greetings, or explanations. Only provide the 2-sentence summary.

      User's key answers:
      ${answerSummary}

      Generate the 2-sentence summary now:
    `;
}

export async function getPersonalityAnalysis(
  answers: Answer[],
  userData: UserData,
): Promise<{ weatherType: string; uniqueSummary: string }> {
  const weatherType = determineWeatherType(answers);

  const answerSummary = answers
    .map((a) => `- Q${a.questionId}: chose "${a.value}"`)
    .slice(0, 5) // 5 jawaban pertama untuk konteks
    .join("\n");

  const prompt = createPrompt(weatherType, userData, answerSummary);

  try {
    console.log(`Attempting to call Groq model: ${MODEL_NAME}...`);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: MODEL_NAME,
      temperature: 0.8,
      max_tokens: 200,
      top_p: 1,
    });

    const uniqueSummary =
      chatCompletion.choices[0]?.message?.content?.trim() || "";

    if (!uniqueSummary) {
      console.warn("Groq returned an empty summary.");
      throw new Error("AI did not return a summary.");
    }

    console.log("Groq call successful. Summary obtained.");
    return { weatherType, uniqueSummary };
  } catch (error: any) {
    console.error(`Error calling Groq AI (${MODEL_NAME}):`, error.message);
    throw new Error(`Failed to generate AI analysis using ${MODEL_NAME}.`);
  }
}
