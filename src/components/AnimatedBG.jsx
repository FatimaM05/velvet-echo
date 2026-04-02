"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const getMoodType = (text) => {
  if (!text) return "default";
  const t = text.toLowerCase();
  if (t.match(/\b(sad|depressed|down|cry|unhappy|lonely|heartbroken)\b/)) return "sad";
  if (t.match(/\b(happy|joy|glad|excited|great|good|awesome)\b/)) return "happy";
  if (t.match(/\b(angry|mad|furious|rage|annoyed|frustrated)\b/)) return "angry";
  if (t.match(/\b(calm|peace|relax|chill|quiet|zen)\b/)) return "calm";
  return "default";
};

export default function AnimatedBG({ mood = "" }) {
  const [mounted, setMounted] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 1000 });
  const moodType = getMoodType(mood);

  useEffect(() => {
    setMounted(true);
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const bgClasses = {
    default: "bg-[#0b001a]",
    sad: "bg-[#050a19]",
    happy: "bg-[#574964]",
    angry: "bg-[#1a0000]",
    calm: "bg-[#000d1a]"
  };

  const getBackgroundElement = () => {
    switch (moodType) {
      case "sad":
        return <div className="absolute inset-0 bg-gradient-to-b from-[#142350] to-[#050a19] opacity-80" />;
      case "happy":
        return <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,200,100,0.6)_0%,transparent_80%)] opacity-80" />;
      case "angry":
        return (
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,0,0,0.3)_0%,transparent_100%)] opacity-50 mix-blend-screen"
          />
        );
      case "calm":
        return <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,50,100,0.2)_0%,transparent_100%)] opacity-50 mix-blend-screen" />;
      default:
        return <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(161,78,255,0.1)_0%,transparent_100%)] opacity-50 mix-blend-screen" />;
    }
  };

  const renderParticles = () => {
    if (moodType === "sad") {
      // Rain
      return Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={`rain-${moodType}-${i}`}
          className="absolute bg-blue-300 rounded-full opacity-50"
          style={{ width: "2px", height: `${Math.random() * 15 + 10}px` }}
          initial={{ top: -20, left: `${Math.random() * 100}%` }}
          animate={{ top: windowDimensions.height + 20 }}
          transition={{ duration: Math.random() * 2.5 + 2, repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
        />
      ));
    }

    if (moodType === "angry") {
      // Sparks
      return Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`spark-${moodType}-${i}`}
          className="absolute bg-red-400 rounded-full shadow-[0_0_8px_#ff0000]"
          style={{ width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px` }}
          initial={{ top: "100%", left: `${Math.random() * 100}%`, opacity: 1 }}
          animate={{
            top: `${Math.random() * 50}%`,
            opacity: 0,
            left: `${Math.random() * 100}%`
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, repeat: Infinity, ease: "easeOut", delay: Math.random() * 2 }}
        />
      ));
    }

    // Default, Calm, Happy particles
    const particleCount = moodType === "calm" ? 60 : (moodType === "happy" ? 20 : 30);
    const particleColors = {
      calm: ["#ffffff", "#88ccff"],
      happy: ["#ffd700", "#ffaa00"],
      default: ["#ff4ec1", "#a14eff"]
    };
    const colors = particleColors[moodType] || particleColors.default;

    return Array.from({ length: particleCount }).map((_, i) => {
      const isFirstColor = Math.random() > 0.5;
      const color = isFirstColor ? colors[0] : colors[1];
      const size = Math.random() * 4 + 2;
      return (
        <motion.div
          key={`particle-${moodType}-${i}`}
          className="absolute rounded-full"
          style={{ width: `${size}px`, height: `${size}px`, background: color, boxShadow: `0 0 10px ${color}` }}
          initial={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{
            y: moodType === "happy" ? [0, -150] : [0, -300],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, Math.random() * 0.8 + 0.4, 0],
          }}
          transition={{ duration: Math.random() * 15 + (moodType === "calm" ? 20 : 10), repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
        />
      );
    });
  };

  const renderBlobs = () => {
    if (moodType === "sad") return null;

    if (moodType === "happy") {
      return (
        <>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-yellow-400/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-orange-400/20 rounded-full blur-[90px]"
          />
        </>
      );
    }

    if (moodType === "angry") {
      return (
        <motion.div
          animate={{ scale: [1, 1.3, 0.9, 1.1, 1], opacity: [0.4, 0.8, 0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[30%] w-[500px] h-[500px] bg-red-600/30 rounded-full blur-[120px]"
        />
      );
    }

    if (moodType === "calm") {
      return (
        <>
          <motion.div
            animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[15%] w-[450px] h-[450px] bg-blue-400/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[15%] right-[15%] w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]"
          />
        </>
      );
    }

    // Default blobs
    return (
      <>
        <motion.div
          animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-neon-pink/30 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ x: [0, -120, 80, 0], y: [0, 150, -80, 0], scale: [1, 0.8, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-neon-purple/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 200, -100, 0], y: [0, -200, 100, 0], scale: [1, 1.5, 0.8, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[30%] w-[250px] h-[250px] bg-neon-pink/20 rounded-full blur-[60px]"
        />
      </>
    );
  };

  return (
    <motion.div
      className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000 ${bgClasses[moodType]}`}
    >
      {getBackgroundElement()}
      {renderParticles()}
      {renderBlobs()}
    </motion.div>
  );
}
