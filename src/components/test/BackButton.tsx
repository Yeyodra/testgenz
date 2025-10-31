import { Button } from "@chakra-ui/react";

interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const BackButton = ({ onClick, disabled = false }: BackButtonProps) => {
  return (
    <Button
      variant="ghost"
      colorPalette="gray"
      onClick={onClick}
      disabled={disabled}
      size="md"
      fontWeight="medium"
    >
      ← Sebelumnya
    </Button>
  );
};

