import { NextRequest, NextResponse } from 'next/server';
import questionsData from '@/data/questions.json';

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Mendapatkan daftar pertanyaan personality test
 *     description: Endpoint ini mengembalikan daftar pertanyaan untuk personality test (MBTI-style). Secara default mengembalikan semua 25 pertanyaan.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Jumlah pertanyaan yang akan dikembalikan (default 25)
 *         example: 25
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan daftar pertanyaan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID unik pertanyaan
 *                         example: "q-001"
 *                       text:
 *                         type: string
 *                         description: Teks pertanyaan
 *                         example: "When faced with a difficult problem, you are more likely to:"
 *                       options:
 *                         type: array
 *                         description: Pilihan jawaban (biasanya 2 pilihan untuk personality test)
 *                         items:
 *                           type: string
 *                         example: ["Analyze it logically and systematically.", "Go with your gut feeling and intuition."]
 *                       correctAnswer:
 *                         type: string
 *                         description: Jawaban yang benar (untuk personality test, tidak ada jawaban benar/salah)
 *                         example: "Analyze it logically and systematically."
 *                       category:
 *                         type: string
 *                         description: Kategori pertanyaan
 *                         example: "personality"
 *                       difficulty:
 *                         type: string
 *                         enum: [easy, medium, hard]
 *                         description: Tingkat kesulitan pertanyaan
 *                         example: "easy"
 *                 total:
 *                   type: integer
 *                   description: Total pertanyaan yang tersedia
 *                   example: 25
 *       400:
 *         description: Request tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '25');

    // Validasi limit
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Limit harus antara 1 dan 100',
        },
        { status: 400 }
      );
    }

    // Load questions dari JSON file
    const allQuestions = questionsData.map((q) => ({
      id: `q-${String(q.id).padStart(3, '0')}`,
      text: q.text,
      options: q.options,
      correctAnswer: q.options[0], // Default first option as correct (untuk personality test tidak ada benar/salah)
      category: q.category,
      difficulty: q.difficulty,
    }));

    // Limit hasil (default 25 untuk personality test)
    const limitedQuestions = allQuestions.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedQuestions,
      total: allQuestions.length,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan saat mengambil pertanyaan',
      },
      { status: 500 }
    );
  }
}

