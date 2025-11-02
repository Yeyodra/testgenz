# Data Directory

Folder ini berisi data statis yang digunakan oleh aplikasi.

## 📄 questions.json

File ini berisi daftar pertanyaan untuk personality test.

### Format Data:

```json
{
  "id": number,           // ID unik pertanyaan (1-25)
  "text": string,         // Teks pertanyaan
  "options": string[],    // Array pilihan jawaban (biasanya 2-4 pilihan)
  "category": string,     // Kategori pertanyaan (e.g., "personality")
  "difficulty": string    // Tingkat kesulitan: "easy" | "medium" | "hard"
}
```

### Contoh:

```json
{
  "id": 1,
  "text": "When faced with a difficult problem, you are more likely to:",
  "options": [
    "Analyze it logically and systematically.",
    "Go with your gut feeling and intuition."
  ],
  "category": "personality",
  "difficulty": "easy"
}
```

## 🔄 Cara Menggunakan:

1. **Edit pertanyaan**: Langsung edit file `questions.json`
2. **Tambah pertanyaan**: Tambahkan object baru dengan ID yang unik
3. **Hapus pertanyaan**: Hapus object yang tidak diperlukan

## ⚠️ Catatan:

- Pastikan setiap pertanyaan memiliki **ID unik**
- Format JSON harus **valid** (gunakan JSON validator jika perlu)
- Setiap pertanyaan minimal memiliki **2 pilihan jawaban**
- Untuk personality test MBTI, biasanya menggunakan **2 pilihan** per pertanyaan

## 🔗 Digunakan oleh:

- `/api/questions` - API endpoint untuk fetch pertanyaan
- `src/lib/api/questions.ts` - Service layer untuk transform data

