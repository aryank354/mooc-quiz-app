"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color mode"
      className={`fixed top-4 right-4 z-[100] p-2.5 rounded-full shadow-lg transition-all duration-300 border
        ${theme === "dark"
          ? "bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-700"
          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
        } ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
