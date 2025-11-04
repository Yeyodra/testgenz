export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Lagi di pesta, kamu paling sering...",
    options: [
      { id: "A", text: "Jadi pusat perhatian, ngobrol seru sama orang baru." },
      { id: "B", text: "Langsung ambil alih obrolan, fokus ke topik penting." },
      { id: "C", text: "Ngobrol mendalam sama 1-2 orang, atau mengamati aja." },
      { id: "D", text: "Santai aja, ngikutin alur dan bikin semua nyaman." },
    ],
  },
  {
    id: 2,
    text: "Ada masalah mendesak. Reaksi pertamamu?",
    options: [
      { id: "A", text: "Cari solusi praktis, langsung kerjain." },
      { id: "B", text: "Mikirin semua detail dan risiko terburuknya dulu." },
      { id: "C", text: "Tetap tenang, nggak mau buru-buru panik." },
      { id: "D", text: "Cari cara kreatif atau becandain biar nggak tegang." },
    ],
  },
  {
    id: 3,
    text: "Apa yang paling bikin kamu 'low-batt'?",
    options: [
      { id: "A", text: "Kelamaan sendirian, nggak ada teman ngobrol." },
      { id: "B", text: "Ngikutin aturan ribet atau kerja sama orang lelet." },
      { id: "C", text: "Berada di tempat yang kacau atau dikritik." },
      { id: "D", text: "Dipaksa ambil keputusan cepat atau terlibat konflik." },
    ],
  },
  {
    id: 4,
    text: "Gaya kerjamu paling pas digambarin kayak...",
    options: [
      { id: "A", text: "Perfeksionis. Semua detail harus pas dan rapi." },
      {
        id: "B",
        text: "Fokus ke hasil. Gimana caranya target harus tercapai.",
      },
      { id: "C", text: "Suka multitasking, gampang pindah-pindah ide seru." },
      {
        id: "D",
        text: "Stabil dan pelan-pelan. Satu-satu aja yang penting beres.",
      },
    ],
  },
  {
    id: 5,
    text: "Akhir pekan ideal versimu itu...",
    options: [
      {
        id: "A",
        text: "Waktu 'me time' yang berkualitas (baca buku, hobi mendalam).",
      },
      {
        id: "B",
        text: "Hangout bareng teman, nyoba tempat baru yang lagi hits.",
      },
      { id: "C", text: "Santai di rumah tanpa agenda. Nonton, tidur siang." },
      {
        id: "D",
        text: "Tetap produktif. Olahraga, beres-beres, atau ngerjain project.",
      },
    ],
  },
  {
    id: 6,
    text: "Waktu ambil keputusan besar, kamu lebih percaya:",
    options: [
      { id: "A", text: "Logika, data, dan analisis pro-kontra." },
      { id: "B", text: "Perasaan/intuisi. Apa yang 'terasa' pas aja." },
      { id: "C", text: "Tujuan akhir. Mana yang paling cepat bawa hasil." },
      {
        id: "D",
        text: "Pendapat orang lain atau yang paling 'aman' buat semua.",
      },
    ],
  },
  {
    id: 7,
    text: "Gaya ngomongmu itu...",
    options: [
      { id: "A", text: "Ekspresif, banyak cerita, dan sering nyeletuk lucu." },
      { id: "B", text: "Hati-hati, mendalam, dan cenderung serius." },
      { id: "C", text: "Tenang, pendengar yang baik, dan diplomatis." },
      { id: "D", text: "Tegas, to the point, dan ngajak bertindak." },
    ],
  },
  {
    id: 8,
    text: "Kalau ada konflik, kamu bakal...",
    options: [
      { id: "A", text: "Menghindar. Nggak suka ribut, yang penting damai." },
      { id: "B", text: "Langsung hadapi. Debat ya debat aja." },
      { id: "C", text: "Mencairkan suasana, jadi penengah, atau dibecandain." },
      {
        id: "D",
        text: "Menganalisis masalahnya (dan mungkin jadi kepikiran terus).",
      },
    ],
  },
  {
    id: 9,
    text: "Situasi paling bikin stres buat kamu:",
    options: [
      { id: "A", text: "Bosen, rutinitas monoton, atau nggak ada kegiatan." },
      {
        id: "B",
        text: "Melakukan kesalahan atau hasil kerjanya nggak sempurna.",
      },
      { id: "C", text: "Kehilangan kendali atau merasa 'kalah'." },
      { id: "D", text: "Dikasih deadline ketat atau dipaksa berdebat." },
    ],
  },
  {
    id: 10,
    text: "Apa yang bikin kamu paling semangat?",
    options: [
      { id: "A", text: "Dapat pujian, pengakuan, dan jadi pusat perhatian." },
      { id: "B", text: "Menang tantangan, kompetisi, dan lihat hasil nyata." },
      { id: "C", text: "Suasana yang stabil, nyaman, dan damai." },
      {
        id: "D",
        text: "Ngerjain sesuatu yang 'bermakna' dan berkualitas tinggi.",
      },
    ],
  },
  {
    id: 11,
    text: "Di kerja kelompok, kamu seringnya jadi...",
    options: [
      { id: "A", text: '"Si Pemimpin". Yang ngatur dan ambil keputusan.' },
      {
        id: "B",
        text: '"Si Pencair Suasana". Yang kasih ide gila dan bikin semangat.',
      },
      {
        id: "C",
        text: '"Si Peneliti". Yang ngecek ulang detail biar nggak ada salah.',
      },
      {
        id: "D",
        text: '"Si Stabilisator". Yang ngerjain tugas, dengerin, dan cari jalan tengah.',
      },
    ],
  },
  {
    id: 12,
    text: "Menurutmu, aturan itu...",
    options: [
      { id: "A", text: "Penting banget buat jaga kualitas dan keteraturan." },
      { id: "B", text: "Penting buat jaga damai, tapi ya fleksibel aja lah." },
      {
        id: "C",
        text: "Cuma panduan. Kalau ada cara lebih cepat, tabrak aja.",
      },
      { id: "D", text: "Mengekang. Mending spontan dan bebas." },
    ],
  },
  {
    id: 13,
    text: "Orang lain ngelihat kamu sebagai orang yang...",
    options: [
      {
        id: "A",
        text: "Ceria, hangat, dan gampang banget nunjukkin perasaan.",
      },
      { id: "B", text: "Intens, punya kemauan kuat, tapi gampang kesulut." },
      { id: "C", text: "Tenang, sabar, dan perasaannya susah ditebak." },
      { id: "D", text: "Sensitif, pendiam, dan perasaannya mendalam." },
    ],
  },
  {
    id: 14,
    text: "Kalau ngerencanain liburan, kamu bakal...",
    options: [
      {
        id: "A",
        text: "Bikin itinerary super detail (pake spreadsheet!) dari jauh-jauh hari.",
      },
      { id: "B", text: "Tentuin tujuan utamanya aja, sisanya lihat nanti." },
      { id: "C", text: "Pesan tiket dadakan. 'Lets go' aja dulu!" },
      {
        id: "D",
        text: "Pilih tempat yang santai dan nggak perlu banyak mikir.",
      },
    ],
  },
  {
    id: 15,
    text: "Hal paling penting dalam hidup buatmu adalah:",
    options: [
      { id: "A", text: "Kesenangan, pengalaman baru, dan kebebasan." },
      { id: "B", text: "Kontrol, pencapaian, dan hasil yang efisien." },
      { id: "C", text: "Makna, kualitas, dan pemahaman yang mendalam." },
      { id: "D", text: "Kedamaian, harmoni, dan kenyamanan." },
    ],
  },
];

export default questions;
