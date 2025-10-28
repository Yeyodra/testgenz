import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Mendapatkan daftar pertanyaan tes
 *     description: Endpoint ini mengembalikan daftar pertanyaan untuk tes. Dapat difilter berdasarkan kategori atau tingkat kesulitan.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter pertanyaan berdasarkan kategori (optional)
 *         example: programming
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filter berdasarkan tingkat kesulitan (optional)
 *         example: medium
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Jumlah pertanyaan yang akan dikembalikan (default 10)
 *         example: 10
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
 *                     $ref: '#/components/schemas/Question'
 *                 total:
 *                   type: integer
 *                   description: Total pertanyaan yang tersedia
 *                   example: 50
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
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const limit = parseInt(searchParams.get('limit') || '10');

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

    // Data dummy untuk contoh
    const mockQuestions = [
      {
        id: 'q-001',
        text: 'Apa ibu kota Indonesia?',
        options: ['Jakarta', 'Bandung', 'Surabaya', 'Medan'],
        correctAnswer: 'Jakarta',
        category: 'geography',
        difficulty: 'easy',
      },
      {
        id: 'q-002',
        text: 'Berapa hasil dari 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        category: 'math',
        difficulty: 'easy',
      },
      {
        id: 'q-003',
        text: 'Apa kepanjangan dari HTML?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language',
        ],
        correctAnswer: 'Hyper Text Markup Language',
        category: 'programming',
        difficulty: 'medium',
      },
      {
        id: 'q-004',
        text: 'Siapa penemu lampu pijar?',
        options: ['Thomas Edison', 'Nikola Tesla', 'Albert Einstein', 'Isaac Newton'],
        correctAnswer: 'Thomas Edison',
        category: 'history',
        difficulty: 'medium',
      },
      {
        id: 'q-005',
        text: 'Apa kompleksitas waktu dari algoritma Binary Search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 'O(log n)',
        category: 'programming',
        difficulty: 'hard',
      },
    ];

    // Filter berdasarkan parameter
    let filteredQuestions = [...mockQuestions];

    if (category) {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (difficulty) {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    // Limit hasil
    const limitedQuestions = filteredQuestions.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: limitedQuestions,
      total: filteredQuestions.length,
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

