"use client";

import { motion } from "framer-motion";
import { RotateCcw, Edit3 } from "lucide-react";

export default function Navigation({ onReset, onRegenerate, isLoading }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 100 }}
      className="relative flex items-center gap-6 bg-black/60 
      backdrop-blur-xl px-8 py-4 rounded-full border-2 border-neon-purple/50 shadow-[0_0_20px_rgba(161,78,255,0.4)]"
    >
      <button
        onClick={onReset}
        disabled={isLoading}
        className="flex items-center gap-3 text-lg font-bold text-white hover:text-neon-pink 
        transition-all hover:drop-shadow-[0_0_8px_rgba(255,78,193,0.8)] disabled:opacity-50"
      >
        <Edit3 className="w-6 h-6" />
        New Mood
      </button>
      
      <div className="w-[2px] h-8 bg-gradient-to-b from-neon-pink to-neon-purple rounded-full" />
      
      <button
        onClick={onRegenerate}
        disabled={isLoading}
        className="flex items-center gap-3 text-lg font-bold text-white hover:text-neon-purple 
        transition-all hover:drop-shadow-[0_0_8px_rgba(161,78,255,0.8)] disabled:opacity-50"
      >
        <RotateCcw className={`w-6 h-6 ${isLoading ? "animate-spin text-neon-pink" : ""}`} />
        Refresh Story
      </button>
    </motion.div>
  );
}
