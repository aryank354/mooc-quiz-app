"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Trophy, ArrowRight, ChevronLeft, Menu, X, XCircle, Flag, Timer } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export const formatQuestionText = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let currentText = [];
  let currentCode = [];
  let inCodeBlock = false;

  const startCodePatterns = [/^#include/, /^class /, /^public class /, /^int main/, /^try\s*\{/, /^(public|private|protected):/, /^template\s*</, /^std::/, /^deque<int>/];
  const endCodePatterns = [/^What /, /^Which /, /^Identify /, /^How /, /^Select /];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("•")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        elements.push(<div key={`code-${index}`} className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm overflow-x-auto mb-5 shadow-xl"><pre className="m-0"><code>{currentCode.join("\n")}</code></pre></div>);
        currentCode = [];
      }
      currentText.push(line);
      return;
    }
    const isCodeStart = startCodePatterns.some(pattern => pattern.test(trimmed)) || (trimmed.includes("{") && !trimmed.includes("What"));
    const isQuestionStart = endCodePatterns.some(pattern => pattern.test(trimmed));

    if (!inCodeBlock && isCodeStart && trimmed.length > 0) {
      inCodeBlock = true;
      if (currentText.length > 0) { elements.push(<p key={`text-${index}`} className="mb-4 font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line">{currentText.join("\n")}</p>); currentText = []; }
    } else if (inCodeBlock && (isQuestionStart || trimmed === "")) {
      if (isQuestionStart) {
        inCodeBlock = false;
        if (currentCode.length > 0) { elements.push(<div key={`code-${index}`} className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm overflow-x-auto mb-5 shadow-xl"><pre className="m-0"><code>{currentCode.join("\n")}</code></pre></div>); currentCode = []; }
      }
    }
    if (inCodeBlock) currentCode.push(line);
    else if (trimmed !== "") currentText.push(line);
  });

  if (currentText.length > 0) elements.push(<p key="text-end" className="mb-0 font-semibold text-gray-800 dark:text-gray-100 whitespace-pre-line">{currentText.join("\n")}</p>);
  if (currentCode.length > 0) elements.push(<div key="code-end" className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm overflow-x-auto mb-5 shadow-xl"><pre className="m-0"><code>{currentCode.join("\n")}</code></pre></div>);
  return <div className="text-lg md:text-xl leading-relaxed">{elements}</div>;
};

export default function QuizInterface({ subjectTheme, questions, isTimed, onComplete, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);
  const [flagged, setFlagged] = useState(new Set());
  
  // Timer State (60 seconds per question)
  const [timeLeft, setTimeLeft] = useState(isTimed ? questions.length * 60 : null);

  useEffect(() => {
    if (!isTimed || timeLeft === null) return;
    if (timeLeft <= 0) {
      onComplete(answers, flagged);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isTimed, timeLeft, answers, flagged, onComplete]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const themeColor = subjectTheme === "ecology" ? "green" : "blue";

  const toggleFlag = () => {
    const newFlags = new Set(flagged);
    if (newFlags.has(currentQuestion.id)) newFlags.delete(currentQuestion.id);
    else newFlags.add(currentQuestion.id);
    setFlagged(newFlags);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[questions[currentIndex + 1].id] ?? null);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const themeAccent = themeColor === "green" 
    ? { progress: "bg-green-500", text: "text-green-600 dark:text-green-400", border: "border-green-500", bgSelected: "bg-green-50 dark:bg-green-950", btn: "bg-green-600 hover:bg-green-700" }
    : { progress: "bg-blue-500", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500", bgSelected: "bg-blue-50 dark:bg-blue-950", btn: "bg-blue-600 hover:bg-blue-700" };

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-300 ${subjectTheme === "ecology" ? "bg-green-50 dark:bg-gray-950" : "bg-blue-50 dark:bg-gray-950"}`}>
      <ThemeToggle />

      <div className="p-4 md:p-8 max-w-7xl mx-auto pt-16 lg:pt-8">
        {/* Header Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-6 flex justify-between items-center border border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Practice Mode</h2>
            <p className="text-gray-500 dark:text-gray-400">Question {currentIndex + 1} of {questions.length}</p>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {isTimed && (
              <div className={`flex items-center gap-2 text-xl font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-800 dark:text-white'}`}>
                <Timer className="w-6 h-6" /> {formatTime(timeLeft)}
              </div>
            )}
            <div className="text-right hidden sm:block">
              <div className={`text-3xl font-black ${themeAccent.text}`}>{answeredCount}/{questions.length}</div>
            </div>
            
            {/* Exit Button */}
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
                  onExit();
                }
              }} 
              className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-xl font-bold transition-all border border-red-100 dark:border-red-900/50"
            >
              <XCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800 relative">
              
              <button onClick={toggleFlag} className={`absolute top-6 right-6 p-2 rounded-full transition-all ${flagged.has(currentQuestion.id) ? 'bg-orange-100 text-orange-500 dark:bg-orange-900/40' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'}`}>
                <Flag className="w-5 h-5" fill={flagged.has(currentQuestion.id) ? "currentColor" : "none"} />
              </button>

              <div className="mb-8 mt-2 pr-10">{formatQuestionText(currentQuestion.question)}</div>

              <div className="space-y-3">
                {currentQuestion.shuffledOptions.map((opt, i) => (
                  <button key={i} onClick={() => { setSelectedOption(i); setAnswers({ ...answers, [currentQuestion.id]: i }); }} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedOption === i ? `${themeAccent.border} ${themeAccent.bgSelected} shadow-md` : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                    <span className={`text-lg font-medium ${selectedOption === i ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => { setCurrentIndex(currentIndex - 1); setSelectedOption(answers[questions[currentIndex - 1].id] ?? null); }} disabled={currentIndex === 0} className="flex-1 py-4 bg-gray-200 dark:bg-gray-800 rounded-xl font-bold text-gray-700 dark:text-gray-300 disabled:opacity-40 flex items-center justify-center gap-2">
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>

              {currentIndex === questions.length - 1 ? (
                <button onClick={() => onComplete(answers, flagged)} disabled={!allAnswered && !isTimed} className="flex-[2] py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                  Submit Quiz <Trophy className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={handleNext} className={`flex-[2] py-4 text-white rounded-xl font-bold flex items-center justify-center gap-2 ${themeAccent.btn}`}>
                  Next Question <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigator Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">Navigator</h3>
              <div className="grid grid-cols-4 gap-2">
                {questions.map((q, idx) => {
                  const isAns = answers[q.id] !== undefined;
                  const isCur = idx === currentIndex;
                  const isFlag = flagged.has(q.id);
                  return (
                    <button key={q.id} onClick={() => { setCurrentIndex(idx); setSelectedOption(answers[q.id] ?? null); }} className={`aspect-square rounded-xl font-bold text-sm relative ${isCur ? themeAccent.btn + ' text-white scale-110' : isAns ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                      {idx + 1}
                      {isFlag && <Flag className="absolute -top-1 -right-1 w-3 h-3 text-orange-500" fill="currentColor" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}