# Dokumentasi Swagger API

## URL Akses

### Development
```
http://localhost:3000/api-docs
```

### Production
```
https://your-domain.com/api-docs
```

## Struktur File

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts      # POST - Analisis jawaban
│   │   ├── questions/route.ts    # GET - Daftar pertanyaan
│   │   └── docs/route.ts         # GET - Swagger JSON spec
│   └── api-docs/
│       ├── page.tsx              # Halaman Swagger UI
│       └── swagger-custom.css    # Material Design theme
└── lib/
    └── swagger.ts                # OpenAPI specification
```

## API Endpoints

### GET /api/questions
Mendapatkan daftar pertanyaan tes

**Query Parameters:**
- `category` (optional): Filter berdasarkan kategori
- `difficulty` (optional): easy | medium | hard

### POST /api/analyze
Menganalisis jawaban tes pengguna

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": "string",
      "answer": "string"
    }
  ]
}
```

## Teknologi

- swagger-ui-react: ^5.19.3
- swagger-jsdoc: ^6.2.8
- Material Design theme

## Fitur UI

- Clean & minimalist
- Semua sections selalu terbuka
- Tanpa search bar & topbar
- Material Design colors


---

**Version:** 1.0.0

