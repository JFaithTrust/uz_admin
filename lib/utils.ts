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

export function getInitials(fullName: string): string {
  // Split the full name into words
  const words = fullName.split(/\s+/);

  // Get the first letter of each word (using map and toUpperCase)
  const initials = words.map((word) => word[0].toUpperCase());

  // Join the initials into a single string
  return initials.join("");
}