import { Box, Text, SimpleGrid } from "@chakra-ui/react";

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: number[];
  onSelectQuestion: (questionIndex: number) => void;
}

export const QuestionNavigator = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onSelectQuestion,
}: QuestionNavigatorProps) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={6}
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      position="sticky"
      top={8}
    >
      <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={4}>
        Navigasi Soal
      </Text>
      
      <SimpleGrid columns={5} gap={2} mb={4}>
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isAnswered = answeredQuestions.includes(index);
          const isCurrent = currentQuestion === index + 1;

          return (
            <Box
              key={questionNumber}
              as="button"
              onClick={() => onSelectQuestion(index)}
              width="100%"
              aspectRatio={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              fontSize="sm"
              fontWeight="medium"
              cursor="pointer"
              transition="all 0.2s"
              bg={
                isCurrent
                  ? "blue.500"
                  : isAnswered
                  ? "blue.100"
                  : "gray.100"
              }
              color={
                isCurrent
                  ? "white"
                  : isAnswered
                  ? "blue.700"
                  : "gray.600"
              }
              border="2px solid"
              borderColor={
                isCurrent
                  ? "blue.600"
                  : isAnswered
                  ? "blue.200"
                  : "gray.200"
              }
              _hover={{
                transform: "scale(1.05)",
                shadow: "sm",
              }}
              _active={{
                transform: "scale(0.95)",
              }}
            >
              {questionNumber}
            </Box>
          );
        })}
      </SimpleGrid>

      {/* Legend */}
      <Box fontSize="xs" color="gray.600" spaceY={2}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box
            width="20px"
            height="20px"
            bg="blue.500"
            borderRadius="sm"
            flexShrink={0}
          />
          <Text>Soal saat ini</Text>
        </Box>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box
            width="20px"
            height="20px"
            bg="blue.100"
            border="2px solid"
            borderColor="blue.200"
            borderRadius="sm"
            flexShrink={0}
          />
          <Text>Sudah dijawab</Text>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            width="20px"
            height="20px"
            bg="gray.100"
            border="2px solid"
            borderColor="gray.200"
            borderRadius="sm"
            flexShrink={0}
          />
          <Text>Belum dijawab</Text>
        </Box>
      </Box>
    </Box>
  );
};

