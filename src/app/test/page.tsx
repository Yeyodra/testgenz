"use client";

import { useState } from "react";
import { Box, Container, Stack, Button } from "@chakra-ui/react";
import {
  ProgressBar,
  QuestionCard,
  BackButton,
  LoadingOverlay,
} from "@/components/test";

// Data dummy untuk demo
const questionsData = [
  {
    id: 1,
    section: "BAGIAN 1",
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
    section: "BAGIAN 1",
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
    setAnswers({
      ...answers,
      [currentQuestion.id]: label,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Simulasi submit
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert("Test selesai! Jawaban: " + JSON.stringify(answers));
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <>
      {isLoading && <LoadingOverlay message="Menyimpan jawaban..." />}
      
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
              section={currentQuestion.section}
              question={currentQuestion.question}
              choices={currentQuestion.choices}
              selectedChoice={answers[currentQuestion.id]}
              onSelectChoice={handleSelectChoice}
            />
          </Box>

          {/* Navigation Buttons */}
          <Stack direction="row" justify="space-between" maxW="4xl" mx="auto">
            <BackButton
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
            />
            <Button
              colorPalette="blue"
              size="md"
              onClick={handleNext}
              disabled={!isAnswered}
              fontWeight="medium"
              px={8}
            >
              {currentQuestionIndex === questionsData.length - 1
                ? "Selesai"
                : "Selanjutnya"}
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

