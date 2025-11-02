"use client";

import {
  Button as ChakraButton, // Kita ganti namanya agar tidak bentrok
  ButtonProps, // Kita ambil tipe props-nya
  forwardRef, // Ini penting untuk Chakra UI
} from "@chakra-ui/react";

// Tentukan tipe props kita sendiri, yang "mewarisi" semua props Button Chakra
export type CustomButtonProps = ButtonProps;

// 'forwardRef' meneruskan 'ref' ke komponen Chakra di dalamnya
const Button = forwardRef<CustomButtonProps, "button">((props, ref) => {
  return (
    <ChakraButton
      ref={ref}
      // --- Ini adalah "Style Kustom" Anda ---
      colorScheme="teal" // Otomatis atur semua tombol jadi 'teal'
      size="lg" // Otomatis atur ukuran jadi 'large'
      fontWeight="bold"
      borderRadius="xl" // Buat lebih bulat (GenZ style)
      shadow="lg" // Beri efek bayangan
      _hover={{
        opacity: 0.9, // Efek hover simpel
        transform: "scale(1.02)", // Sedikit membesar saat di-hover
      }}
      // ------------------------------------

      {...props} // Ini 'props' sisanya (seperti onClick, children, dll)
    >
      {props.children}
    </ChakraButton>
  );
});

export default Button;