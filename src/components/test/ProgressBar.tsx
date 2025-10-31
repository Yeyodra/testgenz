import { Box, Progress, Text } from "@chakra-ui/react";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const ProgressBar = ({
  currentQuestion,
  totalQuestions,
}: ProgressBarProps) => {
  const percentage = (currentQuestion / totalQuestions) * 100;

  return (
    <Box width="100%" mb={8}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="sm" color="gray.600">
          Pertanyaan {currentQuestion} dari {totalQuestions}
        </Text>
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          {Math.round(percentage)}%
        </Text>
      </Box>
      <Progress.Root value={percentage} size="sm" colorPalette="blue">
        <Progress.Track bg="gray.200" borderRadius="full">
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Box>
  );
};

