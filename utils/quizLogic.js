// Utility functions for quiz logic

/**
 * Shuffles an array randomly using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Selects random questions from the database
 * @param {Array} questions - All available questions
 * @param {number} count - Number of questions to select
 * @returns {Array} - Selected questions
 */
export const selectRandomQuestions = (questions, count) => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
};

/**
 * Shuffles the options of a question and tracks the correct answer
 * @param {Object} question - Question object
 * @returns {Object} - Question with shuffled options
 */
export const shuffleOptions = (question) => {
  const optionsWithIndex = question.options.map((opt, idx) => ({ 
    text: opt, 
    originalIndex: idx 
  }));
  
  const shuffled = shuffleArray(optionsWithIndex);
  
  return {
    ...question,
    shuffledOptions: shuffled.map(o => o.text),
    correctAnswerIndex: shuffled.findIndex(o => o.originalIndex === question.correctAnswer)
  };
};

/**
 * Calculates quiz results
 * @param {Array} questions - Array of questions
 * @param {Object} answers - User's answers (questionId: answerIndex)
 * @returns {Object} - Results object with score and details
 */
export const calculateResults = (questions, answers) => {
  let correct = 0;
  
  const details = questions.map(q => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswerIndex;
    if (isCorrect) correct++;
    
    return {
      questionId: q.id,
      question: q.question,
      userAnswer: userAnswer !== undefined ? q.shuffledOptions[userAnswer] : 'Not answered',
      correctAnswer: q.shuffledOptions[q.correctAnswerIndex],
      isCorrect,
      answered: userAnswer !== undefined
    };
  });
  
  const total = questions.length;
  const incorrect = total - correct;
  const percentage = ((correct / total) * 100).toFixed(2);
  
  return {
    correct,
    incorrect,
    total,
    percentage,
    passed: percentage >= 50,
    details
  };
};

/**
 * Validates student name
 * @param {string} name - Student name
 * @returns {Object} - Validation result
 */
export const validateName = (name) => {
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: 'Please enter your name (at least 2 characters)'
    };
  }
  
  if (trimmedName.length > 50) {
    return {
      isValid: false,
      error: 'Name is too long (maximum 50 characters)'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};