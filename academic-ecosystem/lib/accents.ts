import type { PlatformId } from "@/data/site";

/**
 * Static class names for each discipline accent. Tailwind needs complete
 * class strings at build time, so they are listed here rather than built
 * from template strings.
 */
export const accent: Record<
  PlatformId,
  {
    text: string;
    textDeep: string;
    textLight: string;
    bg: string;
    bgSoft: string;
    border: string;
    hex: string;
    lightHex: string;
    softHex: string;
  }
> = {
  economics: {
    text: "text-economics",
    textDeep: "text-economics-deep",
    textLight: "text-economics-light",
    bg: "bg-economics",
    bgSoft: "bg-economics-soft",
    border: "border-economics",
    hex: "#1f6f61",
    lightHex: "#86c9b6",
    softHex: "#dfece6",
  },
  business: {
    text: "text-business",
    textDeep: "text-business-deep",
    textLight: "text-business-light",
    bg: "bg-business",
    bgSoft: "bg-business-soft",
    border: "border-business",
    hex: "#93541f",
    lightHex: "#e3ad74",
    softHex: "#f2e5d4",
  },
  politics: {
    text: "text-politics",
    textDeep: "text-politics-deep",
    textLight: "text-politics-light",
    bg: "bg-politics",
    bgSoft: "bg-politics-soft",
    border: "border-politics",
    hex: "#3a4795",
    lightHex: "#a3afef",
    softHex: "#e2e5f3",
  },
};
