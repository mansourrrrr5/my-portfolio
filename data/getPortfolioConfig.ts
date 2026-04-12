import type { PortfolioConfig } from "@/types";
import { portfolioConfig as enConfig } from "./content/en";
import { portfolioConfig as deConfig } from "./content/de";
import { portfolioConfig as frConfig } from "./content/fr";

export async function getPortfolioConfig(
  locale: string = "en"
): Promise<PortfolioConfig> {
  switch (locale) {
    case "de":
      return deConfig;
    case "fr":
      return frConfig;
    case "en":
    default:
      return enConfig;
  }
}

export { enConfig, deConfig, frConfig };
