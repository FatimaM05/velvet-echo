"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const placeholders = [
  "I've been carrying something heavy lately, and I don't know where to put it...",
  "There's a quiet sadness I can't quite name today...",
  "I feel scattered, like I can't hold a single thought...",
  "Something feels off but I don't know what it is...",
  "I've been overthinking everything and it's exhausting...",
];

export default function MoodInput({ onSubmit }) {
  const [mood, setMood] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef(null);
  const MAX_CHARS = 500;

  // Rotate placeholder text
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 220) + "px";
  }, [mood]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setMood(val);
      setCharCount(val.length);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (mood.trim().length > 0) onSubmit(mood.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = mood.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl mx-auto flex flex-col items-center gap-8"
    >
      {/* ── Header ── */}
      <div className="flex flex-col items-center text-center gap-4">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 120 }}
          className="relative"
        >
          <div
            className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center shadow-glow-purple"
            style={{ perspective: "800px" }}
          >
            <motion.img
              src="/favicon.ico"
              alt="Velvet Echo Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"

              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
          <div className="absolute inset-0 rounded-2xl glow-ring"
            style={{ boxShadow: "0 0 30px rgba(161,78,255,0.4)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <h1 className="text-5xl sm:text-6xl font-light tracking-tight gradient-text mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Velvet Echo
          </h1>
          <p className="text-sm tracking-[0.25em] text-white/30 uppercase font-light">
            Emotional Intelligence
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/50 text-base font-light leading-relaxed max-w-xs"
        >
          A quiet space to be heard. Tell me what you're carrying.
        </motion.p>
      </div>

      {/* ── Input card ── */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div
          className="relative rounded-3xl transition-all duration-500"
          style={{
            background: isFocused
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.03)",
            border: isFocused
              ? "1px solid rgba(161,78,255,0.5)"
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow: isFocused
              ? "0 0 0 4px rgba(161,78,255,0.08), 0 20px 60px rgba(0,0,0,0.4)"
              : "0 8px 32px rgba(0,0,0,0.3)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Animated placeholder */}
          <AnimatePresence mode="wait">
            {!mood && !isFocused && (
              <motion.p
                key={placeholderIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.5 }}
                className="absolute top-5 left-6 right-16 text-white/25 text-base leading-relaxed font-light pointer-events-none select-none"
              >
                {placeholders[placeholderIndex]}
              </motion.p>
            )}
          </AnimatePresence>

          <textarea
            ref={textareaRef}
            id="mood-input"
            value={mood}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-6 pt-5 pb-14 bg-transparent resize-none focus:outline-none
              text-white text-base leading-relaxed font-light tracking-wide
              min-h-[120px] max-h-[220px] overflow-y-auto"
            style={{ caretColor: "rgba(161,78,255,0.9)" }}
          />

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3
            border-t border-white/[0.05]">
            <span className={`text-xs font-light transition-colors ${charCount > MAX_CHARS * 0.85 ? "text-rose-400/70" : "text-white/20"
              }`}>
              {charCount}/{MAX_CHARS}
            </span>

            <div className="flex items-center gap-3">
              <span className="text-white/20 text-xs hidden sm:block">Shift+Enter for new line</span>
              <motion.button
                id="submit-mood-btn"
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.04 } : {}}
                whileTap={canSubmit ? { scale: 0.96 } : {}}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium
                  transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: canSubmit
                    ? "linear-gradient(135deg, rgba(161,78,255,0.8), rgba(255,78,193,0.8))"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: canSubmit
                    ? "0 0 20px rgba(161,78,255,0.3), 0 4px 12px rgba(0,0,0,0.3)"
                    : "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span>Reflect</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.form>

      {/* ── Footer hint ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-white/20 text-xs text-center tracking-wide"
      >
        Your words are held with care. No storage, no judgment.
      </motion.p>
    </motion.div>
  );
}
