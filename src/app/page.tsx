"use client";

import { Suspense, useEffect, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import PreTestForm from "@/components/test/PreTestForm";
import { toaster } from "@/components/ui/toaster";

function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "auth_required") {
      // Use queueMicrotask to avoid flushSync error during render
      queueMicrotask(() => {
        startTransition(() => {
          toaster.create({
            title: "Akses Ditolak",
            description: "Silakan isi data diri terlebih dahulu untuk memulai tes",
            type: "error",
            duration: 4000,
          });
        });
      });
    }
  }, [searchParams]);

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
      <VStack gap={8} p={4} textAlign="center">
        <div>
          <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
            Selamat Datang di TestGenz 🧠
          </Heading>
          <Text fontSize="xl" color="gray.300">
            Cari tahu tipe kepribadianmu melalui tes psikologi yang seru.
          </Text>
        </div>

        {/* Form untuk input data user sebelum mulai tes */}
        <PreTestForm />
      </VStack>
    </Container>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
