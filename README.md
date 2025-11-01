# 🌿 Wildlife Ecology MOOC Quiz App

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**An interactive quiz application for NPTEL Ecology & Evolution Course (2025)**

🎮 [**Live Demo**](https://mooc-quiz-app.vercel.app/) • 🐛 [**Report Bug**](#) • 💡 [**Request Feature**](#)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Question Database](#question-database)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)
- [Developer](#developer)
- [Acknowledgments](#acknowledgments)
- [Support](#support)

---

## 🎯 About

A comprehensive quiz application designed for students taking the **NPTEL Ecology & Evolution** course.  
It offers **130+ curated questions** from **Week 0 to Week 12**, helping students prepare effectively for exams.

### Why This App?

- 📚 **Covers all 13 weeks** of course material  
- 🎲 **Randomized question sets** for each attempt  
- 🔀 **Shuffled options** to prevent memorization  
- 📊 **Performance analytics** for progress tracking  
- 💯 **Instant feedback** after submission  
- 🎨 **Modern, responsive UI** for seamless experience  

---

## ✨ Features

### 🎮 Core Features

- ✅ 130+ questions from NPTEL 2025  
- ✅ 50 random questions per quiz attempt  
- ✅ Shuffled options each time  
- ✅ Jump between questions easily  
- ✅ Visual progress tracker  
- ✅ Week-wise score analysis  
- ✅ Motivational feedback messages  
- ✅ Works across all devices  
- ✅ Print or download results  

### 📊 Score Feedback Messages

| Score Range | Message |
|--------------|----------|
| 90–100% | 🏆 Outstanding! You've mastered the concepts! |
| 70–89% | 🎯 Great job! You have strong understanding! |
| 50–69% | 👍 Good effort! Review the topics you missed. |
| 0–49% | 📖 Keep studying! Review all the materials. |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0** – App Router architecture  
- **React 19.2** – UI library  
- **Tailwind CSS 4.0** – Modern CSS utility framework  

### Libraries
- **lucide-react** – Icon set  
- **React Hooks** – Efficient state management  

### Dev Tools
- **ESLint** – Code linting  
- **PostCSS** – CSS transformations  

---

## 💻 Usage

1. Enter your name on the landing page  
2. Click **Start Quiz**  
3. Answer **50 random questions**  
4. Use **Previous / Next** buttons to navigate  
5. Submit your quiz for instant results  
6. Review all answers with explanations  
7. Optionally **print or save** results  

### Legend
- 🟣 Current Question  
- 🟢 Answered  
- ⚪ Not answered  

---

## 📁 Project Structure

```
mooc-quiz-app/
├── app/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── LandingPage.js
│   ├── QuizInterface.js
│   └── ResultPage.js
├── data/
│   └── questions.js
├── utils/
│   └── quizLogic.js
├── public/
├── package.json
└── tailwind.config.js
```

---

## 📚 Question Database

Each question follows this structure:

```javascript
{
  id: 1,
  week: 0,
  assignment: 0,
  question: "Example question?",
  options: ["A", "B", "C", "D"],
  correctAnswer: 2
}
```

| Week | Questions | Topics |
|------|------------|--------|
| Week 0–12 | 130 | Full NPTEL coverage |

To add new questions, simply append to `data/questions.js`.

---

## 🔧 Customization

### Change Quiz Length
```javascript
const selectedQuestions = selectRandomQuestions(questionsDatabase, 50);
```

### Modify Passing Score
```javascript
passed: percentage >= 50
```

### Developer Info
```javascript
const developerInfo = {
  name: "Aryan Kanojia",
  linkedin: "https://linkedin.com/in/aryank354",
  github: "https://github.com/aryank354"
};
```

---

## 🤝 Contributing

🎉 **Contributions are highly welcome!**  
If you’re passionate about open-source or want to help students prepare better, join in!

1. Fork the repo  
2. Create a new branch (`feature/AmazingFeature`)  
3. Commit your changes  
4. Push and open a Pull Request  

### You Can Contribute By:
- 🧠 Adding new quiz questions  
- 🎨 Improving UI/UX  
- 🐞 Fixing bugs  
- 📚 Enhancing documentation  
- 🌐 Adding localization  
- 📈 Extending analytics  

---

## 📝 License

Licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Aryan Kanojia
Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

## 👨‍💻 Developer

<div align="center">

### **Aryan Kanojia**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/aryank354)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/aryank354)

💜 **Developed with love for NPTEL Students**  
🔗 [**Try it live here**](https://mooc-quiz-app.vercel.app/)

</div>

---

## 🙏 Acknowledgments

- **NPTEL** for the Ecology & Evolution course  
- **Next.js**, **Tailwind**, and **Lucide** for powering this app  
- All contributors and students who make learning fun 🎓  

---

## 📞 Support

If this project helped you:

- ⭐ Star the repo  
- 🐛 Report bugs  
- 💡 Suggest features  
- 🤝 Contribute  
- 📢 Share it with your batchmates  

---

<div align="center">

**Made with ❤️ for Students • By Students**  
⭐ Star this repo if it helped you! ⭐

</div>
