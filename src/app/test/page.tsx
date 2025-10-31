"use client";

import { useState } from "react";
import { Box, Container, Button, Grid, GridItem } from "@chakra-ui/react";
import {
  ProgressBar,
  QuestionCard,
  LoadingOverlay,
  QuestionNavigator,
} from "@/components/test";

// Helper function untuk menentukan section berdasarkan nomor soal
const getSection = (questionNumber: number): string => {
  if (questionNumber <= 10) return "BAGIAN 1";
  if (questionNumber <= 20) return "BAGIAN 2";
  return "BAGIAN 3";
};

// Data dummy untuk demo
const questionsData = [
  {
    id: 1,
    question: "Dosen ngasih tugas. Kamu tim yang mana?",
    choices: [
      {
        label: "A",
        text: "Langsung bikin to-do-list dan deadline pribadi biar on track.",
      },
      {
        label: "B",
        text: "Cari inspirasi dulu di Pinterest atau YouTube, biar hasilnya estetik.",
      },
      {
        label: "C",
        text: '"Guys, kita ngerjainnya gimana nih?" alias langsung ajak diskusi.',
      },
      {
        label: "D",
        text: "Baca instruksi, pahami intinya, terus langsung hajar kerjain.",
      },
    ],
  },
  {
    id: 2,
    question: "Ketika bekerja dalam tim, kamu cenderung...",
    choices: [
      { label: "A", text: "Menjadi pemimpin dan mengorganisir semua anggota." },
      { label: "B", text: "Memberikan ide-ide kreatif dan inovatif." },
      { label: "C", text: "Menjadi pendengar yang baik dan mediator." },
      { label: "D", text: "Fokus pada detail dan memastikan semuanya sempurna." },
    ],
  },
  // Tambahkan pertanyaan lain sampai 25 jika perlu
];

export default function TestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSelectQuestion = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const handleFinish = () => {
    // Simulasi submit
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Test selesai! Jawaban: " + JSON.stringify(answers));
    }, 2000);
  };

  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const answeredQuestions = Object.keys(answers).map(
    (id) => questionsData.findIndex((q) => q.id === parseInt(id))
  );

  return (
    <>
      {isLoading && <LoadingOverlay message="Menyimpan jawaban..." />}
      
      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="7xl">
          {/* Progress Bar */}
          <ProgressBar
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          {/* Grid Layout: Question Card + Navigator */}
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 300px" }}
            gap={6}
            alignItems="start"
          >
            {/* Left Column: Question Card */}
            <GridItem>
              <Box mb={8}>
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
                <Box display="flex" justifyContent="center">
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
            </GridItem>

            {/* Right Column: Question Navigator */}
            <GridItem display={{ base: "none", lg: "block" }}>
              <QuestionNavigator
                totalQuestions={totalQuestions}
                currentQuestion={currentQuestionIndex + 1}
                answeredQuestions={answeredQuestions}
                onSelectQuestion={handleSelectQuestion}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

