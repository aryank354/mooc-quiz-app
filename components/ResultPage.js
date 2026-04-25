"use client";

import { useEffect, useRef } from "react";
import { Trophy, RotateCcw, CheckCircle, XCircle, Share2, Flag } from "lucide-react";
import { calculateResults, saveResultToHistory } from "@/utils/quizLogic";
import ThemeToggle from "./ThemeToggle";
import html2canvas from "html2canvas";

export default function ResultPage({ subjectTheme, questions, answers, flagged, onRestart }) {
  const resultRef = useRef(null);
  const results = calculateResults(questions, answers);

  // Save to history & update weak points on mount
  useEffect(() => {
    saveResultToHistory(subjectTheme, results.percentage, results.correct, results.total, results.details);
  }, [subjectTheme, results]);

  const handleDownloadImage = async () => {
    if (!resultRef.current) return;
    const canvas = await html2canvas(resultRef.current, { scale: 2, backgroundColor: subjectTheme === 'ecology' ? '#064e3b' : '#1e3a8a' });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `NPTEL_${subjectTheme}_Score.png`;
    link.click();
  };

  const performanceMsg = results.percentage >= 90 ? "Outstanding Mastery!" : results.percentage >= 70 ? "Great Job!" : "Keep Studying!";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <ThemeToggle />

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Scorecard (This part gets exported as an image) */}
        <div ref={resultRef} className="rounded-3xl shadow-2xl p-8 bg-white dark:bg-gray-900 border-4 border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500" />
          
          <Trophy className={`w-20 h-20 mx-auto mb-4 ${results.passed ? 'text-yellow-500' : 'text-gray-400'}`} />
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">{performanceMsg}</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">{subjectTheme === 'ecology' ? 'Wildlife Ecology' : 'OOPs Concepts'} Practice</p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl"><p className="text-3xl font-black text-purple-600 dark:text-purple-400">{results.percentage}%</p><p className="text-sm font-bold text-gray-500">Score</p></div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl"><p className="text-3xl font-black text-green-600 dark:text-green-400">{results.correct}</p><p className="text-sm font-bold text-gray-500">Correct</p></div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl"><p className="text-3xl font-black text-red-600 dark:text-red-400">{results.incorrect}</p><p className="text-sm font-bold text-gray-500">Incorrect</p></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={onRestart} className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-lg flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform">
            <RotateCcw className="w-5 h-5" /> Play Again
          </button>
          <button onClick={handleDownloadImage} className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-black text-lg flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg">
            <Share2 className="w-5 h-5" /> Share Score
          </button>
        </div>

        {/* Detailed Review */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Detailed Review</h2>
          <div className="space-y-4">
            {results.details.map((detail, index) => {
              const isFlagged = flagged.has(detail.questionId);
              return (
                <div key={detail.questionId} className={`p-5 rounded-2xl border-2 ${detail.isCorrect ? "border-green-100 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10" : "border-red-100 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10"} relative`}>
                  
                  {isFlagged && <div className="absolute -top-3 -right-3 bg-orange-100 text-orange-600 p-2 rounded-full shadow-md"><Flag className="w-4 h-4" fill="currentColor"/></div>}
                  
                  <p className="font-bold text-gray-900 dark:text-gray-100 mb-3 pr-6">Q{index + 1}: {detail.question.split('\n')[0]}</p>
                  
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">Your answer: <span className={`font-bold ${detail.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{detail.userAnswer}</span></p>
                    {!detail.isCorrect && <p className="text-gray-700 dark:text-gray-300">Correct answer: <span className="font-bold text-green-600 dark:text-green-400">{detail.correctAnswer}</span></p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}