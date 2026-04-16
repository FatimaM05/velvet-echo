"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Emotion → visual config ──────────────────────────────────────────────────
const EMOTION_CONFIG = {
  sadness: {
    videos: ["/videos/sadness_rain.mp4", "/videos/sadness_clouds.mp4"],
    overlayColor: "rgba(5, 10, 30, 0.65)",
    gradientFrom: "#0a1628",
    gradientTo: "#050a14",
    blobA: "rgba(20, 40, 100, 0.35)",
    blobB: "rgba(10, 20, 60, 0.25)",
    particleColor: "#4a7fd4",
    particleGlow: "rgba(74, 127, 212, 0.4)",
  },
  calm: {
    videos: ["/videos/calm_waves.mp4", "/videos/calm_sky.mp4"],
    overlayColor: "rgba(5, 15, 25, 0.6)",
    gradientFrom: "#071520",
    gradientTo: "#030a10",
    blobA: "rgba(0, 80, 100, 0.3)",
    blobB: "rgba(0, 50, 80, 0.2)",
    particleColor: "#7ec8e3",
    particleGlow: "rgba(126, 200, 227, 0.4)",
  },
  anxiety: {
    videos: ["/videos/anxiety_particles.mp4", "/videos/anxiety_abstract.mp4"],
    overlayColor: "rgba(10, 5, 25, 0.68)",
    gradientFrom: "#150a2a",
    gradientTo: "#080312",
    blobA: "rgba(100, 20, 180, 0.3)",
    blobB: "rgba(60, 10, 120, 0.2)",
    particleColor: "#b06aff",
    particleGlow: "rgba(176, 106, 255, 0.5)",
  },
  hope: {
    videos: ["/videos/hope_sunrise.mp4", "/videos/hope_light.mp4"],
    overlayColor: "rgba(15, 8, 5, 0.6)",
    gradientFrom: "#1a0e05",
    gradientTo: "#0d0600",
    blobA: "rgba(200, 100, 20, 0.25)",
    blobB: "rgba(220, 140, 30, 0.2)",
    particleColor: "#ffd97d",
    particleGlow: "rgba(255, 217, 125, 0.5)",
  },
  anger: {
    videos: ["/videos/anger_fire.mp4"],
    overlayColor: "rgba(15, 3, 3, 0.68)",
    gradientFrom: "#1a0505",
    gradientTo: "#0d0202",
    blobA: "rgba(180, 20, 20, 0.3)",
    blobB: "rgba(120, 10, 10, 0.2)",
    particleColor: "#ff5a5a",
    particleGlow: "rgba(255, 90, 90, 0.5)",
  },
  joy: {
    videos: ["/videos/joy_light.mp4"],
    overlayColor: "rgba(8, 5, 20, 0.55)",
    gradientFrom: "#120828",
    gradientTo: "#080412",
    blobA: "rgba(200, 80, 200, 0.25)",
    blobB: "rgba(150, 60, 220, 0.2)",
    particleColor: "#ff9de8",
    particleGlow: "rgba(255, 157, 232, 0.5)",
  },
  default: {
    videos: [],
    overlayColor: "rgba(8, 6, 18, 0.7)",
    gradientFrom: "#0f0620",
    gradientTo: "#080612",
    blobA: "rgba(161, 78, 255, 0.25)",
    blobB: "rgba(255, 78, 193, 0.2)",
    particleColor: "#c084fc",
    particleGlow: "rgba(192, 132, 252, 0.4)",
  },
};

function AmbientCanvas({ config }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 55;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      radius: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const color = config.particleColor; // hex string like "#4a7fd4"

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.004;
        if (p.opacity >= 0.8 || p.opacity <= 0.05) p.opacityDir *= -1;

        // Wrap edges
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Glow halo using globalAlpha
        ctx.save();
        ctx.globalAlpha = p.opacity * 0.3;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Core dot
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, opacity: 0.65 }}
    />
  );
}


// ── Main component ────────────────────────────────────────────────────────────
export default function VideoBG({ emotionState = "default" }) {
  const config = EMOTION_CONFIG[emotionState] || EMOTION_CONFIG.default;
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoIndex] = useState(0);
  const videoSrc = config.videos[videoIndex] || null;

  useEffect(() => {
    setVideoLoaded(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [emotionState, videoSrc]);

  return (
    <>
      {/* ── Gradient base ── */}
      <motion.div
        key={emotionState + "-grad"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="fixed inset-0 -z-20"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${config.blobA} 0%, transparent 55%),
                       radial-gradient(ellipse at 70% 80%, ${config.blobB} 0%, transparent 55%),
                       linear-gradient(160deg, ${config.gradientFrom} 0%, ${config.gradientTo} 100%)`,
        }}
      />

      {/* ── Video layer (hidden fallback if file missing) ── */}
      {videoSrc && (
        <div className="video-bg">
          <video
            ref={videoRef}
            key={emotionState}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            style={{
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 2s ease",
              filter: "brightness(0.28) saturate(1.5)",
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {/* ── Animated blobs ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={emotionState + "-blobs"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
          className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
        >
          {/* Blob A */}
          <motion.div
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.15, 0.92, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: config.blobA }}
          />
          {/* Blob B */}
          <motion.div
            animate={{
              x: [0, -100, 60, 0],
              y: [0, 80, -50, 0],
              scale: [1, 0.85, 1.2, 1],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ background: config.blobB }}
          />
          {/* Blob C - center accent */}
          <motion.div
            animate={{
              scale: [1, 1.3, 0.8, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7 }}
            className="absolute top-[35%] left-[35%] w-[350px] h-[350px] rounded-full blur-[100px]"
            style={{ background: config.blobA }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Canvas particles ── */}
      <AmbientCanvas config={config} />

      {/* ── Dark vignette overlay ── */}
      <div
        className="video-overlay"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 20%, ${config.overlayColor} 100%),
            linear-gradient(to bottom, rgba(8,6,18,0.5) 0%, rgba(8,6,18,0.2) 40%, rgba(8,6,18,0.5) 100%)
          `,
        }}
      />
    </>
  );
}
