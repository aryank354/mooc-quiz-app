"use client";

import { useState, useEffect } from "react";
import { BookOpen, Trophy, Clock, ArrowRight, Code, Minus, Plus, Hash, Calendar, BrainCircuit, BarChart2, X, Timer } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getHistory } from "@/utils/quizLogic";

const QUICK_PICKS = [5, 10, 20, 30, 50, 75];

export default function LandingPage({ onStart }) {
  const [subject, setSubject] = useState("oops");
  const [mode, setMode] = useState("standard");
  const [customCount, setCustomCount] = useState(20);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [countError, setCountError] = useState("");
  const [isTimed, setIsTimed] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => { setHistory(getHistory()); }, []);

  const isEcology = subject === "ecology";
  const accentActive = isEcology ? "bg-green-500 text-white shadow-lg scale-105" : "bg-blue-600 text-white shadow-lg scale-105";
  const accentBtn = isEcology ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
  const accentIcon = isEcology ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-blue-500 to-indigo-500";
  const accentChip = isEcology ? "border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";

  const resolvedCount = () => {
    if (mode === "standard") return 50;
    if (mode === "full" || mode === "week-wise" || mode === "smart-study") return null;
    return Number(customCount) || 20;
  };

  const handleStart = () => {
    if (mode === "custom" && (!customCount || customCount < 1)) {
      setCountError("Please enter a valid number."); return;
    }
    onStart(subject, mode, resolvedCount(), selectedWeek, isTimed);
  };

  const modeOn = "bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 shadow-md ring-2 ring-offset-2 dark:ring-offset-gray-900 " + (isEcology ? "ring-green-500" : "ring-blue-500");
  const modeOff = "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-8 px-4 transition-colors duration-500 ${isEcology ? "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600" : "bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600"}`}>
      <ThemeToggle />

      <button onClick={() => setShowDashboard(true)} className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 transition-all">
        <BarChart2 className="w-5 h-5" /> Dashboard
      </button>

      {/* Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative">
            <button onClick={() => setShowDashboard(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500" /> Recent Performance</h2>
            {history.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No quizzes taken yet. Start practicing!</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {history.map((h, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{h.subject === 'ecology' ? '🌿 Ecology' : '💻 OOPs'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{h.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-lg ${parseFloat(h.percentage) >= 50 ? 'text-green-500' : 'text-red-500'}`}>{h.percentage}%</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{h.correct}/{h.total} Correct</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subject Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => setSubject("ecology")} className={`flex items-center justify-center gap-2 py-4 px-3 rounded-2xl font-bold text-base transition-all ${isEcology ? accentActive : modeOff}`}>
            🌿 <span>Ecology</span>
          </button>
          <button onClick={() => setSubject("oops")} className={`flex items-center justify-center gap-2 py-4 px-3 rounded-2xl font-bold text-base transition-all ${!isEcology ? accentActive : modeOff}`}>
            <Code className="w-5 h-5" /> <span>OOPs</span>
          </button>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          <button onClick={() => setMode("standard")} className={`flex flex-col items-center py-3 rounded-xl font-bold text-xs transition-all ${mode === "standard" ? modeOn : modeOff}`}>
            <span className="text-lg">⏱️</span><span>Standard</span>
          </button>
          <button onClick={() => setMode("custom")} className={`flex flex-col items-center py-3 rounded-xl font-bold text-xs transition-all ${mode === "custom" ? modeOn : modeOff}`}>
            <Hash className="w-5 h-5 mb-1" /><span>Custom</span>
          </button>
          <button onClick={() => setMode("week-wise")} className={`flex flex-col items-center py-3 rounded-xl font-bold text-xs transition-all ${mode === "week-wise" ? modeOn : modeOff}`}>
            <Calendar className="w-5 h-5 mb-1" /><span>Week-wise</span>
          </button>
          <button onClick={() => setMode("smart-study")} className={`flex flex-col items-center py-3 rounded-xl font-bold text-xs transition-all ${mode === "smart-study" ? modeOn : modeOff}`}>
            <BrainCircuit className="w-5 h-5 mb-1" /><span>Smart Study</span>
          </button>
          <button onClick={() => setMode("full")} className={`flex flex-col items-center py-3 rounded-xl font-bold text-xs transition-all ${mode === "full" ? modeOn : modeOff}`}>
            <span className="text-lg">🔥</span><span>Marathon</span>
          </button>
        </div>

        {/* Timer Toggle */}
        <div className="mb-6 flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => setIsTimed(!isTimed)}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isTimed ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}><Timer className="w-5 h-5" /></div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Exam Simulator (Strict Timer)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 minute per question. Auto-submits on timeout.</p>
            </div>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors relative ${isTimed ? (isEcology ? 'bg-green-500' : 'bg-blue-500') : 'bg-gray-300 dark:bg-gray-600'}`}>
            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isTimed ? 'translate-x-6' : ''}`} />
          </div>
        </div>

        {/* Week Picker (Shows only in week mode) */}
        {mode === "week-wise" && (
          <div className="mb-6 grid grid-cols-4 sm:grid-cols-7 gap-2">
            {[...Array(13).keys()].map((w) => (
              <button key={w} onClick={() => setSelectedWeek(w)} className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedWeek === w ? accentChip : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>Wk {w}</button>
            ))}
          </div>
        )}

        {/* Start Button */}
        <button onClick={handleStart} className={`w-full text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 ${accentBtn}`}>
          {mode === "smart-study" ? "Review My Mistakes" : "Start Practice"} <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}