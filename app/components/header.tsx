"use client"

import { useState } from "react"
import { Menu, X, Volume2, VolumeX, Download } from "lucide-react"

interface HeaderProps {
  audioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
  playSound: (type: "click" | "hover" | "success") => void
}

export default function Header({ audioEnabled, setAudioEnabled, playSound }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Work", href: "#experience" },
    { name: "Community", href: "#community" },
    { name: "Projects", href: "#projects" },
    { name: "Code", href: "#code" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    playSound("click")
  }

  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/resume.pdf" // You'll need to add your resume.pdf to the public folder
    link.download = "Saadan_Naqvi_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    playSound("success")
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-400/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-green-400 glitch-text" data-text="&lt;SAADAN/&gt;">
              &lt;SAADAN/&gt;
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative text-green-400 hover:text-cyan-400 transition-colors duration-300 group text-sm font-medium px-2 py-1"
                onMouseEnter={() => playSound("hover")}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-cyan-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded"></span>
              </button>
            ))}
          </nav>

          {/* CTA Button & Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-2 text-green-400 hover:text-cyan-400 transition-colors"
            >
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            <button
              onClick={downloadResume}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold rounded-md hover:shadow-lg hover:shadow-green-400/50 transition-all duration-300 text-sm"
              onMouseEnter={() => playSound("hover")}
            >
              <Download size={16} />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="xl:hidden text-green-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden mt-4 pb-4 border-t border-green-400/20">
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href)
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-green-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={downloadResume}
                className="mt-4 flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold rounded-md text-sm w-fit"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
