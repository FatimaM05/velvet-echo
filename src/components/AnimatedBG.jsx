"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBG() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setMounted(true);
    
    // Generate particles only on the client side to avoid layout shift and SSR mismatches
    const generatedParticles = Array.from({ length: 30 }).map(() => ({
      xPos: Math.random() * window.innerWidth,
      yPos: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      isPink: Math.random() > 0.5,
    }));
    
    setParticles(generatedParticles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0b001a]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(161,78,255,0.1)_0%,transparent_100%)] opacity-50 mix-blend-screen" />
      
      {/* Floating Stars / Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.isPink ? "#ff4ec1" : "#a14eff",
            boxShadow: p.isPink ? "0 0 10px #ff4ec1" : "0 0 10px #a14eff",
          }}
          initial={{
            left: p.xPos,
            top: p.yPos,
            opacity: 0,
          }}
          animate={{
            y: [0, -300],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, Math.random() * 0.8 + 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}

      {/* Neon Pink Blob 1 */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-neon-pink/30 rounded-full blur-[80px]"
      />

      {/* Neon Purple Blob 2 */}
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 150, -80, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-neon-purple/30 rounded-full blur-[100px]"
      />

      {/* Smaller Neon Pink Blob 3 */}
      <motion.div
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -200, 100, 0],
          scale: [1, 1.5, 0.8, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[30%] w-[250px] h-[250px] bg-neon-pink/20 rounded-full blur-[60px]"
      />
    </div>
  );
}
