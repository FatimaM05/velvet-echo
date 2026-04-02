"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBG from "@/components/AnimatedBG";
import MoodInput from "@/components/MoodInput";
import AIStory from "@/components/AIStory";
import Navigation from "@/components/Navigation";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [currentMood, setCurrentMood] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Calls the Next.js API route that handles actual AI generation
  const handleMoodSubmit = async (mood) => {
    setCurrentMood(mood);
    setIsLoading(true);
    setStory("");
    
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood })
      });
      
      const data = await res.json();
      
      if (res.ok && data.story) {
        setStory(data.story);
      } else {
        setStory(data.error || "A cosmic interference blocked my message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStory("Something went wrong, but don't worry, the stars are still shining for you. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentMood("");
    setStory("");
  };

  const handleRegenerate = async () => {
    if (!currentMood) return;
    setIsLoading(true);
    setStory("");
    
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Append a minor prompt iteration to ensure a fresh, alternative response
        body: JSON.stringify({ mood: currentMood + " - please act as if this is the first time I'm telling you this, but give me a fresh, completely different poetic perspective" })
      });
      
      const data = await res.json();
      if (res.ok && data.story) {
        setStory(data.story);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 sm:p-12 font-ui">
      <AnimatedBG mood={currentMood} />

      <div className="w-full z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!story && !isLoading && (
            <motion.div key="input" className="w-full">
              <MoodInput onSubmit={handleMoodSubmit} />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6 mt-16"
            >
              <div className="relative">
                <Loader2 className="w-20 h-20 text-neon-pink animate-spin" />
                <div className="absolute inset-0 bg-neon-purple/30 blur-xl rounded-full" />
              </div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neon-pink text-shadow-purple animate-pulse text-center">
                Weaving your feelings into the stars...
              </p>
            </motion.div>
          )}

          {story && !isLoading && (
            <motion.div key="story" className="w-full flex flex-col items-center gap-8">
              <AIStory story={story} />
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
