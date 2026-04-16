"use client";

import { motion } from "framer-motion";

export default function Navigation({ onReset, onRegenerate, isLoading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
      className="flex items-center gap-3"
    >
      {/* New Session button */}
      <NavButton
        id="nav-new-session"
        onClick={onReset}
        disabled={isLoading}
        icon={
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2 7.5H13M8 3L13 7.5L8 12" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
              transform="rotate(180 7.5 7.5)" />
          </svg>
        }
        label="New Session"
        variant="ghost"
      />

      {/* Divider */}
      <div className="w-px h-6 rounded-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }}
      />

      {/* Reflect Again button */}
      <NavButton
        id="nav-reflect-again"
        onClick={onRegenerate}
        disabled={isLoading}
        icon={
          <motion.svg
            width="15" height="15" viewBox="0 0 15 15" fill="none"
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={isLoading ? { duration: 1.2, repeat: Infinity, ease: "linear" } : {}}
          >
            <path
              d="M7.5 2.5C5 2.5 2.5 4.5 2.5 7.5C2.5 10.5 5 12.5 7.5 12.5C10 12.5 12.5 10.5 12.5 7.5"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
            />
            <path d="M12.5 4.5V7.5H9.5" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        }
        label={isLoading ? "Reflecting…" : "Reflect Again"}
        variant="accent"
        isLoading={isLoading}
      />
    </motion.div>
  );
}

function NavButton({ id, onClick, disabled, icon, label, variant, isLoading }) {
  const isAccent = variant === "accent";

  return (
    <motion.button
      id={id}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onKeyDown={(e) => e.key === "Enter" && !disabled && onClick?.()}
      className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-medium
        transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
      style={
        isAccent
          ? {
              background:
                "linear-gradient(135deg, rgba(161,78,255,0.75), rgba(255,78,193,0.75))",
              boxShadow:
                "0 0 20px rgba(161,78,255,0.25), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.95)",
            }
          : {
              background: "rgba(255,255,255,0.05)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }
      }
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
