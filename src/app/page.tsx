"use client";

import {
  Container,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import Button from "../components/common/Button"; // Import tombol kustom Anda
import Link from "next/link"; 

export default function Home() {
  return (
    <Container
      // Kita samakan latarnya agar konsisten
      bgGradient="linear(to-br, #1A202C, #2D3748, #4A5568)"
      color="white"
      centerContent
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxW="full" // Ambil lebar penuh
    >
      <VStack spacing={6} p={4} textAlign="center">
        <Heading as="h1" size="2xl" fontWeight="bold">
          Selamat Datang di TestGenz 🧠
        </Heading>
        <Text fontSize="xl" color="gray.300">
          Cari tahu tipe kepribadianmu melalui tes psikologi yang seru.
        </Text>

        {/* --- INI ADALAH KONEKSINYA --- */}
        <Link href="/test">
          <Button> {/* Otomatis punya style 'teal', 'lg', dan 'shadow' */}
            Mulai Tes
          </Button>
        </Link>
        {/* ----------------------------- */}
        
      </VStack>
    </Container>
  );
}