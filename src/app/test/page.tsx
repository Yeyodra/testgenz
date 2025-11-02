"use client";

import { useState, useEffect } from "react";
import { Box, Container, Button, Text } from "@chakra-ui/react";
import {
  ProgressBar,
  QuestionCard,
  LoadingOverlay,
} from "@/components/test";
import { fetchQuestions, Question } from "@/lib/api/questions";

// Helper function untuk menentukan section berdasarkan nomor soal
const getSection = (questionNumber: number): string => {
  if (questionNumber <= 10) return "BAGIAN 1";
  if (questionNumber <= 20) return "BAGIAN 2";
  return "BAGIAN 3";
};

export default function TestPage() {
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions dari API saat component mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const questions = await fetchQuestions({ limit: 25 });
        setQuestionsData(questions);
      } catch (err) {
        setError("Gagal memuat pertanyaan. Silakan refresh halaman.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Jika belum ada data, tampilkan loading atau error
  if (isLoading) {
    return <LoadingOverlay message="Memuat pertanyaan..." />;
  }

  if (error || questionsData.length === 0) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
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
    // Simulasi submit - nanti bisa diganti dengan API call ke /api/analyze
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Test selesai! Jawaban: " + JSON.stringify(answers));
      // TODO: Implement API call ke /api/analyze
    }, 2000);
  };

  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <>
      {isLoading && <LoadingOverlay message="Memproses..." />}
      
      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="5xl">
          {/* Progress Bar */}
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          {/* Question Card */}
          <Box display="flex" justifyContent="center" mb={8}>
            <QuestionCard
              section={getSection(currentQuestionIndex + 1)}
              question={currentQuestion.question}
              choices={currentQuestion.choices}
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

