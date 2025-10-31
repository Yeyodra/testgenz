# Komponen Form Pertanyaan

Kumpulan komponen untuk membuat form pertanyaan/test dengan Chakra UI v3.

## 📦 Komponen yang Tersedia

### 1. ProgressBar
Progress bar yang menampilkan kemajuan pertanyaan.

**Props:**
- `currentQuestion: number` - Nomor pertanyaan saat ini
- `totalQuestions: number` - Total jumlah pertanyaan

**Contoh:**
```tsx
<ProgressBar currentQuestion={1} totalQuestions={25} />
```

### 2. QuestionCard
Card utama yang menampilkan pertanyaan dan pilihan jawaban.

**Props:**
- `section: string` - Nama bagian/section (misal: "BAGIAN 1")
- `question: string` - Teks pertanyaan
- `choices: Choice[]` - Array pilihan jawaban
- `selectedChoice?: string` - Label pilihan yang dipilih
- `onSelectChoice: (label: string) => void` - Callback ketika pilihan dipilih

**Contoh:**
```tsx
<QuestionCard
  section="BAGIAN 1"
  question="Dosen ngasih tugas. Kamu tim yang mana?"
  choices={[
    { label: "A", text: "Langsung bikin to-do-list..." },
    { label: "B", text: "Cari inspirasi dulu..." },
  ]}
  selectedChoice="A"
  onSelectChoice={(label) => console.log(label)}
/>
```

### 3. ChoiceButton
Button untuk setiap pilihan jawaban.

**Props:**
- `label: string` - Label pilihan (A, B, C, D)
- `text: string` - Teks pilihan jawaban
- `isSelected?: boolean` - Apakah pilihan ini dipilih
- `onClick: () => void` - Callback ketika diklik

### 4. BackButton
Button untuk kembali ke pertanyaan sebelumnya.

**Props:**
- `onClick: () => void` - Callback ketika diklik
- `disabled?: boolean` - Apakah button disabled

**Contoh:**
```tsx
<BackButton onClick={handleBack} disabled={currentQuestion === 0} />
```

### 5. LoadingOverlay
Overlay loading dengan spinner.

**Props:**
- `message?: string` - Pesan loading (default: "Memuat...")

**Contoh:**
```tsx
{isLoading && <LoadingOverlay message="Menyimpan jawaban..." />}
```

### 6. QuestionNavigator
Navigator untuk menampilkan semua nomor soal dan navigasi cepat antar soal.

**Props:**
- `totalQuestions: number` - Total jumlah pertanyaan
- `currentQuestion: number` - Nomor pertanyaan saat ini (1-based)
- `answeredQuestions: number[]` - Array index pertanyaan yang sudah dijawab
- `onSelectQuestion: (questionIndex: number) => void` - Callback ketika nomor soal diklik

**Contoh:**
```tsx
<QuestionNavigator
  totalQuestions={25}
  currentQuestion={5}
  answeredQuestions={[0, 1, 2, 3]}
  onSelectQuestion={(index) => setCurrentQuestion(index)}
/>
```

## 🎨 Design Features

- ✅ Progress bar dengan persentase
- ✅ Badge untuk section
- ✅ Card dengan border dan shadow yang subtle
- ✅ Pilihan jawaban dengan hover effect
- ✅ Auto navigation setelah pilih jawaban
- ✅ Question navigator di sidebar (grid 5 kolom)
- ✅ Visual indicator untuk soal yang sudah dijawab
- ✅ Sticky navigator (tetap di posisi saat scroll)
- ✅ Responsive design (navigator hidden di mobile)
- ✅ Visual feedback untuk pilihan yang dipilih
- ✅ Loading overlay dengan backdrop

## 🚀 Cara Menggunakan

Lihat contoh implementasi lengkap di `src/app/test/page.tsx`

## 🎯 Tech Stack

- **Chakra UI v3** - UI Component Library
- **Next.js 15** - React Framework
- **TypeScript** - Type Safety
- **Emotion** - CSS-in-JS (required by Chakra UI)

