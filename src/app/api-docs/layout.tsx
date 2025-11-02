import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TestGenz Clone API Documentation",
  description: "Dokumentasi API untuk aplikasi TestGenz Clone - Platform tes online interaktif",
};

export default function ApiDocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

