import { Box, Spinner, Text, Stack } from "@chakra-ui/react";

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay = ({
  message = "Memuat...",
}: LoadingOverlayProps) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <Box
        bg="white"
        borderRadius="xl"
        p={8}
        shadow="xl"
        textAlign="center"
      >
        <Stack gap={4} align="center">
          <Spinner
            borderWidth="4px"
            animationDuration="0.65s"
            color="blue.500"
            size="xl"
          />
          <Text fontSize="lg" fontWeight="medium" color="gray.700">
            {message}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

