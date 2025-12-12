"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false)
  const [secretMessage, setSecretMessage] = useState(`✨
You found a secret!
🎨 Art is magic made visible 🎨

𝗡𝗼𝘄 𝗽𝗹𝗮𝘆𝗶𝗻𝗴:
"The Beatles - Eight Days A Week" 
01:57 ───────●─── 02:44
ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻ ♡`)
  const [activationCount, setActivationCount] = useState(0)
  
  // Custom key sequence (Z, A, H, A, R, A)
  const keySequence = [90, 65, 72, 65, 82, 65]
  const [keyIndex, setKeyIndex] = useState(0)

  useEffect(() => {
    // Function to handle keydown events
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid interfering with input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Reset if the key doesn't match the expected key in the sequence
      if (e.keyCode !== keySequence[keyIndex]) {
        setKeyIndex(0)
        return
      }

      // Move to the next key in the sequence
      const nextIndex = keyIndex + 1

      // If we've completed the sequence, show the Easter egg
      if (nextIndex === keySequence.length) {
        if (activationCount === 1) {
          // Second activation - redirect to YouTube
          window.open("https://youtu.be/kle2xHhRHg4?t=28", "_blank");
        } else {
          // First activation - show the Easter egg
          setIsVisible(true)
          setActivationCount(1)
        }
        setKeyIndex(0)
      } else {
        setKeyIndex(nextIndex)
      }
    }

    // Add event listener
    window.addEventListener("keydown", handleKeyDown)

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [keyIndex, activationCount])

  // Close the Easter egg
  const closeEasterEgg = () => {
    setIsVisible(false)
  }

  const handleButtonClick = () => {
    if (activationCount === 1) {
      // Second activation - redirect to YouTube
      window.open("https://youtu.be/kle2xHhRHg4?t=28", "_blank");
    } else {
      // First activation - show the Easter egg
      setIsVisible(true)
      setActivationCount(1)
    }
  };

  // Reset activation count when the modal is closed
  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setActivationCount(0);
      }, 500);
    }
  }, [isVisible]);

  return (
    <>
      {/* Hidden clickable element in footer */}
      <div
        className="fixed bottom-0 right-0 w-6 h-6 z-50"
        onClick={handleButtonClick}
        style={{ opacity: 0 }}
        title="Easter Egg"
      />
    
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              className="relative max-w-md w-full p-8 rounded-xl bg-zinc-800/90 border-2 border-emerald-500/30"
              style={{
                boxShadow: "0 0 20px rgba(52, 211, 153, 0.3), 0 0 40px rgba(52, 211, 153, 0.1)"
              }}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <button
                onClick={closeEasterEgg}
                className="absolute top-3 right-3 p-2 rounded-full bg-zinc-700/70 text-zinc-300 hover:bg-zinc-600 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center whitespace-pre-line">
                {secretMessage}
                
                <div className="text-xs text-zinc-400 mt-4">
                  Type Z-A-H-A-R-A again to play the song
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
