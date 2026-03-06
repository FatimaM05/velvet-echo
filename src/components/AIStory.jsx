"use client";

import { motion } from "framer-motion";

export default function AIStory({ story }) {
  // Split story into paragraphs for staggered animation
  const paragraphs = story.split("\n").filter((p) => p.trim() !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto p-6 sm:p-10 bg-white/5 backdrop-blur-3xl border border-white/10 
      rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.37)] relative overflow-y-auto max-h-[60vh] flex flex-col items-center custom-scrollbar"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-neon-purple/10 pointer-events-none" />
      
      <div className="space-y-5 text-gray-100 text-base sm:text-xl font-medium leading-relaxed tracking-wide text-center relative z-10 font-story">
        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.4 }}
            className={index === 0 ? "text-neon-pink drop-shadow-[0_0_8px_rgba(255,78,193,0.3)] font-semibold text-xl sm:text-2xl" : ""}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
