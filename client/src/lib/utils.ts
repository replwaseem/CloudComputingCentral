import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'AWS': 'bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-900',
    'Python': 'bg-accent-100 text-accent-800 dark:bg-accent-200 dark:text-accent-900',
    'NodeJS': 'bg-secondary-100 text-secondary-800 dark:bg-secondary-200 dark:text-secondary-900',
    'Cloud Architecture': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900',
    'DevOps': 'bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900',
  };

  return colorMap[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
}
