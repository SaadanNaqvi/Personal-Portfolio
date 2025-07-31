"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Minimize2, Maximize2 } from "lucide-react"

interface TerminalProps {
  onClose: () => void
}

export default function Terminal({ onClose }: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "Welcome to Alex Chen Terminal v2.1.0",
    'Type "help" for available commands',
    "",
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = {
    help: () => [
      "Available commands:",
      "  about     - Display personal information",
      "  skills    - List technical skills",
      "  projects  - Show featured projects",
      "  contact   - Display contact information",
      "  clear     - Clear terminal screen",
      "  exit      - Close terminal",
      "  whoami    - Display current user",
      "  date      - Show current date and time",
      "  pwd       - Print working directory",
      "",
    ],
    about: () => [
      "Alex Chen - Full Stack Developer",
      "Location: San Francisco, CA",
      "Experience: 5+ years",
      "Specialization: React, Node.js, Python",
      "Status: Available for hire",
      "",
    ],
    skills: () => [
      "Technical Skills:",
      "  Frontend: React, Next.js, TypeScript, Tailwind CSS",
      "  Backend: Node.js, Python, PostgreSQL, MongoDB",
      "  Cloud: AWS, Docker, Kubernetes",
      "  Tools: Git, VS Code, Linux",
      "",
    ],
    projects: () => [
      "Featured Projects:",
      "  1. neural-network-visualizer - Interactive ML visualization",
      "  2. blockchain-explorer - Decentralized analytics platform",
      "  3. ai-code-reviewer - AI-powered code analysis tool",
      "  4. quantum-simulator - Quantum computing simulator",
      "",
    ],
    contact: () => [
      "Contact Information:",
      "  Email: alex@portfolio.dev",
      "  GitHub: github.com/alexchen",
      "  LinkedIn: linkedin.com/in/alexchen",
      "  Response time: < 24 hours",
      "",
    ],
    whoami: () => ["alex"],
    date: () => [new Date().toString()],
    pwd: () => ["/home/alex/portfolio"],
    clear: () => {
      setHistory([])
      return []
    },
    exit: () => {
      onClose()
      return []
    },
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const output = commands[trimmedCmd as keyof typeof commands]

    if (output) {
      const result = output()
      setHistory((prev) => [...prev, `$ ${cmd}`, ...result])
    } else if (trimmedCmd === "") {
      setHistory((prev) => [...prev, "$"])
    } else {
      setHistory((prev) => [...prev, `$ ${cmd}`, `Command not found: ${cmd}`, 'Type "help" for available commands', ""])
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-green-400 rounded-lg w-full max-w-4xl h-96 flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-3 border-b border-green-400/30">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 font-mono text-sm">alex@portfolio:~$</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-white">
              <Minimize2 size={16} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Maximize2 size={16} />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-red-400">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
          <div className="space-y-1">
            {history.map((line, index) => (
              <div key={index} className="text-green-400">
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
            />
            <span className="text-green-400 animate-pulse">_</span>
          </form>
        </div>
      </div>
    </div>
  )
}
