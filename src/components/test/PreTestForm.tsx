"use client"; // Komponen ini interaktif (useState, useToast)

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { AtSignIcon, EmailIcon } from "@chakra-ui/icons";

// Nama fungsi harus 'export default' agar bisa di-import
export default function PreTestForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Satu langkah lagi!",
        description: "Data diri diterima. Memuat tes kepribadian...",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      // Nanti di sini Anda bisa pindah halaman ke tes psikologinya
    }, 1500);
  };

  // Perhatikan kita hanya me-return <Box>, bukan <Container> satu layar penuh
  // Ini agar komponennya reusable
  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={8}
      // --- Efek "Glassmorphism" ---
      bg="whiteAlpha.100"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="whiteAlpha.200"
      // ----------------------------
      borderRadius="2xl"
      boxShadow="xl"
      width="full"
      maxWidth="450px"
    >
      <VStack spacing={6}>
        <Heading as="h1" size="lg" fontWeight="bold">
          Tes Tipe Cuaca
        </Heading>
        <Text fontSize="md" color="gray.300" textAlign="center">
          Kamu tipe yang cerah seperti matahari, atau tenang seperti hujan?
          <br />
          Mulai tes untuk cari tahu.
        </Text>

        {/* Input untuk Username */}
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={AtSignIcon} color="gray.400" />
            </InputLeftElement>
            <Input
              variant="filled"
              placeholder="username_unik_kamu"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              bg="whiteAlpha.300"
              _hover={{ bg: "whiteAlpha.400" }}
              _focus={{ bg: "whiteAlpha.400" }}
            />
          </InputGroup>
        </FormControl>

        {/* Input untuk Email */}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={EmailIcon} color="gray.400" />
            </InputLeftElement>
            <Input
              type="email"
              variant="filled"
              placeholder="email@kamu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              _placeholder={{ color: "gray.500" }}
              bg="whiteAlpha.300"
              _hover={{ bg: "whiteAlpha.400" }}
              _focus={{ bg: "whiteAlpha.400" }}
            />
          </InputGroup>
        </FormControl>

        {/* Tombol Submit */}
        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          width="full"
          isLoading={isLoading}
          loadingText="Menganalisa..."
        >
          Mulai Tes
        </Button>
      </VStack>
    </Box>
  );
}