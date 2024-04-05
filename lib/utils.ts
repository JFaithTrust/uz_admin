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

export function countUp(start: number = 0, end: number, duration: number = 1000): void {
  const steps = Math.ceil(Math.abs(end - start) / duration); // Calculate steps based on duration
  let current = start;

  for (let i = 0; i <= steps; i++) {
    setTimeout(() => {
      console.log(current);
      current += (end - start) / steps; // Adjust increment for smooth transition
    }, i * duration / steps);
  }
}