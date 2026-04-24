"use client";

import { useState } from "react";
import {
  CheckCircle,
  Trophy,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  XCircle,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// ==========================================
// SMART TEXT RENDERER (Detects Code Blocks)
// ==========================================
export const formatQuestionText = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let currentText = [];
  let currentCode = [];
  let inCodeBlock = false;

  const startCodePatterns = [
    /^#include/,
    /^class /,
    /^public class /,
    /^int main/,
    /^try\s*\{/,
    /^(public|private|protected):/,
    /^template\s*</,
    /^std::/,
    /^deque<int>/,
  ];
  const endCodePatterns = [
    /^What /,
    /^Which /,
    /^Identify /,
    /^How /,
    /^Select /,
  ];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("•")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        elements.push(
          <div
            key={`code-${index}`}
            className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm md:text-base overflow-x-auto mb-5 border border-gray-700 shadow-xl"
          >
            <pre className="m-0">
              <code>{currentCode.join("\n")}</code>
            </pre>
          </div>
        );
        currentCode = [];
      }
      currentText.push(line);
      return;
    }

    const isCodeStart =
      startCodePatterns.some((pattern) => pattern.test(trimmed)) ||
      (trimmed.includes("{") && !trimmed.includes("What"));
    const isQuestionStart = endCodePatterns.some((pattern) =>
      pattern.test(trimmed)
    );

    if (!inCodeBlock && isCodeStart && trimmed.length > 0) {
      inCodeBlock = true;
      if (currentText.length > 0) {
        elements.push(
          <p
            key={`text-${index}`}
            className="mb-4 whitespace-pre-line font-semibold text-gray-800 dark:text-gray-100"
          >
            {currentText.join("\n")}
          </p>
        );
        currentText = [];
      }
    } else if (inCodeBlock && (isQuestionStart || trimmed === "")) {
      if (isQuestionStart) {
        inCodeBlock = false;
        if (currentCode.length > 0) {
          elements.push(
            <div
              key={`code-${index}`}
              className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm md:text-base overflow-x-auto mb-5 border border-gray-700 shadow-xl"
            >
              <pre className="m-0">
                <code>{currentCode.join("\n")}</code>
              </pre>
            </div>
          );
          currentCode = [];
        }
      }
    }

    if (inCodeBlock) {
      currentCode.push(line);
    } else {
      if (trimmed !== "") currentText.push(line);
    }
  });

  if (currentText.length > 0) {
    elements.push(
      <p
        key="text-end"
        className="mb-0 whitespace-pre-line font-semibold text-gray-800 dark:text-gray-100"
      >
        {currentText.join("\n")}
      </p>
    );
  }
  if (currentCode.length > 0) {
    elements.push(
      <div
        key="code-end"
        className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm md:text-base overflow-x-auto mb-5 border border-gray-700 shadow-xl"
      >
        <pre className="m-0">
          <code>{currentCode.join("\n")}</code>
        </pre>
      </div>
    );
  }

  return <div className="text-lg md:text-xl leading-relaxed">{elements}</div>;
};

// ==========================================
// QUIZ INTERFACE COMPONENT
// ==========================================
export default function QuizInterface({
  subjectTheme,
  questions,
  onComplete,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const hasAnswered = answers[currentQuestion.id] !== undefined;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  const themeColor = subjectTheme === "ecology" ? "green" : "blue";

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[questions[currentIndex + 1].id] ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[questions[currentIndex - 1].id] ?? null);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentIndex(index);
    setSelectedOption(answers[questions[index].id] ?? null);
    setShowNavigator(false);
  };

  const handleSubmit = () => {
    if (allAnswered) onComplete(answers);
  };

  const themeBg =
    subjectTheme === "ecology"
      ? "bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-950 dark:to-gray-900"
      : "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-gray-900";

  const themeAccent =
    themeColor === "green"
      ? {
          badge: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
          progress: "bg-green-500",
          progressText: "text-green-600 dark:text-green-400",
          selectedBorder: "border-green-500 dark:border-green-400",
          selectedBg: "bg-green-50 dark:bg-green-950",
          hoverBorder: "hover:border-green-300 dark:hover:border-green-600",
          radioSelected: "border-green-500 dark:border-green-400 bg-green-500 dark:bg-green-400",
          radioHover: "border-gray-300 dark:border-gray-600 group-hover:border-gray-400",
          navBtn: "bg-green-600 dark:bg-green-700 text-white",
          navBtnHover: "hover:bg-green-700 dark:hover:bg-green-600",
          nextBtn:
            "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
        }
      : {
          badge: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
          progress: "bg-blue-500",
          progressText: "text-blue-600 dark:text-blue-400",
          selectedBorder: "border-blue-500 dark:border-blue-400",
          selectedBg: "bg-blue-50 dark:bg-blue-950",
          hoverBorder: "hover:border-blue-300 dark:hover:border-blue-600",
          radioSelected: "border-blue-500 dark:border-blue-400 bg-blue-500 dark:bg-blue-400",
          radioHover: "border-gray-300 dark:border-gray-600 group-hover:border-gray-400",
          navBtn: "bg-blue-600 dark:bg-blue-700 text-white",
          navBtnHover: "hover:bg-blue-700 dark:hover:bg-blue-600",
          nextBtn:
            "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
        };

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-300 ${themeBg}`}>
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                {subjectTheme === "ecology" ? "Wildlife Ecology" : "OOPs Practice"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Q {currentIndex + 1}/{questions.length}
              </p>
            </div>
            <div className="text-right mr-12">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Progress
              </div>
              <div className={`text-xl font-bold ${themeAccent.progressText}`}>
                {answeredCount}/{questions.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
            <div
              className={`${themeAccent.progress} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            onClick={() => setShowNavigator(!showNavigator)}
            className={`w-full px-4 py-2.5 ${themeAccent.navBtn} ${themeAccent.navBtnHover} rounded-lg font-semibold transition-all flex items-center justify-center gap-2`}
          >
            {showNavigator ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            {showNavigator ? "Close Navigator" : "Question Navigator"}
          </button>
        </div>
      </div>

      {/* Mobile Navigator Overlay */}
      {showNavigator && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all"
          onClick={() => setShowNavigator(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Jump to Question
              </h3>
              <button
                onClick={() => setShowNavigator(false)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all shadow-sm ${
                      index === currentIndex
                        ? `${themeAccent.navBtn}`
                        : isAnswered
                        ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Desktop Header */}
            <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-800 p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Quiz Practice
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Question {currentIndex + 1} of {questions.length}
                  </p>
                </div>
                <div className="text-right mr-12">
                  <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
                    Progress
                  </div>
                  <div className={`text-3xl font-black ${themeAccent.progressText}`}>
                    {answeredCount}/{questions.length}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className={`${themeAccent.progress} h-3 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-gray-800 p-5 md:p-8 border border-gray-100 dark:border-gray-700">
              <div className="mb-6 md:mb-8">
                <span
                  className={`inline-block px-4 py-1.5 ${themeAccent.badge} rounded-full text-sm font-bold mb-4 tracking-wide shadow-sm`}
                >
                  Question {currentIndex + 1}
                </span>
                <div className="mt-2">{formatQuestionText(currentQuestion.question)}</div>
              </div>

              {/* Options */}
              <div className="space-y-3 md:space-y-4">
                {currentQuestion.shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 group ${
                      selectedOption === index
                        ? `${themeAccent.selectedBorder} ${themeAccent.selectedBg} shadow-md transform scale-[1.01]`
                        : `border-gray-200 dark:border-gray-700 ${themeAccent.hoverBorder} hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm`
                    }`}
                  >
                    <div className="flex items-start md:items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0 transition-colors ${
                          selectedOption === index
                            ? themeAccent.radioSelected
                            : themeAccent.radioHover
                        }`}
                      >
                        {selectedOption === index && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span
                        className={`text-base md:text-lg font-medium leading-snug whitespace-pre-line ${
                          selectedOption === index
                            ? "text-gray-900 dark:text-gray-100"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-800 p-5 border border-gray-100 dark:border-gray-700">
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="flex-[2] py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Submit Quiz <Trophy className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className={`flex-[2] py-4 ${themeAccent.nextBtn} text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                  >
                    <span className="hidden sm:inline">Next Question</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
              {!allAnswered && currentIndex === questions.length - 1 && (
                <div className="text-center mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 text-sm font-semibold rounded-full">
                    <XCircle className="w-4 h-4" /> Please answer all {questions.length} questions
                    before submitting
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Sidebar Navigator */}
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-gray-800 p-6 sticky top-8 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-6 text-lg border-b dark:border-gray-700 pb-4">
                Question Navigator
              </h3>
              <div className="grid grid-cols-4 xl:grid-cols-5 gap-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                {questions.map((q, index) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = index === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(index)}
                      className={`aspect-square rounded-xl font-bold text-sm transition-all duration-200 transform ${
                        isCurrent
                          ? `${themeAccent.navBtn} scale-110 shadow-lg z-10`
                          : isAnswered
                          ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 hover:-translate-y-1"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:-translate-y-1"
                      }`}
                    >
                      {index + 1}
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