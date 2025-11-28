"use client";

import { Box, Container } from "@chakra-ui/react";
import { ResultContent } from "./ResultContent";
import { ActionButtons } from "./ActionButtons";
import { UserData } from "@/types";

interface RainyResultProps {
  weatherType: string;
  analysis: string;
  userData: UserData;
  timestamp: string;
}

export const RainyResult = ({
  weatherType,
  analysis,
  userData,
}: RainyResultProps) => {
  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleRetakeTest = () => {
    window.location.href = "/test";
  };

  const handleViewHistory = () => {
    window.location.href = "/history";
  };

  return (
    <Box position="relative" minHeight="100vh" width="100%">
      {/* Background Placeholder */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="to-br"
        gradientFrom="blue.100"
        gradientTo="gray.300"
        zIndex={-1}
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="blue.600"
          fontSize="xl"
          fontWeight="medium"
          opacity={0.3}
        >
          Background image coming soon
        </Box>
      </Box>

      {/* Content */}
      <Container maxW="container.md" py={12}>
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="xl"
          p={8}
          borderWidth="2px"
          borderColor="blue.500"
        >
          <ResultContent
            weatherType={weatherType}
            analysis={analysis}
            userName={userData.nama}
          />
          <ActionButtons
            onBackToHome={handleBackToHome}
            onRetakeTest={handleRetakeTest}
            onViewHistory={handleViewHistory}
          />
        </Box>
      </Container>
    </Box>
  );
};
