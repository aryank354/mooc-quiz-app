"use client";

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import QuizInterface from '@/components/QuizInterface';
import ResultPage from '@/components/ResultPage';
import { ecologyQuestions, oopsQuestions } from '@/data/questions';
import { selectRandomQuestions, shuffleOptions, getMistakes } from '@/utils/quizLogic';

export default function Home() {
  const [stage, setStage] = useState('landing');
  const [activeSubject, setActiveSubject] = useState('oops');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [isTimedMode, setIsTimedMode] = useState(false);

  const handleStart = (subject, mode, questionCount, selectedWeek, isTimed) => {
    setActiveSubject(subject);
    setIsTimedMode(isTimed);
    setFlaggedQuestions(new Set());

    let activeDatabase = subject === 'ecology' ? ecologyQuestions : oopsQuestions;

    // Handle Smart Study (Weaknesses)
    if (mode === 'smart-study') {
      const mistakeIds = getMistakes(subject);
      if (mistakeIds.length === 0) {
        alert("You have no recorded mistakes for this subject yet! Play standard mode first.");
        return;
      }
      activeDatabase = activeDatabase.filter(q => mistakeIds.includes(q.id));
    }

    // Filter by week
    if (mode === 'week-wise' && selectedWeek !== null) {
      activeDatabase = activeDatabase.filter(q => q.week === selectedWeek);
    }

    const count = (mode === 'full' || mode === 'week-wise' || mode === 'smart-study')
        ? activeDatabase.length 
        : Math.min(questionCount ?? 50, activeDatabase.length);

    const selectedQuestions = selectRandomQuestions(activeDatabase, count);
    const questionsWithShuffledOptions = selectedQuestions.map(shuffleOptions);

    setQuizQuestions(questionsWithShuffledOptions);
    setStage('quiz');
  };

  const handleQuizComplete = (userAnswers, flags) => {
    setAnswers(userAnswers);
    setFlaggedQuestions(flags);
    setStage('result');
  };

  const handleRestart = () => {
    setStage('landing');
    setQuizQuestions([]);
    setAnswers({});
    setFlaggedQuestions(new Set());
  };

  return (
    <>
      {stage === 'landing' && <LandingPage onStart={handleStart} />}
      {stage === 'quiz' && (
        <QuizInterface
          subjectTheme={activeSubject}
          questions={quizQuestions}
          isTimed={isTimedMode}
          onComplete={handleQuizComplete}
          onExit={handleRestart}
        />
      )}
      {stage === 'result' && (
        <ResultPage
          subjectTheme={activeSubject}
          questions={quizQuestions}
          answers={answers}
          flagged={flaggedQuestions}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}