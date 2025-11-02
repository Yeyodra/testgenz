// Ini adalah halaman. Kita tidak perlu "use client" di sini
// jika halaman ini hanya menampilkan komponen lain.

import { Container } from "@chakra-ui/react";
// Import komponen form Anda
import PreTestForm from "../../components/test/PreTestForm";

export default function TestPage() {
  return (
    <Container
      // Gradasi warna langit malam/senja yang elegan
      bgGradient="linear(to-br, #1A202C, #2D3748, #4A5568)"
      minH="100vh" // Tinggi penuh
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white" // Teks utama jadi putih agar kontras
      maxW="full" // Ambil lebar penuh
    >
      {/* Panggil komponen form Anda di sini */}
      <PreTestForm />
    </Container>
  );
}