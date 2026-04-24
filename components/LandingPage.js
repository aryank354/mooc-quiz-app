"use client";

import { useState } from "react";
import { BookOpen, Trophy, Clock, ArrowRight, Code, Minus, Plus, Hash, Calendar } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const QUICK_PICKS = [5, 10, 20, 30, 50, 75];

export default function LandingPage({ onStart }) {
  const [subject, setSubject] = useState("ecology");
  const [mode, setMode] = useState("standard");
  const [customCount, setCustomCount] = useState(20);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [countError, setCountError] = useState("");

  const isEcology = subject === "ecology";

  const accentActive  = isEcology ? "bg-green-500 text-white shadow-lg scale-105" : "bg-blue-600 text-white shadow-lg scale-105";
  const accentRing    = isEcology ? "focus:border-green-500 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900" : "focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900";
  const accentBtn     = isEcology ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
  const accentIcon    = isEcology ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-blue-500 to-indigo-500";
  const accentChip    = isEcology ? "border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
  const accentStepper = isEcology ? "bg-green-500 hover:bg-green-600 active:bg-green-700" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800";

  const handleCountChange = (val) => {
    setCountError("");
    if (val === "") { setCustomCount(""); return; }
    const n = parseInt(val, 10);
    if (isNaN(n)) return;
    if (n > 500) { setCountError("Maximum is 500 questions."); setCustomCount(500); return; }
    setCustomCount(n);
  };

  const stepCount = (delta) => {
    const next = Math.max(1, Math.min(500, (Number(customCount) || 0) + delta));
    setCustomCount(next);
    setCountError("");
  };

  const resolvedCount = () => {
    if (mode === "standard") return 50;
    if (mode === "full" || mode === "week-wise") return null;
    return Number(customCount) || 20;
  };

  const handleStart = () => {
    if (mode === "custom") {
      const n = Number(customCount);
      if (!n || n < 1) { setCountError("Please enter a valid number of questions."); return; }
    }
    onStart(subject, mode, resolvedCount(), selectedWeek);
  };

  const modeOn  = "bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md";
  const modeOff = "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400";

  const questionLabel =
    mode === "full"     ? "Every Single Question" :
    mode === "standard" ? "50 Questions" :
    mode === "week-wise"? `Week ${selectedWeek} Questions` :
    `${customCount || "?"} Questions`;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-8 px-4 transition-colors duration-500 ${
      isEcology
        ? "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"
        : "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600"
    }`}>
      <ThemeToggle />

      {/* Card */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10">

        {/* ── Subject Selection ── */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setSubject("ecology")}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm transition-all ${
              isEcology ? accentActive : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            }`}
          >
            🌿 <span>Wildlife Ecology</span>
          </button>
          <button
            onClick={() => setSubject("oops")}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm transition-all ${
              !isEcology ? accentActive : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            }`}
          >
            <Code className="w-4 h-4 flex-shrink-0" /> <span>OOPs Practice</span>
          </button>
        </div>

        {/* ── Mode Selection ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <button
            onClick={() => setMode("standard")}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl font-bold text-xs transition-all ${mode === "standard" ? modeOn : modeOff}`}
          >
            <span className="text-base">⏱️</span>
            <span>Standard</span>
            <span className="font-normal opacity-75">50 Qs</span>
          </button>
          <button
            onClick={() => setMode("custom")}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl font-bold text-xs transition-all ${mode === "custom" ? modeOn : modeOff}`}
          >
            <Hash className="w-4 h-4" />
            <span>Custom</span>
            <span className="font-normal opacity-75">Your pick</span>
          </button>
          <button
            onClick={() => setMode("week-wise")}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl font-bold text-xs transition-all ${mode === "week-wise" ? modeOn : modeOff}`}
          >
            <Calendar className="w-4 h-4" />
            <span>Week-wise</span>
            <span className="font-normal opacity-75">Topic Focus</span>
          </button>
          <button
            onClick={() => setMode("full")}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl font-bold text-xs transition-all ${mode === "full" ? modeOn : modeOff}`}
          >
            <span className="text-base">🔥</span>
            <span>Marathon</span>
            <span className="font-normal opacity-75">All Qs</span>
          </button>
        </div>

        {/* ── Custom Question Picker ── */}
        <div className={`overflow-hidden transition-all duration-300 ${mode === "custom" ? "max-h-72 opacity-100 mb-4" : "max-h-0 opacity-0 hidden"}`}>
          <div className="p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 text-center uppercase tracking-widest">
              How many questions?
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {QUICK_PICKS.map((n) => (
                <button
                  key={n}
                  onClick={() => { setCustomCount(n); setCountError(""); }}
                  className={`py-2 rounded-xl text-sm font-bold border-2 transition-all active:scale-95 ${
                    customCount === n
                      ? accentChip
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => stepCount(-5)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-sm transition-all active:scale-95 ${accentStepper}`}
              >−5</button>
              <button
                onClick={() => stepCount(-1)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-all active:scale-95 ${accentStepper}`}
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min={1}
                max={500}
                value={customCount}
                onChange={(e) => handleCountChange(e.target.value)}
                className="w-20 text-center text-2xl font-black py-1.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 outline-none focus:border-gray-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                onClick={() => stepCount(1)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-all active:scale-95 ${accentStepper}`}
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => stepCount(5)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-sm transition-all active:scale-95 ${accentStepper}`}
              >+5</button>
            </div>

            {countError && (
              <p className="text-red-500 dark:text-red-400 text-xs text-center mt-2 font-semibold">{countError}</p>
            )}
          </div>
        </div>

        {/* ── Week Picker ── */}
        <div className={`overflow-hidden transition-all duration-300 ${mode === "week-wise" ? "max-h-72 opacity-100 mb-4" : "max-h-0 opacity-0 hidden"}`}>
          <div className="p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 text-center uppercase tracking-widest">
              Select a Week to Practice
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {[...Array(13).keys()].map((w) => (
                <button
                  key={w}
                  onClick={() => setSelectedWeek(w)}
                  className={`py-2 rounded-xl text-sm font-bold border-2 transition-all active:scale-95 ${
                    selectedWeek === w
                      ? accentChip
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Wk {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="text-center mb-6">
          <div className={`inline-flex p-3 rounded-full mb-3 ${accentIcon}`}>
            <BookOpen className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {isEcology ? "Wildlife Ecology" : "OOPs Concepts"}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">Test Your Knowledge</p>
          <div className="flex justify-center items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{questionLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              <span>Randomized Order</span>
            </div>
          </div>
        </div>

        {/* ── Start Button ── */}
        <button
          onClick={handleStart}
          className={`w-full text-white py-4 mt-2 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 ${accentBtn}`}
        >
          {mode === "custom"
            ? `Start ${customCount || "?"}-Question Quiz`
            : mode === "full"
            ? "Start Marathon"
            : mode === "week-wise"
            ? `Start Week ${selectedWeek} Practice`
            : "Start Quiz"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Credit ── */}
      <div className="mt-5 text-center">
        <p className="text-white/70 text-sm font-medium">
          Made with ❤️ by{" "}
          <a
            href="https://aryankanojia.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold underline underline-offset-2 decoration-white/50 hover:decoration-white transition-all"
          >
            Aryan Kanojia
          </a>
        </p>
      </div>
    </div>
  );
}