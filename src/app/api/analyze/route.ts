import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/analyze:
 *   post:
 *     summary: Menganalisis jawaban tes pengguna
 *     description: Endpoint ini menerima data pengguna dan jawaban mereka, kemudian menganalisis hasilnya menggunakan AI untuk memberikan feedback dan skor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyzeRequest'
 *           examples:
 *             example1:
 *               summary: Contoh analisis jawaban pengguna
 *               value:
 *                 userData:
 *                   userId: "user-123"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                 answers:
 *                   - questionId: "q-001"
 *                     answer: "Jakarta"
 *                   - questionId: "q-002"
 *                     answer: "4"
 *                   - questionId: "q-003"
 *                     answer: "Hyper Text Markup Language"
 *     responses:
 *       200:
 *         description: Analisis berhasil dilakukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyzeResponse'
 *             examples:
 *               success:
 *                 summary: Contoh response sukses
 *                 value:
 *                   success: true
 *                   data:
 *                     score: 85.5
 *                     totalQuestions: 10
 *                     correctAnswers: 8
 *                     analysis: "Anda memiliki pemahaman yang baik tentang topik ini. Fokuskan pembelajaran pada area yang masih lemah untuk meningkatkan skor."
 *       400:
 *         description: Request tidak valid atau data tidak lengkap
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingData:
 *                 summary: Data tidak lengkap
 *                 value:
 *                   success: false
 *                   error: "Data pengguna dan jawaban wajib diisi"
 *               invalidFormat:
 *                 summary: Format data salah
 *                 value:
 *                   success: false
 *                   error: "Format jawaban tidak valid"
 *       500:
 *         description: Internal server error atau error saat analisis AI
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userData, answers } = body;

    // Validasi input
    if (!userData || !answers) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data pengguna dan jawaban wajib diisi',
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Jawaban harus berupa array dan tidak boleh kosong',
        },
        { status: 400 }
      );
    }

    // Validasi struktur userData
    if (!userData.userId || !userData.name || !userData.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data pengguna tidak lengkap (userId, name, email wajib diisi)',
        },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Format email tidak valid',
        },
        { status: 400 }
      );
    }

    // Data dummy untuk validasi jawaban (dalam implementasi nyata, ambil dari database)
    const correctAnswers: Record<string, string> = {
      'q-001': 'Jakarta',
      'q-002': '4',
      'q-003': 'Hyper Text Markup Language',
      'q-004': 'Thomas Edison',
      'q-005': 'O(log n)',
    };

    // Hitung skor
    let correctCount = 0;
    const totalQuestions = answers.length;

    answers.forEach((ans: { questionId: string; answer: string }) => {
      if (correctAnswers[ans.questionId] === ans.answer) {
        correctCount++;
      }
    });

    const score = (correctCount / totalQuestions) * 100;

    // Simulasi analisis AI (dalam implementasi nyata, panggil API Gemini/OpenAI)
    let analysis = '';
    if (score >= 80) {
      analysis =
        'Luar biasa! Anda memiliki pemahaman yang sangat baik tentang materi ini. Pertahankan konsistensi belajar Anda.';
    } else if (score >= 60) {
      analysis =
        'Bagus! Anda sudah memahami sebagian besar materi. Fokuskan pembelajaran pada area yang masih lemah untuk meningkatkan skor.';
    } else if (score >= 40) {
      analysis =
        'Perlu peningkatan. Luangkan waktu lebih banyak untuk mempelajari materi dan berlatih soal-soal serupa.';
    } else {
      analysis =
        'Anda perlu belajar lebih giat. Mulailah dari konsep dasar dan tingkatkan pemahaman secara bertahap.';
    }

    // Log untuk keperluan tracking (dalam implementasi nyata, simpan ke database)
    console.log(`[ANALYZE] User ${userData.userId} - Score: ${score}%`);

    return NextResponse.json({
      success: true,
      data: {
        score: parseFloat(score.toFixed(2)),
        totalQuestions,
        correctAnswers: correctCount,
        analysis,
        timestamp: new Date().toISOString(),
        userId: userData.userId,
      },
    });
  } catch (error) {
    console.error('Error analyzing answers:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan saat menganalisis jawaban',
      },
      { status: 500 }
    );
  }
}

