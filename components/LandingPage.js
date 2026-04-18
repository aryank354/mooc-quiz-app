"use client";

import { useState } from "react";
import { BookOpen, Trophy, Clock, ArrowRight, Code, Minus, Plus, Hash } from "lucide-react";
import { validateName } from "@/utils/quizLogic";
import ThemeToggle from "./ThemeToggle";

const QUICK_PICKS = [5, 10, 20, 30, 50, 75];

export default function LandingPage({ onStart }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("ecology");
  const [mode, setMode] = useState("standard"); // 'standard' | 'custom' | 'full'
  const [customCount, setCustomCount] = useState(20);
  const [countError, setCountError] = useState("");

  const isEcology = subject === "ecology";
  const accentActive  = isEcology ? "bg-green-500 text-white shadow-lg scale-105" : "bg-blue-600 text-white shadow-lg scale-105";
  const accentRing    = isEcology ? "focus:border-green-500 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900" : "focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900";
  const accentBtn     = isEcology ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
  const accentIcon    = isEcology ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-blue-500 to-indigo-500";
  const accentChip    = isEcology ? "border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
  const accentStepper = isEcology ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700";

  const handleCountChange = (val) => {
    setCountError("");
    if (val === "") { setCustomCount(""); return; }
    const n = parseInt(val, 10);
    if (isNaN(n)) return;
    if (n > 500)  { setCountError("Maximum is 500 questions."); setCustomCount(500); return; }
    setCustomCount(n);
  };

  const stepCount = (delta) => {
    const next = Math.max(1, Math.min(500, (Number(customCount) || 0) + delta));
    setCustomCount(next);
    setCountError("");
  };

  const resolvedCount = () => {
    if (mode === "standard") return 50;
    if (mode === "full")     return null; // page.js treats null as "all"
    return Number(customCount) || 20;
  };

  const handleStart = () => {
    const validation = validateName(name);
    if (!validation.isValid) { setError(validation.error); return; }

    if (mode === "custom") {
      const n = Number(customCount);
      if (!n || n < 1) { setCountError("Please enter a valid number of questions."); return; }
    }

    onStart(name.trim(), subject, mode, resolvedCount());
  };

  const handleKeyPress = (e) => { if (e.key === "Enter") handleStart(); };

  const modeBase = "flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold transition-all text-sm";
  const modeOn   = "bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md";
  const modeOff  = "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700";

  const questionLabel =
    mode === "full"     ? "Every Single Question" :
    mode === "standard" ? "50 Questions" :
    `${customCount || "?"} Questions`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
      isEcology
        ? "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"
        : "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600"
    }`}>
      <ThemeToggle />

      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-[1.01] transition-transform duration-300">

        {/* ── Subject Selection ── */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <button
            onClick={() => setSubject("ecology")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              isEcology ? accentActive : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            🌿 Wildlife Ecology
          </button>
          <button
            onClick={() => setSubject("oops")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              !isEcology ? accentActive : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Code className="w-5 h-5" /> OOPs Practice
          </button>
        </div>

        {/* ── Mode Selection ── */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
          <button onClick={() => setMode("standard")} className={`${modeBase} ${mode === "standard" ? modeOn : modeOff}`}>
            ⏱️ Standard (50 Qs)
          </button>
          <button onClick={() => setMode("custom")} className={`${modeBase} ${mode === "custom" ? modeOn : modeOff}`}>
            <Hash className="w-4 h-4" /> Custom
          </button>
          <button onClick={() => setMode("full")} className={`${modeBase} ${mode === "full" ? modeOn : modeOff}`}>
            🔥 Marathon (All)
          </button>
        </div>

        {/* ── Custom Question Picker ── */}
        <div className={`overflow-hidden transition-all duration-300 ${mode === "custom" ? "max-h-64 opacity-100 mb-6" : "max-h-0 opacity-0"}`}>
          <div className="p-5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center tracking-wide uppercase">
              How many questions?
            </p>

            {/* Quick-pick chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {QUICK_PICKS.map((n) => (
                <button
                  key={n}
                  onClick={() => { setCustomCount(n); setCountError(""); }}
                  className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-all hover:scale-105 active:scale-95 ${
                    customCount === n
                      ? accentChip
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-400"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Stepper row */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => stepCount(-5)}
                title="−5"
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-xs transition-all hover:scale-110 active:scale-95 shadow-sm ${accentStepper}`}
              >
                −5
              </button>
              <button
                onClick={() => stepCount(-1)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-sm ${accentStepper}`}
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min={1}
                max={500}
                value={customCount}
                onChange={(e) => handleCountChange(e.target.value)}
                className="w-24 text-center text-2xl font-black py-1.5 px-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 outline-none focus:border-gray-500 dark:focus:border-gray-400 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                onClick={() => stepCount(1)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-sm ${accentStepper}`}
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => stepCount(5)}
                title="+5"
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-xs transition-all hover:scale-110 active:scale-95 shadow-sm ${accentStepper}`}
              >
                +5
              </button>
            </div>

            {countError && (
              <p className="text-red-500 dark:text-red-400 text-xs text-center mt-2 font-semibold">{countError}</p>
            )}
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">Range: 1 – 500</p>
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="text-center mb-8">
          <div className={`inline-block p-4 rounded-full mb-4 ${accentIcon}`}>
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {isEcology ? "Wildlife Ecology" : "OOPs Concepts"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">Test Your Knowledge</p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{questionLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Randomized Order</span>
            </div>
          </div>
        </div>

        {/* ── Name + Start ── */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Enter Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              onKeyPress={handleKeyPress}
              placeholder="Your full name"
              className={`w-full px-6 py-4 text-lg text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${accentRing}`}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={handleStart}
            className={`w-full text-white py-4 px-8 rounded-xl font-bold text-lg transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3 ${accentBtn}`}
          >
            {mode === "custom"
              ? `Start ${customCount || "?"}-Question Quiz`
              : mode === "full"
              ? "Start Marathon"
              : "Start Quiz"}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* ── Made by credit ── */}
      <div className="mt-6 text-center">
        <p className="text-white/70 text-sm font-medium">
          Made with ❤️ by{" "}
          <a
            href="https://aryankanojia.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold underline underline-offset-2 decoration-white/50 hover:decoration-white hover:text-white transition-all"
          >
            Aryan Kanojia
          </a>
        </p>
      </div>
    </div>
  );
}
