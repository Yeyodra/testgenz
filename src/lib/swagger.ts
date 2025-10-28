import { createSwaggerSpec } from 'next-swagger-doc';

/**
 * Konfigurasi Swagger Spec Generator
 * File ini menghasilkan spesifikasi OpenAPI untuk dokumentasi API
 */
export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TestGenz Clone API Documentation',
        version: '1.0.0',
        description: 'Dokumentasi API untuk aplikasi TestGenz Clone - Platform tes online interaktif',
        contact: {
          name: 'Tim TestGenz Clone',
          url: 'https://github.com/Fyrnn-69/testgenz-clone',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development Server',
        },
        {
          url: 'https://testgenz-clone.vercel.app',
          description: 'Production Server',
        },
      ],
      tags: [],
      components: {
        schemas: {
          Question: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID unik pertanyaan',
                example: 'q-001',
              },
              text: {
                type: 'string',
                description: 'Teks pertanyaan',
                example: 'Apa ibu kota Indonesia?',
              },
              options: {
                type: 'array',
                description: 'Pilihan jawaban',
                items: {
                  type: 'string',
                },
                example: ['Jakarta', 'Bandung', 'Surabaya', 'Medan'],
              },
              correctAnswer: {
                type: 'string',
                description: 'Jawaban yang benar',
                example: 'Jakarta',
              },
            },
          },
          UserData: {
            type: 'object',
            properties: {
              userId: {
                type: 'string',
                description: 'ID pengguna',
                example: 'user-123',
              },
              name: {
                type: 'string',
                description: 'Nama pengguna',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Email pengguna',
                example: 'john.doe@example.com',
              },
            },
          },
          Answer: {
            type: 'object',
            properties: {
              questionId: {
                type: 'string',
                description: 'ID pertanyaan',
                example: 'q-001',
              },
              answer: {
                type: 'string',
                description: 'Jawaban pengguna',
                example: 'Jakarta',
              },
            },
          },
          AnalyzeRequest: {
            type: 'object',
            required: ['userData', 'answers'],
            properties: {
              userData: {
                $ref: '#/components/schemas/UserData',
              },
              answers: {
                type: 'array',
                description: 'Daftar jawaban pengguna',
                items: {
                  $ref: '#/components/schemas/Answer',
                },
              },
            },
          },
          AnalyzeResponse: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                description: 'Status keberhasilan analisis',
                example: true,
              },
              data: {
                type: 'object',
                properties: {
                  score: {
                    type: 'number',
                    description: 'Skor total pengguna',
                    example: 85.5,
                  },
                  totalQuestions: {
                    type: 'number',
                    description: 'Jumlah total pertanyaan',
                    example: 10,
                  },
                  correctAnswers: {
                    type: 'number',
                    description: 'Jumlah jawaban benar',
                    example: 8,
                  },
                  analysis: {
                    type: 'string',
                    description: 'Analisis hasil dari AI',
                    example: 'Anda memiliki pemahaman yang baik tentang topik ini.',
                  },
                },
              },
            },
          },
          ErrorResponse: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: false,
              },
              error: {
                type: 'string',
                description: 'Pesan error',
                example: 'Terjadi kesalahan pada server',
              },
            },
          },
        },
      },
    },
  });

  return spec;
};

