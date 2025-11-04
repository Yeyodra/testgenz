import { NextResponse } from "next/server";
import questions from "@/lib/questions";

export async function GET() {
  try {
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pertanyaan." },
      { status: 500 },
    );
  }
}
