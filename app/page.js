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

  // Updated handleStart to accept the 'mode' parameter
  const handleStart = (name, subject, mode) => {
    setStudentName(name);
    setActiveSubject(subject);
    
    // Select the correct database
    const activeDatabase = subject === 'ecology' ? ecologyQuestions : oopsQuestions;
    
    // MAGIC HAPPENS HERE: If mode is 'full', grab ALL questions. If 'standard', grab max 50.
    const questionCount = mode === 'full' ? activeDatabase.length : Math.min(50, activeDatabase.length);
    
    const selectedQuestions = selectRandomQuestions(activeDatabase, questionCount);
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