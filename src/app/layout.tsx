import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "0dot77 — Taeyang Yoo",
    template: "%s | 0dot77",
  },
  description:
    "Media Artist & Developer & Explorer. Immersive experiences at the intersection of art and technology.",
  metadataBase: new URL("https://0dot77.com"),
  openGraph: {
    title: "0dot77 — Taeyang Yoo",
    description:
      "Media Artist & Developer & Explorer. Immersive experiences at the intersection of art and technology.",
    url: "https://0dot77.com",
    siteName: "0dot77",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
