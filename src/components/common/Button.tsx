"use client";

import { forwardRef } from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";

// Tentukan tipe props kita sendiri, yang "mewarisi" semua props Button Chakra
export type CustomButtonProps = ButtonProps;

// 'forwardRef' meneruskan 'ref' ke komponen Chakra di dalamnya
const Button = forwardRef<HTMLButtonElement, CustomButtonProps>((props, ref) => {
  return (
    <ChakraButton
      ref={ref}
      // --- Ini adalah "Style Kustom" Anda ---
      colorPalette="teal" // Otomatis atur semua tombol jadi 'teal' (v3 uses colorPalette)
      size="lg" // Otomatis atur ukuran jadi 'large'
      fontWeight="bold"
      borderRadius="xl" // Buat lebih bulat (GenZ style)
      // ------------------------------------
      {...props} // Ini 'props' sisanya (seperti onClick, children, dll)
    >
      {props.children}
    </ChakraButton>
  );
});

Button.displayName = "Button";

export default Button;
