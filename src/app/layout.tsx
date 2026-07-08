import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ZAKY.DEV | Muhammad Zaky Zamzami",
  description:
    "Backend & DevOps Engineer. Suka membangun sistem dari nol sampai production-ready.",
  keywords: [
    "Muhammad Zaky Zamzami",
    "Backend Developer",
    "DevOps Engineer",
    "Python",
    "FastAPI",
    "Docker",
    "Portfolio",
  ],
  openGraph: {
    title: "ZAKY.DEV",
    description:
      "Backend & DevOps Engineer. Suka membangun sistem dari nol sampai production-ready.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,900&family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}