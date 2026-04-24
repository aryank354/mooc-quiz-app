"use client";

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import QuizInterface from '@/components/QuizInterface';
import ResultPage from '@/components/ResultPage';
import { ecologyQuestions, oopsQuestions } from '@/data/questions';
import { selectRandomQuestions, shuffleOptions } from '@/utils/quizLogic';

export default function Home() {
  const [stage, setStage] = useState('landing');
  const [activeSubject, setActiveSubject] = useState('ecology');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  /**
   * onStart(subject, mode, questionCount, selectedWeek)
   * mode          → 'standard' | 'custom' | 'full' | 'week-wise'
   * questionCount → number for 'standard'/'custom', null for 'full'/'week-wise'
   * selectedWeek  → number representing the specific week to practice
   */
  const handleStart = (subject, mode, questionCount, selectedWeek) => {
    setActiveSubject(subject);

    let activeDatabase = subject === 'ecology' ? ecologyQuestions : oopsQuestions;

    // Filter by week if week-wise mode is selected
    if (mode === 'week-wise' && selectedWeek !== null) {
      activeDatabase = activeDatabase.filter(q => q.week === selectedWeek);
    }

    // Determine how many questions to pull
    const count =
      (mode === 'full' || mode === 'week-wise')
        ? activeDatabase.length                          // all (or all in a week)
        : Math.min(questionCount ?? 50, activeDatabase.length); // custom or standard

    const selectedQuestions = selectRandomQuestions(activeDatabase, count);
    const questionsWithShuffledOptions = selectedQuestions.map(shuffleOptions);

    setQuizQuestions(questionsWithShuffledOptions);
    setStage('quiz');
  };

  const handleQuizComplete = (userAnswers) => {
    setAnswers(userAnswers);
    setStage('result');
  };

  const handleRestart = () => {
    setStage('landing');
    setQuizQuestions([]);
    setAnswers({});
  };

  return (
    <>
      {stage === 'landing' && <LandingPage onStart={handleStart} />}
      {stage === 'quiz' && (
        <QuizInterface
          subjectTheme={activeSubject}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      )}
      {stage === 'result' && (
        <ResultPage
          subjectTheme={activeSubject}
          questions={quizQuestions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}