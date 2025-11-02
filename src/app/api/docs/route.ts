import { NextResponse } from 'next/server';
import { getApiDocs } from '@/lib/swagger';

/**
 * API Route untuk menyediakan Swagger/OpenAPI Specification
 * Endpoint ini akan dipanggil oleh halaman /api-docs untuk mendapatkan spec
 */
export async function GET() {
  try {
    const spec = getApiDocs();
    return NextResponse.json(spec);
  } catch (error) {
    console.error('Error generating API docs:', error);
    return NextResponse.json(
      {
        error: 'Gagal menggenerate dokumentasi API',
      },
      { status: 500 }
    );
  }
}

