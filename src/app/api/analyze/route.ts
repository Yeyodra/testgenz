import { NextResponse } from "next/server";
import { getPersonalityAnalysis } from "@/lib/aiResponseHandler";
import type {
  Answer,
  UserData,
  AnalysisResponse,
  ErrorResponse,
} from "@/types/index";

interface RequestBody {
  answers: Answer[];
  userData: UserData;
}

export async function POST(
  request: Request,
): Promise<NextResponse<AnalysisResponse | ErrorResponse>> {
  try {
    const body: RequestBody = await request.json();
    const { answers, userData } = body;

    // Validation
    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0 ||
      !userData ||
      typeof userData !== "object" ||
      !userData.nama ||
      typeof userData.nama !== "string"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid input: Missing or malformed answers or user data (name is required).",
        },
        { status: 400 },
      );
    }

    const { weatherType, uniqueSummary } = await getPersonalityAnalysis(
      answers,
      userData,
    );

    const responseData: AnalysisResponse = {
      result: weatherType,
      analysis: uniqueSummary,
    };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in /api/analyze POST handler:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred during analysis.";

    const errorResponse: ErrorResponse = { error: message };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
