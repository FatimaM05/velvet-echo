"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, HeartPulse } from "lucide-react";

export default function MoodInput({ onSubmit }) {
  const [mood, setMood] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim()) {
      onSubmit(mood);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto flex flex-col items-center gap-6"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <HeartPulse className="w-16 h-16 text-neon-pink animate-pulse drop-shadow-[0_0_15px_rgba(255,78,193,0.8)]" />
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple text-shadow-pink leading-tight">
          How are you feeling right now?
        </h2>
        <p>Sit for a moment. Let your thoughts rest among quiet stars.</p>
        <p className="text-gray-200 text-lg font-medium">Don't hold back. Just type it out.</p>
      </div>

      <div className="relative w-full group">
        <textarea
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="I'm feeling a bit overwhelmed and lonely today..."
          className="w-full h-40 px-6 py-5 bg-white/5 border-2 border-neon-purple/50 rounded-3xl 
          focus:outline-none focus:border-neon-pink focus:shadow-neon transition-all resize-none
          text-white placeholder:text-gray-400/60 backdrop-blur-xl shadow-lg
          text-lg font-input font-medium leading-relaxed"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!mood.trim()}
          className="absolute right-4 bottom-4 p-4 bg-gradient-to-br from-neon-pink to-neon-purple 
          rounded-2xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed
          shadow-[0_0_20px_rgba(255,78,193,0.5)] hover:shadow-[0_0_30px_rgba(255,78,193,0.9)] 
          transition-all duration-300 group-focus-within:animate-pulse"
        >
          <Send className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.form>
  );
}
