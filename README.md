# 🌿 Ecology & Evolution MOOC Quiz App

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**An interactive quiz application for NPTEL Ecology & Evolution Course (2025)**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Question Database](#question-database)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

This is a comprehensive quiz application built for students taking the **NPTEL Ecology & Evolution** course. The app helps students practice and prepare for their exams with a database of **130+ questions** covering all topics from **Week 0 to Week 12**.

### Why This App?

- 📚 **Comprehensive Coverage**: All 13 weeks of course material
- 🎲 **Random Selection**: Every quiz attempt uses different questions
- 🔀 **Shuffled Options**: Prevents answer pattern memorization
- 📊 **Detailed Analytics**: Track your performance week-by-week
- 💯 **Instant Feedback**: See correct answers immediately after submission
- 🎨 **Beautiful UI**: Clean, modern, and responsive design

---

## ✨ Features

### 🎮 Core Features

- ✅ **130+ Questions** from NPTEL 2025 course
- ✅ **Random 50 Questions** per quiz attempt
- ✅ **Shuffled Answer Options** for better learning
- ✅ **Question Navigator** to jump between questions
- ✅ **Progress Tracking** with visual indicators
- ✅ **Detailed Results** with week/assignment breakdown
- ✅ **Performance Feedback** based on score ranges
- ✅ **Responsive Design** - works on all devices
- ✅ **Print Results** functionality

### 📊 Score Performance Messages

| Score Range | Message |
|-------------|---------|
| 90-100% | 🏆 Outstanding! You've mastered the concepts! |
| 70-89% | 🎯 Great job! You have strong understanding! |
| 50-69% | 👍 Good effort! Review the topics you missed. |
| 0-49% | 📖 Keep studying! Review all the materials. |

---

## 📸 Screenshots

### Landing Page
<div align="center">
<img src="screenshots/landing.png" alt="Landing Page" width="600"/>
</div>

### Quiz Interface
<div align="center">
<img src="screenshots/quiz.png" alt="Quiz Interface" width="600"/>
</div>

### Results Page
<div align="center">
<img src="screenshots/results.png" alt="Results Page" width="600"/>
</div>

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0** - React framework with App Router
- **React 19.2** - UI library
- **Tailwind CSS 4.0** - Utility-first CSS framework

### Libraries
- **lucide-react** - Beautiful icons
- **React Hooks** - State management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 🚀 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Step-by-Step Guide

1. **Clone the repository**
```bash
git clone https://github.com/aryank354/mooc-quiz-app.git
cd mooc-quiz-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:3000
```

---

## 💻 Usage

### Taking a Quiz

1. **Enter your name** on the landing page
2. Click **"Start Quiz"** button
3. **Answer 50 random questions** from the database
4. Use **Previous/Next** buttons to navigate
5. Use **Question Navigator** to jump to specific questions
6. Click **"Submit Quiz"** when all questions are answered
7. View your **detailed results** with correct answers

### Question Navigator

- **Purple** = Current question
- **Green** = Answered questions
- **Gray** = Not answered yet

### Results Page

- View your **score percentage**
- See **correct vs incorrect** count
- Review **all questions** with your answers
- Check **correct answers** for mistakes
- See **week/assignment** for each question
- **Print results** for offline review

---

## 📁 Project Structure

```
mooc-quiz-app/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Main page (stage management)
├── components/
│   ├── LandingPage.js       # Entry page with name input
│   ├── QuizInterface.js     # Quiz taking interface
│   └── ResultPage.js        # Results display
├── data/
│   └── questions.js         # 130+ questions database
├── utils/
│   └── quizLogic.js         # Utility functions
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── next.config.mjs
└── README.md
```

---

## 📚 Question Database

### Structure

Each question follows this format:

```javascript
{
  id: 1,                    // Unique identifier
  week: 0,                  // Week number (0-12)
  assignment: 0,            // Assignment number
  question: "...",          // Question text
  options: [...],           // Array of 4 options
  correctAnswer: 0          // Index of correct answer (0-3)
}
```

### Coverage

| Week | Questions | Topics |
|------|-----------|--------|
| Week 0 | 10 | Introduction & Basics |
| Week 1 | 10 | Ecology Fundamentals |
| Week 2 | 10 | Ecological Structure |
| Week 3 | 10 | Ecological Interactions |
| Week 4 | 10 | Food Chains & Energy |
| Week 5 | 10 | Population Ecology |
| Week 6 | 10 | Community Ecology |
| Week 7 | 10 | Distribution & Abundance |
| Week 8 | 10 | Conservation |
| Week 9 | 10 | Human Ecology |
| Week 10 | 10 | Ecology of Change |
| Week 11 | 10 | Applied Ecology |
| Week 12 | 10 | Revision |
| **Total** | **130** | **All Course Topics** |

### Adding New Questions

To add more questions, edit `data/questions.js`:

```javascript
{
  id: 131,
  week: 5,
  assignment: 5,
  question: "Your question here?",
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  correctAnswer: 2  // Index 0-3
}
```

---

## 🔧 Customization

### Change Quiz Length

Edit `app/page.js`:

```javascript
const selectedQuestions = selectRandomQuestions(questionsDatabase, 50);
// Change 50 to any number
```

### Modify Passing Score

Edit `utils/quizLogic.js`:

```javascript
passed: percentage >= 50,  // Change 50 to your threshold
```

### Update Developer Info

Edit `components/LandingPage.js`:

```javascript
const developerInfo = {
  name: "Your Name",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername"
};
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a new branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Areas for Contribution

- 📝 Add more questions to the database
- 🎨 Improve UI/UX design
- 🐛 Fix bugs and issues
- 📚 Improve documentation
- 🌐 Add internationalization
- 📊 Add more analytics features

---

## 🎓 Educational Use

This app is designed for educational purposes to help students prepare for the NPTEL Ecology & Evolution course. 

### Recommended Study Approach

1. **First Attempt**: Take quiz without preparation to assess baseline
2. **Study**: Review course materials for topics you missed
3. **Practice**: Take multiple quiz attempts with different question sets
4. **Track Progress**: Monitor improvement over time
5. **Focus**: Pay attention to week/assignment areas needing improvement

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Aryan Kanojia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Developer

<div align="center">

### Aryan Kanojia

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/aryank354)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/aryank354)

**Developed with 💜 for NPTEL Students**

</div>

---

## 🙏 Acknowledgments

- **NPTEL** for the comprehensive Ecology & Evolution course
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- All **contributors** who help improve this project

---

## 📞 Support

If you found this helpful, please consider:

- ⭐ **Starring** this repository
- 🐛 **Reporting bugs** via issues
- 💡 **Suggesting features** via issues
- 🤝 **Contributing** to the codebase
- 📢 **Sharing** with fellow students

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/aryank354/mooc-quiz-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/aryank354/mooc-quiz-app?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/aryank354/mooc-quiz-app?style=social)

---

<div align="center">

**Made with ❤️ for Students • By Students**

⭐ Star this repo if it helped you! ⭐

</div>