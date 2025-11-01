"use client";

import { useState } from 'react';
import { CheckCircle, Trophy, ArrowRight, Circle } from 'lucide-react';

export default function QuizInterface({ studentName, questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const hasAnswered = answers[currentQuestion.id] !== undefined;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex
    });
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
    if (allAnswered) {
      onComplete(answers);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome, {studentName}!</h2>
                  <p className="text-gray-600">Question {currentIndex + 1} of {questions.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Progress</div>
                  <div className="text-2xl font-bold text-purple-600">{answeredCount}/{questions.length}</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Mobile Navigator Toggle */}
              <button
                onClick={() => setShowNavigator(!showNavigator)}
                className="lg:hidden w-full mt-4 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-all"
              >
                {showNavigator ? 'Hide' : 'Show'} Question Navigator
              </button>
            </div>

            {/* Mobile Navigator (Collapsible) */}
            {showNavigator && (
              <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">Jump to Question</h3>
                <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
                  {questions.map((q, index) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = index === currentIndex;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => handleJumpToQuestion(index)}
                        className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                          isCurrent
                            ? 'bg-purple-600 text-white ring-4 ring-purple-300'
                            : isAnswered
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                  Question {currentIndex + 1}
                </span>
                <h3 className="text-2xl font-semibold text-gray-800 leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all transform hover:scale-102 ${
                      selectedOption === index
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedOption === index
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === index && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-lg text-gray-700 font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>

                <div className="text-sm text-gray-600">
                  {hasAnswered ? (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      Answered
                    </span>
                  ) : (
                    <span className="text-orange-600 font-semibold">Not answered</span>
                  )}
                </div>

                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
                  >
                    Submit Quiz
                    <Trophy className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!allAnswered && currentIndex === questions.length - 1 && (
                <p className="text-center text-red-500 text-sm mt-4">
                  Please answer all questions before submitting
                </p>
              )}
            </div>
          </div>

          {/* Desktop Question Navigator Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Question Navigator</h3>
              
              {/* Legend */}
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-5 gap-2 max-h-[calc(100vh-400px)] overflow-y-auto">
                  {questions.map((q, index) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = index === currentIndex;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => handleJumpToQuestion(index)}
                        className={`aspect-square rounded-lg font-semibold text-sm transition-all transform hover:scale-110 ${
                          isCurrent
                            ? 'bg-purple-600 text-white ring-4 ring-purple-300 scale-110'
                            : isAnswered
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title={`Question ${index + 1} - ${isAnswered ? 'Answered' : 'Not Answered'}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-bold text-gray-800">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Answered:</span>
                  <span className="font-bold text-green-600">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-600">Remaining:</span>
                  <span className="font-bold text-orange-600">{questions.length - answeredCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}