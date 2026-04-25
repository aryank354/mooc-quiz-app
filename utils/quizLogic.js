export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const selectRandomQuestions = (questions, count) => {
  if (!count || count >= questions.length) return shuffleArray([...questions]);
  return shuffleArray([...questions]).slice(0, count);
};

export const shuffleOptions = (question) => {
  const hasPositionalReference = question.options.some((opt) => {
    const text = opt.toLowerCase();
    return (
      text.includes("all of the above") ||
      text.includes("none of the above") ||
      text.includes("none of these") ||
      text.match(/both\s+[a-z0-9]\s+and\s+[a-z0-9]/i)
    );
  });

  if (hasPositionalReference || question.maintainOrder) {
    return {
      ...question,
      shuffledOptions: [...question.options],
      correctAnswerIndex: question.correctAnswer,
    };
  }

  const optionsWithIndex = question.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
  const shuffled = shuffleArray(optionsWithIndex);

  return {
    ...question,
    shuffledOptions: shuffled.map((o) => o.text),
    correctAnswerIndex: shuffled.findIndex((o) => o.originalIndex === question.correctAnswer),
  };
};

export const calculateResults = (questions, answers) => {
  let correct = 0;
  const details = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswerIndex;
    if (isCorrect) correct++;

    return {
      questionId: q.id,
      week: q.week,
      assignment: q.assignment,
      question: q.question,
      userAnswer: userAnswer !== undefined ? q.shuffledOptions[userAnswer] : "Not answered",
      correctAnswer: q.shuffledOptions[q.correctAnswerIndex],
      isCorrect,
      answered: userAnswer !== undefined,
    };
  });

  const total = questions.length;
  return {
    correct,
    incorrect: total - correct,
    total,
    percentage: ((correct / total) * 100).toFixed(1),
    passed: (correct / total) >= 0.5,
    details,
  };
};

export const getQuestionStats = (questions) => {
  const weekCounts = {};
  questions.forEach((q) => {
    weekCounts[q.week] = (weekCounts[q.week] || 0) + 1;
  });
  return {
    total: questions.length,
    byWeek: weekCounts,
    weeks: Object.keys(weekCounts).sort((a, b) => a - b),
  };
};

// ==========================================
// ADVANCED FEATURES: LOCAL STORAGE LOGIC
// ==========================================

export const saveResultToHistory = (subject, percentage, correct, total, details) => {
  if (typeof window === 'undefined') return;
  
  // 1. Save History
  const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
  history.unshift({ 
    subject, percentage, correct, total, 
    date: new Date().toLocaleDateString() 
  });
  localStorage.setItem('quiz_history', JSON.stringify(history.slice(0, 10))); // Keep last 10

  // 2. Update Weaknesses (Smart Study)
  const mistakes = JSON.parse(localStorage.getItem('quiz_mistakes') || '{}');
  if (!mistakes[subject]) mistakes[subject] = [];
  
  let subjectMistakes = new Set(mistakes[subject]);
  details.forEach(d => {
    if (!d.isCorrect) subjectMistakes.add(d.questionId); // Add wrong answers
    else subjectMistakes.delete(d.questionId);           // Remove if they got it right this time!
  });
  
  mistakes[subject] = Array.from(subjectMistakes);
  localStorage.setItem('quiz_mistakes', JSON.stringify(mistakes));
};

export const getHistory = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('quiz_history') || '[]');
};

export const getMistakes = (subject) => {
  if (typeof window === 'undefined') return [];
  const mistakes = JSON.parse(localStorage.getItem('quiz_mistakes') || '{}');
  return mistakes[subject] || [];
};