"use client";

import { useState } from 'react';
import { CheckCircle, Trophy, ArrowRight, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

// ==========================================
// SMART TEXT RENDERER (Detects Code Blocks)
// ==========================================
export const formatQuestionText = (text) => {
  const lines = text.split('\n');
  const elements = [];
  let currentText = [];
  let currentCode = [];
  let inCodeBlock = false;

  // Patterns to detect the start of code and the end of code
  const startCodePatterns = [/^#include/, /^class /, /^public class /, /^int main/, /^try\s*\{/, /^(public|private|protected):/, /^template\s*</, /^std::/, /^deque<int>/];
  const endCodePatterns = [/^What /, /^Which /, /^Identify /, /^How /, /^Select /];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Safety check: Bullet points are text, not code
    if (trimmed.startsWith('•')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        elements.push(
          <div key={`code-${index}`} className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm md:text-base overflow-x-auto mb-5 border border-gray-800 shadow-xl">
            <pre className="m-0"><code>{currentCode.join('\n')}</code></pre>
          </div>
        );
        currentCode = [];
      }
      currentText.push(line);
      return;
    }

    const isCodeStart = startCodePatterns.some(pattern => pattern.test(trimmed)) || (trimmed.includes('{') && !trimmed.includes('What'));
    const isQuestionStart = endCodePatterns.some(pattern => pattern.test(trimmed));

    // Transition from Text -> Code
    if (!inCodeBlock && isCodeStart && trimmed.length > 0) {
      inCodeBlock = true;
      if (currentText.length > 0) {
        elements.push(<p key={`text-${index}`} className="mb-4 whitespace-pre-line font-semibold">{currentText.join('\n')}</p>);
        currentText = [];
      }
    } 
    // Transition from Code -> Text
    else if (inCodeBlock && (isQuestionStart || trimmed === '')) {
      // If we hit an empty line right before a question, or a question directly
      if (isQuestionStart) {
        inCodeBlock = false;
        if (currentCode.length > 0) {
          elements.push(
            <div key={`code-${index}`} className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm md:text-base overflow-x-auto mb-5 border border-gray-800 shadow-xl">
              <pre className="m-0"><code>{currentCode.join('\n')}</code></pre>
            </div>
          );
          currentCode = [];
        }
      }
    }

    if (inCodeBlock) {
      currentCode.push(line);
    } else {
      if (trimmed !== '') currentText.push(line);
    }
  });

  // Flush remaining buffers
  if (currentText.length > 0) {
    elements.push(<p key="text-end" className="mb-0 whitespace-pre-line font-semibold">{currentText.join('\n')}</p>);
  }
  if (currentCode.length > 0) {
    elements.push(
      <div key="code-end" className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl font-mono text-sm md:text-base overflow-x-auto mb-5 border border-gray-800 shadow-xl">
        <pre className="m-0"><code>{currentCode.join('\n')}</code></pre>
      </div>
    );
  }

  return <div className="text-gray-800 text-lg md:text-xl leading-relaxed">{elements}</div>;
};

// ==========================================
// UPDATED QUIZ INTERFACE COMPONENT
// ==========================================
export default function QuizInterface({ studentName, subjectTheme, questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNavigator, setShowNavigator] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const hasAnswered = answers[currentQuestion.id] !== undefined;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  
  const themeColor = subjectTheme === 'ecology' ? 'green' : 'blue';

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

  return (
    <div className={`min-h-screen pb-12 ${subjectTheme === 'ecology' ? 'bg-gradient-to-br from-green-50 to-teal-50' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-md">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-black truncate">{studentName}</h2>
              <p className="text-sm text-gray-600">Q {currentIndex + 1}/{questions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold mb-1">Progress</div>
              <div className={`text-xl font-bold text-${themeColor}-600`}>{answeredCount}/{questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className={`bg-${themeColor}-500 h-2 rounded-full transition-all duration-300`} style={{ width: `${progress}%` }} />
          </div>
          <button
            onClick={() => setShowNavigator(!showNavigator)}
            className={`w-full px-4 py-2.5 bg-${themeColor}-600 text-white rounded-lg font-semibold hover:bg-${themeColor}-700 transition-all flex items-center justify-center gap-2`}
          >
            {showNavigator ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            {showNavigator ? 'Close Navigator' : 'Question Navigator'}
          </button>
        </div>
      </div>

      {/* Mobile Navigator Overlay */}
      {showNavigator && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all" onClick={() => setShowNavigator(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Jump to Question</h3>
              <button onClick={() => setShowNavigator(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all shadow-sm ${
                      index === currentIndex ? `bg-${themeColor}-600 text-white` : isAnswered ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
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
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome, {studentName}!</h2>
                  <p className="text-gray-500 font-medium">Question {currentIndex + 1} of {questions.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Progress</div>
                  <div className={`text-3xl font-black text-${themeColor}-600`}>{answeredCount}/{questions.length}</div>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div className={`bg-${themeColor}-500 h-3 rounded-full transition-all duration-500 ease-out`} style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border border-gray-100">
              <div className="mb-6 md:mb-8">
                <span className={`inline-block px-4 py-1.5 bg-${themeColor}-100 text-${themeColor}-700 rounded-full text-sm font-bold mb-4 tracking-wide shadow-sm`}>
                  Question {currentIndex + 1}
                </span>
                
                {/* SMART RENDERER APPLIED HERE */}
                <div className="mt-2">
                  {formatQuestionText(currentQuestion.question)}
                </div>

              </div>

              {/* Options */}
              <div className="space-y-3 md:space-y-4">
                {currentQuestion.shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 group ${
                      selectedOption === index
                        ? `border-${themeColor}-500 bg-${themeColor}-50 shadow-md transform scale-[1.01]`
                        : `border-gray-200 hover:border-${themeColor}-300 hover:bg-gray-50 hover:shadow-sm`
                    }`}
                  >
                    <div className="flex items-start md:items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0 transition-colors ${
                        selectedOption === index ? `border-${themeColor}-500 bg-${themeColor}-500` : 'border-gray-300 group-hover:border-gray-400'
                      }`}>
                        {selectedOption === index && <div className="w-2.5 h-2.5 bg-white rounded-full animate-in zoom-in" />}
                      </div>
                      <span className={`text-base md:text-lg font-medium leading-snug whitespace-pre-line ${selectedOption === index ? 'text-gray-900' : 'text-gray-700'}`}>
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
              <div className="flex gap-4">
                <button 
                  onClick={handlePrevious} 
                  disabled={currentIndex === 0} 
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Previous</span>
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
                    className={`flex-[2] py-4 bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-600 text-white rounded-xl font-bold hover:from-${themeColor}-600 hover:to-${themeColor}-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                  >
                    <span className="hidden sm:inline">Next Question</span> <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
              {!allAnswered && currentIndex === questions.length - 1 && (
                <div className="text-center mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                    <XCircle className="w-4 h-4" /> Please answer all {questions.length} questions before submitting
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Sidebar Navigator */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-6 text-lg border-b pb-4">Question Navigator</h3>
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
                          ? `bg-${themeColor}-600 text-white scale-110 shadow-lg z-10 ring-2 ring-${themeColor}-300 ring-offset-1` 
                          : isAnswered 
                            ? 'bg-gray-800 text-white hover:bg-gray-700 hover:-translate-y-1' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:-translate-y-1'
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