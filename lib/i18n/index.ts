import { en } from "@/messages/en";
import { de } from "@/messages/de";
import { fr } from "@/messages/fr";
import type { TranslationDict } from "@/messages/en";

export type Locale = "en" | "de" | "fr";

const dictionaries: Record<Locale, TranslationDict> = {
  en,
  de,
  fr,
};

export const getDictionary = async (locale: string): Promise<TranslationDict> => {
  const normalizedLocale = (locale.split("-")[0] || "en") as Locale;
  return dictionaries[normalizedLocale] || dictionaries.en;
};

export const getAllLocales = (): Locale[] => ["en", "de", "fr"];

export const getDefaultLocale = (): Locale => "en";

export const isValidLocale = (locale: string): locale is Locale => {
  return ["en", "de", "fr"].includes(locale);
};
