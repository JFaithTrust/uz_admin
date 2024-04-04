import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(number: number) {
  // Sonni xato kirishlarni tekshirish
  if (isNaN(number)) {
    return "Noto'g'ri son kiritildi";
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
