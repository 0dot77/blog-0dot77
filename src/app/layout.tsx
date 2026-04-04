import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import AsciiDolphin from "@/components/AsciiDolphin";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taeyang Yoo — 0dot77",
  description:
    "Media Artist, Developer, Technical Director. 교육과 프로토타이핑을 통해 기술의 경험을 설계합니다.",
  metadataBase: new URL("https://0dot77.com"),
  openGraph: {
    title: "Taeyang Yoo — 0dot77",
    description:
      "Media Artist, Developer, Technical Director. 교육과 프로토타이핑을 통해 기술의 경험을 설계합니다.",
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="0dot77 Blog (KR)"
          href="/feed/ko"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="0dot77 Blog (EN)"
          href="/feed/en"
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
        <AsciiDolphin />
      </body>
    </html>
  );
}
