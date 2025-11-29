"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Button, Text, Alert } from "@chakra-ui/react";
import { ProgressBar, QuestionCard, LoadingOverlay } from "@/components/test";
import { saveTestResult, saveTestResultToHistory } from "@/lib/localStorage";
import { isUserAuthenticated, getCurrentUser } from "@/lib/userAuth";
import type { Question } from "@/lib/questions";
import type { TestResult, AnalysisResponse } from "@/types";

// Helper function untuk menentukan section berdasarkan nomor soal
const getSection = (questionNumber: number): string => {
  if (questionNumber <= 10) return "BAGIAN 1";
  if (questionNumber <= 20) return "BAGIAN 2";
  return "BAGIAN 3";
};

export default function TestPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user has filled the form
  useEffect(() => {
    const authenticated = isUserAuthenticated();
    setIsAuthenticated(authenticated);
    
    if (!authenticated) {
      // Immediately redirect without showing the page
      router.replace("/?error=auth_required");
      return;
    }
  }, [router]);

  useEffect(() => {
    // Only load questions if authenticated
    if (isAuthenticated === false) {
      return;
    }

    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/questions");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        const questions = await response.json();
        setQuestionsData(questions);
      } catch (err) {
        setError("Gagal memuat pertanyaan. Silakan refresh halaman.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated === true) {
      loadQuestions();
    }
  }, [isAuthenticated]);

  // Don't render anything if not authenticated (redirecting)
  if (isAuthenticated === false) {
    return null;
  }

  // Jika belum ada data, tampilkan loading atau error
  if (isLoading || isAuthenticated === null) {
    return <LoadingOverlay message="Memuat pertanyaan..." />;
  }

  if (error || questionsData.length === 0) {
    return (
      <Box
        minH="100vh"
        bg="gray.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center" p={8}>
          <Text fontSize="xl" color="red.500" mb={4}>
            {error || "Tidak ada pertanyaan tersedia"}
          </Text>
          <Button colorPalette="blue" onClick={() => window.location.reload()}>
            Refresh Halaman
          </Button>
        </Box>
      </Box>
    );
  }

  const currentQuestion = questionsData[currentQuestionIndex];
  const totalQuestions = questionsData.length;

  const handleSelectChoice = (label: string) => {
    // Simpan jawaban
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: label,
    };
    setAnswers(newAnswers);

    // Auto pindah ke pertanyaan berikutnya setelah 300ms
    setTimeout(() => {
      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
  };

  const handleFinish = async () => {
    setIsLoading(true);
    setError(null);

    const formattedAnswers = Object.entries(answers).map(([key, value]) => ({
      questionId: parseInt(key, 10),
      value: value,
    }));

    // Get user data from localStorage (saved by PreTestForm)
    const userData = getCurrentUser() || {
      nama: "Tester",
      email: undefined as string | undefined,
    };

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: formattedAnswers,
          userData: userData,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Gagal menganalisis jawaban.");
      }

      const result: AnalysisResponse = await response.json();

      // Create TestResult object with all required fields
      const testResult: TestResult = {
        weatherType: result.result,
        analysis: result.analysis,
        userData: userData,
        timestamp: new Date().toISOString(),
      };

      // Save result to localStorage (current result)
      saveTestResult(testResult);
      
      // Also save to history
      saveTestResultToHistory(testResult);

      // Navigate to result page
      router.push("/result");
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan saat memproses hasil tes.";
      setError(errorMessage);
      console.error("Error analyzing test:", err);
    }
  };

  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <>
      {isLoading && <LoadingOverlay message="Memproses..." />}

      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="5xl">
          {/* Error Alert */}
          {error && (
            <Alert.Root status="error" mb={6}>
              <Alert.Indicator />
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Root>
          )}

          {/* Progress Bar */}
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          {/* Question Card */}
          <Box display="flex" justifyContent="center" mb={8}>
            <QuestionCard
              section={getSection(currentQuestionIndex + 1)}
              question={currentQuestion.text}
              choices={currentQuestion.options}
              selectedChoice={answers[currentQuestion.id]}
              onSelectChoice={handleSelectChoice}
            />
          </Box>

          {/* Button Selesai - hanya muncul di pertanyaan terakhir dan sudah dijawab */}
          {isLastQuestion && isAnswered && (
            <Box display="flex" justifyContent="center" maxW="4xl" mx="auto">
              <Button
                colorPalette="blue"
                size="lg"
                onClick={handleFinish}
                fontWeight="medium"
                px={12}
              >
                Selesai
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
