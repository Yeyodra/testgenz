"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  Stack,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { saveUserData, getCurrentUser } from "@/lib/userAuth";
import { updateHistoryUserName } from "@/lib/localStorage";

export default function PreTestForm() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing user data from localStorage on mount
  useEffect(() => {
    try {
      const savedUserData = localStorage.getItem("testgenz_user");
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        if (userData.nama) {
          setNama(userData.nama);
        }
        if (userData.email) {
          setEmail(userData.email);
        }
      }
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate nama
    if (!nama || nama.trim() === "") {
      toaster.create({
        title: "Nama wajib diisi",
        description: "Silakan masukkan nama Anda untuk melanjutkan",
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    // Simpan data user ke localStorage untuk digunakan saat submit tes
    const userData = {
      nama: nama.trim(),
      email: email && email.trim() !== "" ? email.trim() : undefined,
    };
    
    try {
      // Check if name has changed
      const currentUser = getCurrentUser();
      const nameChanged = currentUser && currentUser.nama !== userData.nama;
      
      // Save new user data
      saveUserData(userData);
      
      // If name changed, update all history entries with new name
      if (nameChanged) {
        updateHistoryUserName(userData.nama);
      }
      
      setTimeout(() => {
        setIsLoading(false);
        toaster.create({
          title: "Satu langkah lagi!",
          description: "Data diri diterima. Memuat tes kepribadian...",
          type: "success",
          duration: 3000,
        });
        
        // Navigate ke halaman tes
        router.push("/test");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      toaster.create({
        title: "Gagal menyimpan data",
        description: "Terjadi kesalahan. Silakan coba lagi",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={8}
      bg="whiteAlpha.100"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      boxShadow="xl"
      width="full"
      maxWidth="450px"
    >
      <VStack gap={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          Tes Tipe Cuaca
        </Heading>
        <Text fontSize="md" color="gray.300" textAlign="center">
          Kamu tipe yang cerah seperti matahari, atau tenang seperti hujan?
          <br />
          Mulai tes untuk cari tahu.
        </Text>

        {/* Input untuk Nama */}
        <Field.Root required width="full">
          <Field.Label color="white">Nama</Field.Label>
          <Input
            variant="subtle"
            placeholder="Nama kamu"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            bg="whiteAlpha.300"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
        </Field.Root>

        {/* Input untuk Email (Optional) */}
        <Field.Root width="full">
          <Field.Label color="white">Email (Opsional)</Field.Label>
          <Input
            type="email"
            variant="subtle"
            placeholder="email@kamu.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="whiteAlpha.300"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
        </Field.Root>

        {/* Tombol Submit */}
        <Button
          type="submit"
          colorPalette="teal"
          size="lg"
          width="full"
          loading={isLoading}
          loadingText="Menganalisa..."
        >
          Mulai Tes
        </Button>
      </VStack>
    </Box>
  );
}
