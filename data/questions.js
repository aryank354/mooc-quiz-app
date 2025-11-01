// Sample questions database - Replace with your actual MOOC questions
// Add at least 50+ questions for random selection

export const questionsDatabase = [
  {
    id: 1,
    question: "What is the primary purpose of React?",
    options: ["Database management", "Building user interfaces", "Server-side rendering", "Network protocols"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which hook is used for side effects in React?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What does JSX stand for?",
    options: ["Java Syntax Extension", "JavaScript XML", "JSON Syntax", "JavaScript Extension"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is the virtual DOM?",
    options: ["A programming language", "A lightweight copy of the actual DOM", "A database", "A server"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which method is used to update state in class components?",
    options: ["this.state", "this.setState", "this.updateState", "this.changeState"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is a React component?",
    options: ["A database table", "A reusable piece of UI", "A styling framework", "A server endpoint"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What is the purpose of props in React?",
    options: ["To style components", "To pass data between components", "To manage global state", "To handle routing"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "What does npm stand for?",
    options: ["Node Package Manager", "New Programming Method", "Network Protocol Manager", "Node Program Module"],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Character", "Number"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "What is the purpose of useCallback hook?",
    options: ["To fetch data", "To memoize functions", "To update state", "To handle events"],
    correctAnswer: 1
  },
  // Add more questions here - duplicating for demo (total 50+)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i + 11,
    question: `Sample MOOC Question ${i + 11}: What is the correct approach for this scenario?`,
    options: [
      `Option A - First approach for question ${i + 11}`,
      `Option B - Second approach for question ${i + 11}`,
      `Option C - Third approach for question ${i + 11}`,
      `Option D - Fourth approach for question ${i + 11}`
    ],
    correctAnswer: Math.floor(Math.random() * 4)
  }))
];

// Instructions for adding your questions:
// 1. Replace the sample questions with your actual MOOC questions
// 2. Each question should have:
//    - id: unique number
//    - question: the question text
//    - options: array of 4 options
//    - correctAnswer: index (0-3) of the correct answer
// 3. Add as many questions as you want (minimum 50 for best experience)