import Groq from "groq-sdk";
import type { Answer, UserData } from "@/types/index";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set in .env.local");
}
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const answerMappings: {
  [questionId: number]: {
    [optionId: string]: { [weatherType: string]: number };
  };
} = {
  // Soal: ID Opsi: { Tipe Cuaca: Skor }
  1: { A: { Sunny: 2 }, B: { Stormy: 2 }, C: { Rainy: 2 }, D: { Cloudy: 2 } },
  2: { A: { Stormy: 2 }, B: { Rainy: 2 }, C: { Cloudy: 2 }, D: { Sunny: 2 } },
  3: { A: { Sunny: 2 }, B: { Stormy: 2 }, C: { Rainy: 2 }, D: { Cloudy: 2 } },
  4: { A: { Rainy: 2 }, B: { Stormy: 2 }, C: { Sunny: 2 }, D: { Cloudy: 2 } },
  5: { A: { Rainy: 2 }, B: { Sunny: 2 }, C: { Cloudy: 2 }, D: { Stormy: 2 } },
  6: { A: { Rainy: 2 }, B: { Sunny: 2 }, C: { Stormy: 2 }, D: { Cloudy: 2 } },
  7: { A: { Sunny: 2 }, B: { Rainy: 2 }, C: { Cloudy: 2 }, D: { Stormy: 2 } },
  8: { A: { Cloudy: 2 }, B: { Stormy: 2 }, C: { Sunny: 2 }, D: { Rainy: 2 } },
  9: { A: { Sunny: 2 }, B: { Rainy: 2 }, C: { Stormy: 2 }, D: { Cloudy: 2 } },
  10: { A: { Sunny: 2 }, B: { Stormy: 2 }, C: { Cloudy: 2 }, D: { Rainy: 2 } },
  11: { A: { Stormy: 2 }, B: { Sunny: 2 }, C: { Rainy: 2 }, D: { Cloudy: 2 } },
  12: { A: { Rainy: 2 }, B: { Cloudy: 2 }, C: { Stormy: 2 }, D: { Sunny: 2 } },
  13: { A: { Sunny: 2 }, B: { Stormy: 2 }, C: { Cloudy: 2 }, D: { Rainy: 2 } },
  14: { A: { Rainy: 2 }, B: { Stormy: 2 }, C: { Sunny: 2 }, D: { Cloudy: 2 } },
  15: { A: { Sunny: 2 }, B: { Stormy: 2 }, C: { Rainy: 2 }, D: { Cloudy: 2 } },
};

function determineWeatherType(answers: Answer[]): string {
  const scores: { [key: string]: number } = {
    Sunny: 0,
    Rainy: 0,
    Stormy: 0,
    Cloudy: 0,
  };
  const validTypes = Object.keys(scores);

  answers.forEach((ans) => {
    const questionMapping = answerMappings[ans.questionId];
    if (questionMapping) {
      const optionMapping = questionMapping[ans.value];
      if (optionMapping) {
        for (const type in optionMapping) {
          if (validTypes.includes(type)) {
            scores[type] += optionMapping[type];
          }
        }
      }
    }
  });

  let highestScore = -1;
  let determinedType = "Cloudy"; // Default
  for (const type in scores) {
    if (scores[type] > highestScore) {
      highestScore = scores[type];
      determinedType = type;
    }
    // TODO: Handle jika ada skor yang sama persis
  }
  console.log("Final Scores:", scores);
  return determinedType;
}

export async function getPersonalityAnalysis(
  answers: Answer[],
  userData: UserData,
): Promise<{ weatherType: string; uniqueSummary: string }> {
  const weatherType = determineWeatherType(answers);
  const answerSummary = answers
    .map((a) => `- Q${a.questionId}: chose "${a.value}"`)
    .slice(0, 5)
    .join("\n");

  const modelName = "llama-3.1-8b-instant";
  // const apiKey = process.env.GROQ_API_KEY!;
  // const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`; // Endpoint v1
  const prompt = `
      You are a creative psychologist analyzing a personality test based on the Four Temperaments (Sanguine=Sunny, Choleric=Stormy, Melancholic=Rainy, Phlegmatic=Cloudy).
      The user, ${userData.nama}, has been determined to have the primary weather type: ${weatherType}.

      Based on their specific answers below, generate ONLY a single, creative, and insightful summary sentence (around 15-25 words) describing their unique personality blend using the determined weather metaphor. Make it sound like a unique title or headline for their personality. Do NOT add explanations.

      User's key answers:
      ${answerSummary}

      Example Output format:
      You are the Gentle Morning Rain: bringing calm reflection and quiet creativity.
      OR
      You are the Unpredictable Summer Storm: full of passionate energy and decisive action.

      Generate the unique summary sentence now:
    `;

  try {
    console.log(`Attempting to call Groq model: ${modelName}...`);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: modelName,
      temperature: 0.8, // Parameter
      max_tokens: 80, // Batasi output
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
    console.error(`Error calling Groq AI (${modelName}):`, error.message);
    throw new Error(`Failed to generate AI analysis using ${modelName}.`);
  }
}
