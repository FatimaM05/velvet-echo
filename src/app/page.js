"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoBG from "@/components/VideoBG";
import MoodInput from "@/components/MoodInput";
import EmotionalResponse from "@/components/EmotionalResponse";
import Navigation from "@/components/Navigation";

// ── Loading screen ────────────────────────────────────────────────────────────
function LoadingState() {
  const messages = [
    "Reading between your words…",
    "Sensing the emotional undertone…",
    "Finding the right language…",
    "Almost there…",
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  // cycle message every 2.2s
  useEffect(() => {
    const t = setInterval(
      () => setMsgIndex((i) => (i + 1) % messages.length),
      2200
    );
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8"
    >
      {/* Pulsing orb */}
      <div className="relative w-24 h-24">
        {/* Outer rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.5 + ring * 0.3], opacity: [0.4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: ring * 0.4,
              ease: "easeOut",
            }}
            style={{
              border: "1px solid rgba(161,78,255,0.5)",
            }}
          />
        ))}
        {/* Core */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(161,78,255,0.3), rgba(255,78,193,0.3))",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 0 40px rgba(161,78,255,0.3), inset 0 0 20px rgba(255,78,193,0.1)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 4C16 4 6 10 6 18C6 22.4 10.8 26 16 26C21.2 26 26 22.4 26 18C26 10 16 4 16 4Z"
              fill="url(#load-grad)"
              opacity="0.9"
            />
            <defs>
              <linearGradient
                id="load-grad"
                x1="6"
                y1="4"
                x2="26"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#c084fc" />
                <stop offset="1" stopColor="#ff4ec1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Cycling message */}
      <div className="h-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45 }}
            className="text-white/50 text-base font-light tracking-wide text-center"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Error display ─────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-8 max-w-md w-full text-center flex flex-col gap-4"
    >
      <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center"
        style={{ background: "rgba(255,90,90,0.15)", border: "1px solid rgba(255,90,90,0.25)" }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3L16 15H2L9 3Z" stroke="rgba(255,120,120,0.8)" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M9 8v3M9 13v.5" stroke="rgba(255,120,120,0.8)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-white/60 text-sm font-light leading-relaxed">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2 rounded-xl text-sm font-medium text-white/70
          transition-all hover:text-white"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        Try again
      </button>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [responseData, setResponseData] = useState(null);
  const [currentMood, setCurrentMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Derived emotion state for background
  const emotionState = responseData?.analysis?.emotionState ?? "default";

  // ── API call ──
  const callAPI = useCallback(async (moodText) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: moodText }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResponseData(data);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Something interrupted the connection. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = (mood) => {
    setCurrentMood(mood);
    callAPI(mood);
  };

  const handleReset = () => {
    setCurrentMood("");
    setResponseData(null);
    setError(null);
  };

  const handleRegenerate = () => {
    if (currentMood) callAPI(currentMood);
  };

  const showInput = !isLoading && !responseData && !error;
  const showResponse = !isLoading && !!responseData && !error;
  const showError = !isLoading && !!error;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-10">
      {/* ── Cinematic video + ambient background ── */}
      <VideoBG emotionState={emotionState} />

      {/* ── Content layer ── */}
      <div className="w-full max-w-2xl mx-auto z-10 flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          {/* Input */}
          {showInput && (
            <motion.div key="input" className="w-full flex justify-center">
              <MoodInput onSubmit={handleSubmit} />
            </motion.div>
          )}

          {/* Loading */}
          {isLoading && (
            <motion.div key="loading" className="w-full flex justify-center py-16">
              <LoadingState />
            </motion.div>
          )}

          {/* Error */}
          {showError && (
            <motion.div key="error" className="w-full flex justify-center">
              <ErrorState
                message={error}
                onRetry={() => {
                  setError(null);
                  if (currentMood) callAPI(currentMood);
                  else handleReset();
                }}
              />
            </motion.div>
          )}

          {/* Response */}
          {showResponse && (
            <motion.div
              key="response"
              className="w-full flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmotionalResponse data={responseData} />
              <Navigation
                onReset={handleReset}
                onRegenerate={handleRegenerate}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
