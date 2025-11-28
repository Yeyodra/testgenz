"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Card,
  Stack,
  Badge,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { getTestResultHistory, deleteTestResultFromHistory } from "@/lib/localStorage";
import type { TestResult } from "@/types";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load history from localStorage
    const loadHistory = () => {
      try {
        const results = getTestResultHistory();
        setHistory(results);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleDelete = (timestamp: string) => {
    deleteTestResultFromHistory(timestamp);
    setHistory(history.filter((result) => result.timestamp !== timestamp));
  };

  const handleViewResult = (result: TestResult) => {
    // Save this result as current and navigate to result page
    localStorage.setItem("testgenz_result", JSON.stringify(result));
    router.push("/result");
  };

  const getWeatherColor = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
      case "sunny":
        return "yellow";
      case "rainy":
        return "blue";
      case "stormy":
        return "purple";
      case "cloudy":
        return "gray";
      default:
        return "gray";
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="xl">Memuat history...</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="4xl">
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h1" size="2xl">
            Riwayat Tes
          </Heading>
          <Button colorPalette="blue" onClick={() => router.push("/")}>
            Kembali ke Home
          </Button>
        </Flex>

        {/* History List */}
        {history.length === 0 ? (
          <Card.Root>
            <Card.Body>
              <Stack gap={4} align="center" py={8}>
                <Text fontSize="xl" color="gray.500">
                  Belum ada riwayat tes
                </Text>
                <Button colorPalette="teal" onClick={() => router.push("/")}>
                  Mulai Tes Pertama
                </Button>
              </Stack>
            </Card.Body>
          </Card.Root>
        ) : (
          <Stack gap={4}>
            {history.map((result, index) => (
              <Card.Root key={result.timestamp} variant="outline">
                <Card.Body>
                  <Flex justify="space-between" align="start" gap={4}>
                    <Box flex="1">
                      <Flex align="center" gap={3} mb={2}>
                        <Badge colorPalette={getWeatherColor(result.weatherType)} size="lg">
                          {result.weatherType}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          {formatDate(result.timestamp)}
                        </Text>
                      </Flex>

                      <Text fontWeight="bold" mb={2}>
                        {result.userData.nama}
                      </Text>

                      <Text fontSize="sm" color="gray.600" lineClamp={2}>
                        {result.analysis}
                      </Text>
                    </Box>

                    <Flex gap={2}>
                      <Button
                        size="sm"
                        colorPalette="blue"
                        onClick={() => handleViewResult(result)}
                      >
                        Lihat Detail
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorPalette="red"
                        onClick={() => handleDelete(result.timestamp)}
                      >
                        Hapus
                      </Button>
                    </Flex>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))}
          </Stack>
        )}

        {/* Footer Info */}
        {history.length > 0 && (
          <Text fontSize="sm" color="gray.500" textAlign="center" mt={8}>
            Menampilkan {history.length} hasil tes terakhir (maksimal 10)
          </Text>
        )}
      </Container>
    </Box>
  );
}
