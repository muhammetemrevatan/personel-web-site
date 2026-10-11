export type Language = "tr" | "en";
export const language = (v?: string | string[]): Language => v === "en" ? "en" : "tr";
export const text = (l: Language, tr: string, en: string) => l === "tr" ? tr : en;
export const href = (p: string, l: Language) => `${p}?lang=${l}`;
