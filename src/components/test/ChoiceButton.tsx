import { Box, Text } from "@chakra-ui/react";

interface ChoiceButtonProps {
  label: string;
  text: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const ChoiceButton = ({
  label,
  text,
  isSelected = false,
  onClick,
}: ChoiceButtonProps) => {
  return (
    <Box
      as="button"
      width="100%"
      display="flex"
      alignItems="flex-start"
      gap={3}
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor={isSelected ? "blue.400" : "gray.200"}
      bg={isSelected ? "blue.50" : "white"}
      textAlign="left"
      transition="all 0.2s"
      _hover={{
        borderColor: "blue.300",
        bg: "blue.50",
        transform: "translateY(-2px)",
        shadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      onClick={onClick}
      cursor="pointer"
    >
      <Text
        fontSize="md"
        fontWeight="semibold"
        color="blue.500"
        flexShrink={0}
      >
        {label}.
      </Text>
      <Text fontSize="md" color="gray.800" lineHeight="tall">
        {text}
      </Text>
    </Box>
  );
};

