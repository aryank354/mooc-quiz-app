"use client";

import { useState } from 'react';
import { BookOpen, Trophy, Clock, ArrowRight, Linkedin, Github } from 'lucide-react';
import { validateName } from '@/utils/quizLogic';

export default function LandingPage({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // TODO: Replace with your actual details
  const developerInfo = {
    name: "Aryan Kanojia",
    linkedin: "https://linkedin.com/in/aryank354",
    github: "https://github.com/aryank354"
  };

  const handleStart = () => {
    const validation = validateName(name);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    
    onStart(name.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Wildlife Ecology Mock Test
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Test Your Knowledge
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>50 Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Random Selection</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Your full name"
              className="w-full px-6 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all placeholder:text-gray-400"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3"
          >
            Start Quiz
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-3">Quiz Instructions:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ 50 randomly selected questions from the Week 1 to Week 12 assignments (Latest 2025)</li>
            <li>✓ Answer options are shuffled for each question</li>
            <li>✓ Click on an option to select your answer</li>
            <li>✓ Navigate using the Previous/Next buttons</li>
            <li>✓ View your final score and review your answers at the end</li>
            <li>✓ If you find this helpful, feel free to connect with me!</li>

          </ul>
        </div>

        {/* Developer Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-3">
            Developed with 💜 by <span className="font-bold text-gray-800">{developerInfo.name}</span>
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={developerInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a
              href={developerInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all transform hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}