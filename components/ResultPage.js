"use client";

import { Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { calculateResults } from '@/utils/quizLogic';

export default function ResultPage({ studentName, questions, answers, onRestart }) {
  const results = calculateResults(questions, answers);

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return { msg: "Outstanding! You've mastered the concepts!", color: "text-green-600" };
    if (percentage >= 70) return { msg: "Great job! You have strong understanding!", color: "text-blue-600" };
    if (percentage >= 50) return { msg: "Good effort! Review the topics you missed.", color: "text-yellow-600" };
    return { msg: "Keep studying! Review all the materials.", color: "text-orange-600" };
  };

  const performance = getPerformanceMessage(parseFloat(results.percentage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Result Header */}
        <div className="rounded-2xl shadow-2xl p-8 mb-6 bg-white border-4 border-gray-200">
          <div className="text-center">
            <div className={`inline-block p-4 rounded-full mb-4 ${
              results.passed 
                ? 'bg-green-100' 
                : 'bg-orange-100'
            }`}>
              {results.passed ? (
                <Trophy className="w-16 h-16 text-green-600" />
              ) : (
                <RotateCcw className="w-16 h-16 text-orange-600" />
              )}
            </div>
            <h1 className="text-4xl font-bold mb-2 text-black">
              {results.passed ? 'Congratulations!' : 'Keep Learning!'}
            </h1>
            <p className="text-xl mb-2 font-semibold text-black">{studentName}</p>
            <p className={`text-lg font-bold mb-6 ${performance.color} bg-gray-100 px-4 py-2 rounded-lg inline-block`}>
              {performance.msg}
            </p>
            
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-purple-100 rounded-xl p-4 border-2 border-purple-200">
                <div className="text-3xl font-bold text-black">{results.percentage}%</div>
                <div className="text-sm font-semibold text-black">Score</div>
              </div>
              <div className="bg-green-100 rounded-xl p-4 border-2 border-green-200">
                <div className="text-3xl font-bold text-black">{results.correct}</div>
                <div className="text-sm font-semibold text-black">Correct</div>
              </div>
              <div className="bg-red-100 rounded-xl p-4 border-2 border-red-200">
                <div className="text-3xl font-bold text-black">{results.incorrect}</div>
                <div className="text-sm font-semibold text-black">Incorrect</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-black mb-4">Detailed Results</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {results.details.map((detail, index) => (
              <div 
                key={detail.questionId}
                className={`p-4 rounded-xl border-2 ${
                  detail.isCorrect 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {detail.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        Week {detail.week} • Assignment {detail.assignment}
                      </span>
                    </div>
                    <p className="font-semibold text-black mb-2">
                      Q{index + 1}: {detail.question}
                    </p>
                    <div className="text-sm space-y-1">
                      <p className="text-black">
                        <span className="font-semibold">Your answer: </span>
                        <span className={`font-medium ${detail.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {detail.userAnswer}
                        </span>
                      </p>
                      {!detail.isCorrect && (
                        <p className="text-black">
                          <span className="font-semibold">Correct answer: </span>
                          <span className="font-medium text-green-700">{detail.correctAnswer}</span>
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
            className="w-full bg-white border-2 border-gray-800 text-gray-800 py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
}