"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Minimize2, Maximize2 } from "lucide-react"

interface TerminalProps {
  onClose: () => void
}

export default function EnhancedTerminal({ onClose }: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "╔══════════════════════════════════════════════════════════════╗",
    "║                   SAADAN NAQVI TERMINAL v3.0                ║",
    "║                     SECURE ACCESS GRANTED                   ║",
    "╚══════════════════════════════════════════════════════════════╝",
    "",
    "🚀 Welcome to the developer console!",
    'Type "help" for available commands or "secret" for hidden features',
    "",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const secretCommands = {
    matrix: () => {
      const chars = "01"
      const lines = Array.from({ length: 10 }, () =>
        Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)]).join(""),
      )
      return ["Entering the Matrix...", "", ...lines, ""]
    },
    hack: () => [
      "Initiating hack sequence...",
      "Scanning network... [████████████████████] 100%",
      "Bypassing firewall... [████████████████████] 100%",
      "Access granted to mainframe... [████████████████████] 100%",
      "💀 SYSTEM COMPROMISED 💀",
      "Just kidding! This is just a portfolio website 😄",
      "",
    ],
    konami: () => [
      "🎮 KONAMI CODE ACTIVATED! 🎮",
      "You found the secret! Here's a bonus:",
      "• 30 extra lives granted",
      "• Unlimited coffee mode enabled",
      "• Debug mode: ON",
      "• Easter egg hunter achievement unlocked! 🥚",
      "",
    ],
  }

  const commands = {
    help: () => [
      "📋 Available Commands:",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "  about       - Display detailed personal information",
      "  skills      - List all technical skills and proficiencies",
      "  projects    - Show featured projects with descriptions",
      "  experience  - Display work history and achievements",
      "  contact     - Show contact information and social links",
      "  stats       - Display coding statistics from various platforms",
      "  resume      - Download resume (PDF format)",
      "  social      - List all social media and professional profiles",
      "  clear       - Clear terminal screen",
      "  exit        - Close terminal window",
      "  whoami      - Display current user information",
      "  date        - Show current date and time",
      "  pwd         - Print working directory",
      "  ls          - List directory contents",
      "  cat         - Display file contents",
      "  sudo        - Execute commands with elevated privileges",
      "  secret      - 🤫 Hidden command for special features",
      "",
      "💡 Pro tip: Use ↑/↓ arrows to navigate command history",
      "",
    ],
    about: () => [
      "👨‍💻 DEVELOPER PROFILE",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Name:           Saadan Naqvi",
      "Role:           Full Stack Developer & Problem Solver",
      "Location:       Pakistan",
      "Experience:     3+ years in software development",
      "Specialization: React, Node.js, Python, Competitive Programming",
      "Education:      Computer Science Student",
      "Languages:      English (Fluent), Urdu (Native)",
      "Status:         🟢 Open to opportunities",
      "Timezone:       PKT (UTC+5)",
      "",
      "🎯 Mission: Building innovative solutions while mastering algorithms",
      "",
    ],
    skills: () => [
      "🛠️ TECHNICAL SKILLS MATRIX",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Frontend Technologies:",
      "  ▸ JavaScript/TypeScript    [███████████████���████] 95%",
      "  ▸ React/Next.js           [████████████████████] 90%",
      "  ▸ Vue.js/Nuxt.js          [██████████████░░░░░░] 75%",
      "  ▸ HTML5/CSS3/SASS         [████████████████████] 95%",
      "  ▸ Tailwind CSS            [████████████████████] 90%",
      "",
      "Backend Technologies:",
      "  ▸ Node.js/Express         [████████████████████] 90%",
      "  ▸ Python/Django/FastAPI   [██████████████████░░] 85%",
      "  ▸ PostgreSQL/MongoDB      [██████████████████░░] 85%",
      "  ▸ GraphQL/REST APIs       [████████████████░░░░] 80%",
      "",
      "DevOps & Cloud:",
      "  ▸ AWS/GCP/Azure           [██████████████░░░░░░] 75%",
      "  ▸ Docker/Kubernetes       [██████████████░░░░░░] 70%",
      "  ▸ CI/CD Pipelines         [████████████████░░░░] 80%",
      "",
    ],
    projects: () => [
      "🚀 FEATURED PROJECTS",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "1. 🧠 Neural Network Visualizer",
      "   Description: Interactive ML visualization tool with real-time training",
      "   Tech Stack:  React, D3.js, TensorFlow.js, WebGL",
      "   Status:      🟢 Active Development",
      "",
      "2. ⛓️ Blockchain Explorer",
      "   Description: Decentralized blockchain explorer with advanced analytics",
      "   Tech Stack:  Next.js, Node.js, MongoDB, Web3.js",
      "   Status:      ✅ Completed",
      "",
      "3. 🤖 AI Code Reviewer",
      "   Description: AI-powered code review tool with security vulnerability detection",
      "   Tech Stack:  Python, OpenAI API, AST, Docker",
      "   Status:      🟢 Active Development",
      "",
      "4. ⚛️ Quantum Simulator",
      "   Description: Quantum computing simulator with visual circuit builder",
      "   Tech Stack:  Rust, WebAssembly, React, Three.js",
      "   Status:      🧪 Experimental",
      "",
    ],
    stats: () => [
      "📊 CODING STATISTICS",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "LeetCode Problems:    847/3000 solved (28.2%)",
      "GitHub Repositories:  42 public repos",
      "Total Commits:        2,847 this year",
      "Codeforces Rating:    1654 (Expert)",
      "Contests Participated: 23",
      "Lines of Code:        500K+ (lifetime)",
      "Coffee Consumed:      ∞ cups ☕",
      "",
    ],
    contact: () => [
      "📞 CONTACT INFORMATION",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "📧 Email:     saadanaqvi07@gmail.com",
      "🐙 GitHub:    github.com/SaadanNaqvi",
      "💼 LinkedIn:  linkedin.com/in/saadan-naqvi",
      "🏆 LeetCode:  leetcode.com/u/Saadan_Naqvi",
      "🌐 Portfolio: saadan-portfolio.dev",
      "",
      "⏰ Response Time: Usually within 24 hours",
      "🕐 Best Time to Reach: 9 AM - 11 PM PKT",
      "",
    ],
    whoami: () => ["saadan"],
    date: () => [new Date().toString()],
    pwd: () => ["/home/saadan/portfolio"],
    ls: () => [
      "total 42",
      "drwxr-xr-x  8 saadan saadan 4096 Dec 15 10:30 projects/",
      "drwxr-xr-x  3 saadan saadan 4096 Dec 15 10:30 skills/",
      "-rw-r--r--  1 saadan saadan 2048 Dec 15 10:30 resume.pdf",
      "-rw-r--r--  1 saadan saadan 1024 Dec 15 10:30 about.txt",
      "-rw-r--r--  1 saadan saadan  512 Dec 15 10:30 contact.txt",
      "",
    ],
    cat: () => ["Usage: cat [filename]", "Available files: resume.pdf, about.txt, contact.txt", ""],
    resume: () => [
      "📄 Downloading resume...",
      "File: saadan_naqvi_resume.pdf",
      "Size: 245 KB",
      "Status: ✅ Download complete!",
      "",
      "💡 Tip: The actual download would start in a real implementation",
      "",
    ],
    social: () => [
      "🌐 SOCIAL MEDIA & PROFESSIONAL PROFILES",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "🐙 GitHub:      github.com/SaadanNaqvi",
      "💼 LinkedIn:    linkedin.com/in/saadan-naqvi",
      "🏆 LeetCode:    leetcode.com/u/Saadan_Naqvi",
      "📧 Email:       saadanaqvi07@gmail.com",
      "⚔️ Codeforces:  codeforces.com/profile/Saadan",
      "📚 Medium:      medium.com/@saadanaqvi",
      "💬 Discord:     saadan#1337",
      "",
    ],
    sudo: () => [
      "🔐 ELEVATED PRIVILEGES REQUESTED",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "[sudo] password for saadan: ",
      "Sorry, try again.",
      "[sudo] password for saadan: ",
      "Sorry, try again.",
      "[sudo] password for saadan: ",
      "sudo: 3 incorrect password attempts",
      "",
      "💡 Hint: The password is 'portfolio123' (just kidding, this is a demo!)",
      "",
    ],
    secret: () => {
      if (!isAuthenticated) {
        return [
          "🔒 ACCESS DENIED",
          "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
          "This command requires special authentication.",
          "Try typing 'konami', 'matrix', or 'hack' for hidden features!",
          "",
        ]
      }
      return [
        "🎉 SECRET COMMANDS UNLOCKED!",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "  matrix  - Enter the Matrix",
        "  hack    - Initiate hack sequence",
        "  konami  - Activate Konami code",
        "",
      ]
    },
    clear: () => {
      setHistory([])
      return []
    },
    exit: () => {
      onClose()
      return []
    },
    ...secretCommands,
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const output = commands[trimmedCmd as keyof typeof commands]

    if (trimmedCmd === "konami" || trimmedCmd === "matrix" || trimmedCmd === "hack") {
      setIsAuthenticated(true)
    }

    if (output) {
      const result = output()
      setHistory((prev) => [...prev, `$ ${cmd}`, ...result])
    } else if (trimmedCmd === "") {
      setHistory((prev) => [...prev, "$"])
    } else {
      setHistory((prev) => [
        ...prev,
        `$ ${cmd}`,
        `❌ Command not found: ${cmd}`,
        'Type "help" for available commands',
        "",
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setCommandHistory((prev) => [...prev, input])
      executeCommand(input)
      setInput("")
      setHistoryIndex(-1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-green-400 rounded-lg w-full max-w-5xl h-[80vh] flex flex-col shadow-2xl shadow-green-400/20">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 border-b border-green-400/30 bg-gray-900/50">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 font-mono text-sm">saadan@portfolio:~$</span>
            {isAuthenticated && <span className="text-cyan-400 text-xs">[AUTHENTICATED]</span>}
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Minimize2 size={16} />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Maximize2 size={16} />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-red-400 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-black/50">
          <div className="space-y-1">
            {history.map((line, index) => (
              <div key={index} className="text-green-400 whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="text-green-400 animate-pulse">_</span>
          </form>
        </div>
      </div>
    </div>
  )
}
