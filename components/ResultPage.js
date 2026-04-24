"use client";

import { Trophy, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { calculateResults } from "@/utils/quizLogic";
import ThemeToggle from "./ThemeToggle";

export default function ResultPage({ questions, answers, onRestart }) {
  const results = calculateResults(questions, answers);

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90)
      return { msg: "Outstanding! You've mastered the concepts!", color: "text-green-600 dark:text-green-400" };
    if (percentage >= 70)
      return { msg: "Great job! You have strong understanding!", color: "text-blue-600 dark:text-blue-400" };
    if (percentage >= 50)
      return { msg: "Good effort! Review the topics you missed.", color: "text-yellow-600 dark:text-yellow-400" };
    return { msg: "Keep studying! Review all the materials.", color: "text-orange-600 dark:text-orange-400" };
  };

  const performance = getPerformanceMessage(parseFloat(results.percentage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 p-4 md:p-8 transition-colors duration-300">
      {/* Theme Toggle */}
      <ThemeToggle />

      <div className="max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="rounded-2xl shadow-2xl dark:shadow-gray-800 p-8 mb-6 bg-white dark:bg-gray-900 border-4 border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div
              className={`inline-block p-4 rounded-full mb-4 ${
                results.passed ? "bg-green-100 dark:bg-green-900/40" : "bg-orange-100 dark:bg-orange-900/40"
              }`}
            >
              {results.passed ? (
                <Trophy className="w-16 h-16 text-green-600 dark:text-green-400" />
              ) : (
                <RotateCcw className="w-16 h-16 text-orange-600 dark:text-orange-400" />
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {results.passed ? "Congratulations!" : "Keep Learning!"}
            </h1>
            <p
              className={`text-lg font-bold mb-6 ${performance.color} bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg inline-block`}
            >
              {performance.msg}
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-purple-100 dark:bg-purple-900/40 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700">
                <div className="text-3xl font-bold text-gray-900 dark:text-purple-200">
                  {results.percentage}%
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-purple-300">Score</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/40 rounded-xl p-4 border-2 border-green-200 dark:border-green-700">
                <div className="text-3xl font-bold text-gray-900 dark:text-green-200">
                  {results.correct}
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-green-300">Correct</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900/40 rounded-xl p-4 border-2 border-red-200 dark:border-red-700">
                <div className="text-3xl font-bold text-gray-900 dark:text-red-200">
                  {results.incorrect}
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-red-300">Incorrect</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-800 p-6 mb-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Detailed Results
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {results.details.map((detail, index) => (
              <div
                key={detail.questionId}
                className={`p-4 rounded-xl border-2 ${
                  detail.isCorrect
                    ? "border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20"
                    : "border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  {detail.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                        Week {detail.week} • Assignment {detail.assignment}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Q{index + 1}: {detail.question}
                    </p>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-800 dark:text-gray-200">
                        <span className="font-semibold">Your answer: </span>
                        <span
                          className={`font-medium ${
                            detail.isCorrect
                              ? "text-green-700 dark:text-green-400"
                              : "text-red-700 dark:text-red-400"
                          }`}
                        >
                          {detail.userAnswer}
                        </span>
                      </p>
                      {!detail.isCorrect && (
                        <p className="text-gray-800 dark:text-gray-200">
                          <span className="font-semibold">Correct answer: </span>
                          <span className="font-medium text-green-700 dark:text-green-400">
                            {detail.correctAnswer}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-6 h-6" />
            Take Another Quiz
          </button>

          <button
            onClick={() => window.print()}
            className="w-full bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-500 text-gray-800 dark:text-gray-200 py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
}