"use client";

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import QuizInterface from '@/components/QuizInterface';
import ResultPage from '@/components/ResultPage';
import { ecologyQuestions, oopsQuestions } from '@/data/questions';
import { selectRandomQuestions, shuffleOptions } from '@/utils/quizLogic';

export default function Home() {
  const [stage, setStage] = useState('landing');
  const [studentName, setStudentName] = useState('');
  const [activeSubject, setActiveSubject] = useState('ecology');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  /**
   * onStart(name, subject, mode, questionCount)
   *  mode          → 'standard' | 'custom' | 'full'
   *  questionCount → number for 'standard'/'custom', null for 'full' (means all)
   */
  const handleStart = (name, subject, mode, questionCount) => {
    setStudentName(name);
    setActiveSubject(subject);

    const activeDatabase = subject === 'ecology' ? ecologyQuestions : oopsQuestions;

    // Determine how many questions to pull
    const count =
      mode === 'full'
        ? activeDatabase.length                          // all
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
    setStudentName('');
    setQuizQuestions([]);
    setAnswers({});
  };

  return (
    <>
      {stage === 'landing' && <LandingPage onStart={handleStart} />}
      {stage === 'quiz' && (
        <QuizInterface
          studentName={studentName}
          subjectTheme={activeSubject}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      )}
      {stage === 'result' && (
        <ResultPage
          studentName={studentName}
          subjectTheme={activeSubject}
          questions={quizQuestions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
