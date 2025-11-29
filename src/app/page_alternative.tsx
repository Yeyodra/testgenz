"use client";

import { useSearchParams } from "next/navigation";
import {
  Container,
  Heading,
  VStack,
  Text,
  Alert,
} from "@chakra-ui/react";
import PreTestForm from "@/components/test/PreTestForm";

export default function Home() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const showAuthError = error === "auth_required";

  return (
    <Container
      bgGradient="linear(to-br, #1A202C, #2D3748, #4A5568)"
      color="white"
      centerContent
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      maxW="full"
    >
      <VStack gap={8} p={4} textAlign="center" width="full" maxW="600px">
        <div>
          <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
            Selamat Datang di TestGenz 🧠
          </Heading>
          <Text fontSize="xl" color="gray.300">
            Cari tahu tipe kepribadianmu melalui tes psikologi yang seru.
          </Text>
        </div>

        {/* Error Alert jika user coba akses test tanpa login */}
        {showAuthError && (
          <Alert.Root status="error" width="full">
            <Alert.Indicator />
            <Alert.Title>Akses Ditolak</Alert.Title>
            <Alert.Description>
              Silakan isi data diri terlebih dahulu untuk memulai tes
            </Alert.Description>
          </Alert.Root>
        )}

        {/* Form untuk input data user sebelum mulai tes */}
        <PreTestForm />
      </VStack>
    </Container>
  );
}
