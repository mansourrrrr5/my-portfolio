import type { Metadata } from "next";
import { getDictionary, getAllLocales } from "@/lib/i18n";
import CursorFollower from "@/components/CursorFollower";
import BackToTop from "@/components/BackToTop";
import AiChat from "@/components/AiChat";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const localeMap: Record<string, string> = {
    en: "en_US",
    de: "de_DE",
    fr: "fr_FR",
  };

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
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
      locale: localeMap[locale] || "en_US",
      url: `https://azizportfolio.com/${locale === "en" ? "" : locale}`,
      title: dict.metadata.title,
      description: dict.metadata.description,
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
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    robots: "index, follow",
    icons: {
      icon: "/favicon.ico",
    },
    alternates: {
      languages: {
        en: "https://azizportfolio.com",
        de: "https://azizportfolio.com/de",
        fr: "https://azizportfolio.com/fr",
      },
    },
  };
}

export function generateStaticParams() {
  return getAllLocales().map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  await params; // Await params in async component
  return (
    <div>
      <CursorFollower />
      <AiChat />
      <BackToTop />
      {children}
    </div>
  );
}
