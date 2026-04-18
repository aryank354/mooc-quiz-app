"use client";

import { useState } from 'react';
import { BookOpen, Trophy, Clock, ArrowRight, Linkedin, Github, Code } from 'lucide-react';
import { validateName } from '@/utils/quizLogic';



export default function LandingPage({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('ecology');
  const [mode, setMode] = useState('standard'); // 'standard' (50 Qs) or 'full' (All Qs)

  const handleStart = () => {
    const validation = validateName(name);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    // Pass the selected mode to the parent component
    onStart(name.trim(), subject, mode);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
      subject === 'ecology' 
        ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600' 
        : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600'
    }`}>
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-[1.02] transition-transform duration-300">
        
        {/* Subject Selection */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <button onClick={() => setSubject('ecology')} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${subject === 'ecology' ? 'bg-green-500 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>🌿 Wildlife Ecology</button>
          <button onClick={() => setSubject('oops')} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${subject === 'oops' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}><Code className="w-5 h-5" /> OOPs Practice</button>
        </div>

        {/* Mode Selection (Standard vs Marathon) */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button onClick={() => setMode('standard')} className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm ${mode === 'standard' ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            ⏱️ Standard Mock (50 Qs)
          </button>
          <button onClick={() => setMode('full')} className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-sm ${mode === 'full' ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            🔥 Marathon (All Qs)
          </button>
        </div>

        <div className="text-center mb-8">
          <div className={`inline-block p-4 rounded-full mb-4 ${subject === 'ecology' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}>
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{subject === 'ecology' ? 'Wildlife Ecology' : 'OOPs Concepts'}</h1>
          <p className="text-xl text-gray-600 mb-2">Test Your Knowledge</p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{mode === 'full' ? 'Every Single Question' : 'Up to 50 Questions'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Randomized Order</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              onKeyPress={handleKeyPress}
              placeholder="Your full name"
              className={`w-full px-6 py-4 text-lg text-gray-800 border-2 border-gray-300 rounded-xl outline-none transition-all placeholder:text-gray-400 ${subject === 'ecology' ? 'focus:border-green-500 focus:ring-4 focus:ring-green-200' : 'focus:border-blue-500 focus:ring-4 focus:ring-blue-200'}`}
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={handleStart}
            className={`w-full text-white py-4 px-8 rounded-xl font-bold text-lg transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3 ${subject === 'ecology' ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
          >
            Start {mode === 'full' ? 'Marathon' : 'Quiz'} <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}