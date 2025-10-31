import { Box, Text, Stack, Badge } from "@chakra-ui/react";
import { ChoiceButton } from "./ChoiceButton";

interface Choice {
  label: string;
  text: string;
}

interface QuestionCardProps {
  section: string;
  question: string;
  choices: Choice[];
  selectedChoice?: string;
  onSelectChoice: (label: string) => void;
}

export const QuestionCard = ({
  section,
  question,
  choices,
  selectedChoice,
  onSelectChoice,
}: QuestionCardProps) => {
  return (
    <Box
      width="100%"
      maxW="4xl"
      bg="white"
      borderRadius="2xl"
      p={8}
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
    >
      <Stack align="stretch" gap={6}>
        {/* Badge Section */}
        <Badge
          colorPalette="blue"
          fontSize="xs"
          fontWeight="semibold"
          textTransform="uppercase"
          px={3}
          py={1}
          borderRadius="md"
          width="fit-content"
          letterSpacing="wide"
        >
          {section}
        </Badge>

        {/* Question */}
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="gray.900"
          lineHeight="shorter"
        >
          {question}
        </Text>

        {/* Choices */}
        <Stack gap={3} mt={4}>
          {choices.map((choice) => (
            <ChoiceButton
              key={choice.label}
              label={choice.label}
              text={choice.text}
              isSelected={selectedChoice === choice.label}
              onClick={() => onSelectChoice(choice.label)}
            />
          ))}
        </Stack>

        {/* Helper Text */}
        <Text
          fontSize="sm"
          color="gray.500"
          textAlign="center"
          mt={4}
        >
          Pilih jawaban yang paling kamu banget!
        </Text>
      </Stack>
    </Box>
  );
};

