"use client"

import { useState, useEffect } from "react"
import Header from "./components/header"
import Hero from "./components/hero"
import About from "./components/about"
import Education from "./components/education"
import Experience from "./components/experience"
import Community from "./components/community"
import Projects from "./components/projects"
import CodingStats from "./components/coding-stats"
import Testimonials from "./components/testimonials"
import Contact from "./components/contact"
import Footer from "./components/footer"
import MatrixBackground from "./components/matrix-background"
import EnhancedTerminal from "./components/enhanced-terminal"
import ApiStatusIndicator from "./components/api-status-indicator"
import DebugPanel from "./components/debug-panel"
import UsernameConfig from "./components/username-config"

export default function Portfolio() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    // Easter egg: Konami code or specific key combination
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "T") {
        setShowTerminal(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const playSound = (type: "click" | "hover" | "success") => {
    if (!audioEnabled) return
    // Audio feedback would be implemented here
    console.log(`Playing ${type} sound`)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-x-hidden">
      <MatrixBackground />

      <div className="relative z-10">
        <Header audioEnabled={audioEnabled} setAudioEnabled={setAudioEnabled} playSound={playSound} />
        <Hero playSound={playSound} />
        <About />
        <Education />
        <Experience />
        <Community />
        <Projects playSound={playSound} />
        <CodingStats id="code" />
        <Testimonials />
        <Contact playSound={playSound} />
        <Footer playSound={playSound} />
        <ApiStatusIndicator />
        <UsernameConfig />
        <DebugPanel />
      </div>

      {showTerminal && <EnhancedTerminal onClose={() => setShowTerminal(false)} />}
    </div>
  )
}
