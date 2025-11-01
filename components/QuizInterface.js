"use client";

import { useState } from 'react';
import { CheckCircle, Trophy, ArrowRight, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile Header - Sticky */}
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-md">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black truncate">
                {studentName}
              </h2>
              <p className="text-sm text-black">
                Q {currentIndex + 1}/{questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-black font-semibold mb-1">Progress</div>
              <div className="text-xl font-bold text-purple-600">
                {answeredCount}/{questions.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Navigator Toggle Button */}
          <button
            onClick={() => setShowNavigator(!showNavigator)}
            className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
          >
            {showNavigator ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            {showNavigator ? 'Close Navigator' : 'Question Navigator'}
          </button>
        </div>
      </div>

      {/* Mobile Navigator Modal */}
      {showNavigator && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowNavigator(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-black text-lg">Jump to Question</h3>
              <button onClick={() => setShowNavigator(false)}>
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            
            {/* Legend */}
            <div className="mb-4 flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-lg bg-purple-600"></div>
                <span className="text-black">Current</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-lg bg-green-500"></div>
                <span className="text-black">Done</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-lg bg-gray-200"></div>
                <span className="text-black">Pending</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = index === currentIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                      isCurrent
                        ? 'bg-purple-600 text-white ring-2 ring-purple-300'
                        : isAnswered
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <div className="font-bold text-black">{questions.length}</div>
                <div className="text-xs text-black">Total</div>
              </div>
              <div>
                <div className="font-bold text-green-600">{answeredCount}</div>
                <div className="text-xs text-black">Done</div>
              </div>
              <div>
                <div className="font-bold text-orange-600">{questions.length - answeredCount}</div>
                <div className="text-xs text-black">Left</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Quiz Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Desktop Header */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-black">Welcome, {studentName}!</h2>
                  <p className="text-black">Question {currentIndex + 1} of {questions.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-black mb-1">Progress</div>
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
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
              <div className="mb-4 md:mb-6">
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                  Question {currentIndex + 1}
                </span>
                <h3 className="text-lg md:text-2xl font-semibold text-black leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2 md:space-y-3">
                {currentQuestion.shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-3 md:p-5 rounded-xl border-2 transition-all ${
                      selectedOption === index
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 active:bg-purple-100'
                    }`}
                  >
                    <div className="flex items-start md:items-center gap-3 md:gap-4">
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0 ${
                        selectedOption === index
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === index && (
                          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-sm md:text-lg text-black font-medium leading-snug">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation - Mobile Optimized */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              {/* Status Indicator */}
              <div className="text-center mb-4">
                {hasAnswered ? (
                  <span className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Answered
                  </span>
                ) : (
                  <span className="text-orange-600 font-semibold text-sm">Not answered</span>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex-1 px-4 py-3 bg-gray-200 text-black rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Submit
                    <Trophy className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!allAnswered && currentIndex === questions.length - 1 && (
                <p className="text-center text-red-500 text-xs md:text-sm mt-3">
                  Please answer all questions before submitting
                </p>
              )}
            </div>
          </div>

          {/* Desktop Question Navigator Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-black mb-4 text-lg">Question Navigator</h3>
              
              {/* Legend */}
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600"></div>
                  <span className="text-black">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500"></div>
                  <span className="text-black">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
                  <span className="text-black">Not Answered</span>
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
                            : 'bg-gray-200 text-black hover:bg-gray-300'
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
                  <span className="text-black">Total Questions:</span>
                  <span className="font-bold text-black">{questions.length}</span>
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