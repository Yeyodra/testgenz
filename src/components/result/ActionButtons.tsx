"use client";

import { Button, HStack } from "@chakra-ui/react";

interface ActionButtonsProps {
  onBackToHome: () => void;
  onRetakeTest: () => void;
  onViewHistory?: () => void;
}

export const ActionButtons = ({
  onBackToHome,
  onRetakeTest,
  onViewHistory,
}: ActionButtonsProps) => {
  return (
    <HStack gap={4} width="100%" justify="center" mt={8} flexWrap="wrap">
      <Button
        variant="outline"
        colorPalette="gray"
        onClick={onBackToHome}
        size="lg"
        fontWeight="medium"
      >
        Kembali ke Beranda
      </Button>
      {onViewHistory && (
        <Button
          variant="outline"
          colorPalette="purple"
          onClick={onViewHistory}
          size="lg"
          fontWeight="medium"
        >
          Lihat Riwayat
        </Button>
      )}
      <Button
        variant="solid"
        colorPalette="blue"
        onClick={onRetakeTest}
        size="lg"
        fontWeight="medium"
      >
        Ulang Tes
      </Button>
    </HStack>
  );
};
