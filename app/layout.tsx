import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/scroll-reveal.css";
import CursorFollower from "@/components/CursorFollower";
import BackToTop from "@/components/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aziz - Software Engineer & AI Specialist",
  description:
    "Passionate developer building impactful digital solutions at the intersection of software engineering and AI. Expertise in Python, Machine Learning, Computer Vision, and Full-Stack Development.",
  keywords: [
    "Software Engineer",
    "AI Engineer",
    "Full-Stack Developer",
    "Python",
    "Machine Learning",
    "Computer Vision",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Aziz" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://azizportfolio.com",
    title: "Aziz - Software Engineer & AI Specialist",
    description:
      "Passionate developer building impactful digital solutions at the intersection of software engineering and AI.",
    images: [
      {
        url: "https://azizportfolio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aziz Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aziz - Software Engineer & AI Specialist",
    description: "Building impactful digital solutions with AI and full-stack development.",
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        <CursorFollower />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
