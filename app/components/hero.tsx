"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Code, Zap, Target } from "lucide-react"

interface HeroProps {
  playSound: (type: "click" | "hover" | "success") => void
}

export default function Hero({ playSound }: HeroProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "> console.log('Hello, World!');"

  const scrollToProjects = () => {
    const element = document.querySelector("#projects")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    playSound("click")
  }

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    playSound("click")
  }

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative">
      <div className="text-center max-w-5xl mx-auto">
        {/* Animated Name */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-green-400 font-mono">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <div className="text-2xl md:text-3xl font-bold text-white mb-4">
            Hi, I'm <span className="text-cyan-400">Saadan Naqvi</span>
          </div>
        </div>

        {/* Profession */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-cyan-400 mb-4">
            <span className="text-green-400">[</span>
            Electrical & Electronic Engineering and Computer Science Student @ The University of Adelaide
            <span className="text-green-400">]</span>
          </p>
        </div>

        {/* Skills Highlight */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-gray-900/30 border border-green-400/20 rounded-lg p-4 backdrop-blur-sm">
            <Code className="text-green-400 mx-auto mb-2" size={24} />
            <div className="text-white font-semibold">Software Development</div>
            <div className="text-gray-400 text-sm">Python, C++, MATLAB</div>
          </div>
          <div className="bg-gray-900/30 border border-cyan-400/20 rounded-lg p-4 backdrop-blur-sm">
            <Target className="text-cyan-400 mx-auto mb-2" size={24} />
            <div className="text-white font-semibold">Problem Solving</div>
            <div className="text-gray-400 text-sm">LeetCode, Codeforces</div>
          </div>
          <div className="bg-gray-900/30 border border-purple-400/20 rounded-lg p-4 backdrop-blur-sm">
            <Zap className="text-purple-400 mx-auto mb-2" size={24} />
            <div className="text-white font-semibold">Engineering</div>
            <div className="text-gray-400 text-sm">Electronics, Robotics</div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mb-12">
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-green-400">$</span> Pursuing dual degrees in Electrical Engineering and Computer
            Science.
            <br />
            <span className="text-green-400">$</span> Passionate about robotics, algorithms, and innovative engineering
            solutions.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            className="group relative px-8 py-4 bg-transparent border-2 border-green-400 text-green-400 font-bold rounded-md hover:bg-green-400 hover:text-black transition-all duration-300 overflow-hidden"
            onMouseEnter={() => playSound("hover")}
            onClick={scrollToProjects}
          >
            <span className="relative z-10 flex items-center justify-center">
              View My Work
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </span>
            <div className="absolute inset-0 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>

          <button
            className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold rounded-md hover:bg-cyan-400 hover:text-black transition-all duration-300 overflow-hidden"
            onMouseEnter={() => playSound("hover")}
            onClick={scrollToContact}
          >
            <span className="relative z-10 flex items-center justify-center">
              Get In Touch
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </span>
            <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">500+</div>
            <div className="text-sm text-gray-400">Problems Solved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">10+</div>
            <div className="text-sm text-gray-400">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">99.45</div>
            <div className="text-sm text-gray-400">ATAR Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">∞</div>
            <div className="text-sm text-gray-400">Coffee Cups</div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          <span className="text-green-400"># Tip:</span> Press Ctrl+Shift+T for terminal access
        </p>

        {/* Scrolling Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
