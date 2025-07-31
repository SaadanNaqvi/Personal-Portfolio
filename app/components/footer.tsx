"use client"

import { Github, Linkedin, Code, Mail, ExternalLink } from "lucide-react"

interface FooterProps {
  playSound: (type: "click" | "hover" | "success") => void
}

export default function Footer({ playSound }: FooterProps) {
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/SaadanNaqvi", command: "git clone" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/saadan-naqvi/",
      command: "connect --professional",
    },
    { name: "LeetCode", icon: Code, url: "https://leetcode.com/u/Saadan_Naqvi/", command: "solve --problems" },
    { name: "Email", icon: Mail, url: "mailto:saadanaqvi07@gmail.com", command: "send --message" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    playSound("click")
  }

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Saadan_Naqvi_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    playSound("success")
  }

  const quickCommands = [
    { command: "cd ~/about", description: "Learn more about me", action: () => scrollToSection("#about") },
    { command: "ls projects/", description: "View all projects", action: () => scrollToSection("#projects") },
    { command: "cat resume.pdf", description: "Download resume", action: downloadResume },
    { command: "ping contact", description: "Get in touch", action: () => scrollToSection("#contact") },
  ]

  return (
    <footer className="py-12 px-4 border-t border-green-400/20 bg-black/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-green-400 glitch-text" data-text="&lt;SAADAN/&gt;">
                &lt;SAADAN/&gt;
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Electrical & Electronic Engineering and Computer Science student crafting innovative solutions at the
              intersection of engineering and technology.
            </p>
          </div>

          {/* Quick Commands */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              <span className="text-green-400">$</span> Quick Commands
            </h3>
            <div className="space-y-2">
              {quickCommands.map((cmd, index) => (
                <div key={index} className="group">
                  <button
                    className="text-left w-full text-sm font-mono text-green-400 hover:text-cyan-400 transition-colors"
                    onMouseEnter={() => playSound("hover")}
                    onClick={cmd.action}
                  >
                    {cmd.command}
                  </button>
                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{cmd.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              <span className="text-green-400">$</span> Social Networks
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.name === "Email" ? "_self" : "_blank"}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="group flex items-center space-x-2 p-3 bg-gray-900/50 border border-green-400/20 rounded-lg hover:border-green-400/50 hover:bg-gray-800/50 transition-all duration-300"
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("click")}
                >
                  <social.icon size={20} className="text-green-400 group-hover:text-cyan-400 transition-colors" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium">{social.name}</div>
                    <div className="text-xs text-gray-400 font-mono truncate">{social.command}</div>
                  </div>
                  <ExternalLink size={14} className="text-gray-500 group-hover:text-green-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-green-400/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 font-mono mb-4 md:mb-0">
              <span className="text-green-400">©</span> 2025 Saadan Naqvi. All rights reserved.
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="font-mono">
                <span className="text-green-400">Built with:</span> Next.js + Tailwind CSS
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono">
                <span className="text-green-400">Status:</span> Online
              </span>
            </div>
          </div>
        </div>

        {/* Easter Egg Hint */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 font-mono">
            <span className="text-green-400/50"># Easter egg:</span> Try Ctrl+Shift+T for terminal access
          </p>
        </div>
      </div>
    </footer>
  )
}
