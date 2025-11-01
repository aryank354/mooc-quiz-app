"use client";

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import QuizInterface from '@/components/QuizInterface';
import ResultPage from '@/components/ResultPage';
import { questionsDatabase } from '@/data/questions';
import { selectRandomQuestions, shuffleOptions } from '@/utils/quizLogic';

export default function Home() {
  const [stage, setStage] = useState('landing'); // landing, quiz, result
  const [studentName, setStudentName] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const handleStart = (name) => {
    setStudentName(name);
    
    // Select 50 random questions and shuffle their options
    const selectedQuestions = selectRandomQuestions(questionsDatabase, 50);
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
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      )}
      
      {stage === 'result' && (
        <ResultPage
          studentName={studentName}
          questions={quizQuestions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}