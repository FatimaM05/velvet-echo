"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Section configs ───────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "breakdown",
    label: "Emotional Breakdown",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accentColor: "rgba(192, 132, 252, 0.7)",
    glowColor: "rgba(192, 132, 252, 0.15)",
    borderColor: "rgba(192, 132, 252, 0.2)",
  },
  {
    id: "reflection",
    label: "Reflection",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2.5C5 2.5 2.5 5 2.5 8C2.5 11 5 13.5 8 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M8 2.5C11 2.5 13.5 5 13.5 8C13.5 11 11 13.5 8 13.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    accentColor: "rgba(129, 200, 255, 0.7)",
    glowColor: "rgba(129, 200, 255, 0.12)",
    borderColor: "rgba(129, 200, 255, 0.2)",
  },
  {
    id: "reframe",
    label: "Inner Reframe",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8C3 5.24 5.24 3 8 3C9.66 3 11.12 3.8 12 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M13 8C13 10.76 10.76 13 8 13C6.34 13 4.88 12.2 4 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M11 5L12.5 5L12.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 11L3.5 11L3.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accentColor: "rgba(255, 178, 102, 0.7)",
    glowColor: "rgba(255, 178, 102, 0.12)",
    borderColor: "rgba(255, 178, 102, 0.2)",
  },
  {
    id: "insight",
    label: "Insight Layer",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
    accentColor: "rgba(255, 150, 220, 0.7)",
    glowColor: "rgba(255, 150, 220, 0.12)",
    borderColor: "rgba(255, 150, 220, 0.2)",
  },
];

// ── Emotion badge pill ────────────────────────────────────────────────────────
function EmotionPill({ label, dimmed = false }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all ${dimmed ? "text-white/35" : "text-white/70"
        }`}
      style={{
        background: dimmed ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)",
        border: `1px solid ${dimmed ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.12)"}`,
      }}
    >
      {label}
    </span>
  );
}

// ── Intensity bar ─────────────────────────────────────────────────────────────
function IntensityBar({ value }) {
  const pct = Math.min(100, Math.max(0, (value / 10) * 100));
  const color =
    value <= 3 ? "#7ec8e3" : value <= 6 ? "#c084fc" : value <= 8 ? "#ff9de8" : "#ff5a5a";

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs text-white/35 w-16 shrink-0">Intensity</span>
      <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
      <span className="text-xs text-white/40 w-6 text-right">{value}</span>
    </div>
  );
}

// ── Typing text display ───────────────────────────────────────────────────────
function TypingText({ text, delay = 0, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        indexRef.current += 1;
        const slice = text.slice(0, indexRef.current);
        setDisplayed(slice);
        if (indexRef.current >= text.length) {
          clearInterval(intervalRef.current);
          setDone(true);
        }
      }, 18);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return (
    <span className={`${className} ${!done ? "typing-cursor" : ""}`}>
      {displayed}
    </span>
  );
}

// ── Emotional Breakdown panel ─────────────────────────────────────────────────
function BreakdownPanel({ analysis }) {
  if (!analysis) return null;
  const {
    primaryEmotion,
    secondaryEmotions = [],
    intensity = 5,
    tone,
    hiddenIntent,
    cognitiveDistortion,
  } = analysis;

  const pills = [
    { label: tone, dimmed: false },
    { label: hiddenIntent, dimmed: false },
    ...secondaryEmotions.map((e) => ({ label: e, dimmed: true })),
  ].filter((p) => p.label);

  return (
    <div className="flex flex-col gap-4">
      {/* Primary emotion */}
      <div className="flex items-baseline gap-3">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-light capitalize"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #e8d5ff, #ff9fe8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {primaryEmotion}
        </motion.h3>
        <span className="text-white/30 text-sm">primary</span>
      </div>

      {/* Intensity bar */}
      <IntensityBar value={intensity} />

      {/* Emotion pills */}
      <div className="flex flex-wrap gap-2">
        {pills.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
          >
            <EmotionPill label={p.label} dimmed={p.dimmed} />
          </motion.div>
        ))}
      </div>

      {/* Cognitive distortion */}
      {cognitiveDistortion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-2 text-xs text-amber-300/60 mt-1"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0">
            <path d="M6 1L11 10H1L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            <path d="M6 5v2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="leading-relaxed">
            <span className="text-amber-300/80">Pattern detected: </span>
            {cognitiveDistortion}
          </span>
        </motion.div>
      )}
    </div>
  );
}

// ── Section card ──────────────────────────────────────────────────────────────
function SectionCard({ section, children, index, isBreakdown }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.75,
        delay: index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`,
        border: `1px solid ${section.borderColor}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 0 30px ${section.glowColor}`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Glow accent top-left */}
      <div
        className="absolute top-0 left-0 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${section.glowColor} 0%, transparent 70%)`,
          transform: "translate(-30%, -30%)",
        }}
      />

      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-5 py-3.5"
        style={{
          borderBottom: `1px solid ${section.borderColor}`,
          color: section.accentColor,
        }}
      >
        {section.icon}
        <span className="text-xs tracking-[0.18em] uppercase font-medium opacity-90">
          {section.label}
        </span>
      </div>

      {/* Content */}
      <div className={`px-5 ${isBreakdown ? "py-4" : "py-5"}`}>{children}</div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function EmotionalResponse({ data }) {
  const { analysis, reflection, reframe, insight } = data;

  const textSections = [
    { key: "reflection", text: reflection, sectionIndex: 1, delay: 0.6 },
    { key: "reframe", text: reframe, sectionIndex: 2, delay: 2.5 },
    { key: "insight", text: insight, sectionIndex: 3, delay: 4.2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-4 custom-scrollbar"
    >
      {/* ── Logo wordmark ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 justify-center mb-2"
      >
        <div className="w-6 h-6 rounded-lg glass-card flex items-center justify-center"
          style={{ boxShadow: "0 0 12px rgba(161,78,255,0.3)" }}>
          <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C16 4 6 10 6 18C6 22.4 10.8 26 16 26C21.2 26 26 22.4 26 18C26 10 16 4 16 4Z"
              fill="url(#ve2-grad)" />
            <defs>
              <linearGradient id="ve2-grad" x1="6" y1="4" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c084fc" />
                <stop offset="1" stopColor="#ff4ec1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-white/30 text-xs tracking-[0.25em] uppercase font-light">
          Velvet Echo
        </span>
      </motion.div>

      {/* ── Section 1: Emotional Breakdown ── */}
      <SectionCard section={SECTIONS[0]} index={0} isBreakdown>
        <BreakdownPanel analysis={analysis} />
      </SectionCard>

      {/* ── Sections 2–4: Text sections ── */}
      {textSections.map(({ key, text, sectionIndex, delay }) => (
        <SectionCard key={key} section={SECTIONS[sectionIndex]} index={sectionIndex}>
          <p className="text-white/80 text-base font-light leading-[1.85] tracking-wide">
            <TypingText text={text} delay={delay} />
          </p>
        </SectionCard>
      ))}
    </motion.div>
  );
}
