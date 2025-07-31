"use client"

import type React from "react"

import { useState } from "react"
import { Send, Terminal, CheckCircle } from "lucide-react"

interface ContactProps {
  playSound: (type: "click" | "hover" | "success") => void
}

export default function Contact({ playSound }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "> Secure communication channel initialized...",
    "> Encryption protocols active",
    "> Ready to receive transmission",
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Add terminal feedback
    if (value) {
      setTerminalOutput((prev) => [...prev.slice(-2), `> Field '${name}' updated: ${value.length} characters`])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    playSound("click")

    setTerminalOutput((prev) => [
      ...prev,
      "> Initiating secure transmission...",
      "> Encrypting message payload...",
      "> Establishing connection to server...",
    ])

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      playSound("success")
      setTerminalOutput((prev) => [
        ...prev,
        "> Message transmitted successfully!",
        "> Connection secured and closed",
        "> Response expected within 24 hours",
      ])

      // Reset form
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setStatus("idle")
        setTerminalOutput(["> System reset complete", "> Ready for new transmission"])
      }, 3000)
    }, 2000)
  }

  return (
    <section id="contact" className="py-20 px-4 bg-gray-900/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Secure Access Terminal</span>
          </h2>
          <p className="text-gray-400">
            <span className="text-green-400">$</span> ./contact --establish-connection
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-6">
              <Terminal className="text-green-400" size={20} />
              <span className="text-green-400 font-mono">secure_contact_form.exe</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2">--name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-green-400/30 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-green-400 text-sm font-mono mb-2">--email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-green-400/30 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-green-400 text-sm font-mono mb-2">--subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-green-400/30 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-colors"
                  placeholder="Message subject"
                  required
                />
              </div>

              <div>
                <label className="block text-green-400 text-sm font-mono mb-2">--message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full bg-black/50 border border-green-400/30 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none transition-colors resize-none"
                  placeholder="Enter your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold py-3 px-6 rounded-md hover:shadow-lg hover:shadow-green-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                onMouseEnter={() => playSound("hover")}
              >
                {status === "sending" ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Transmitting...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Terminal Output */}
          <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono">terminal_output.log</span>
            </div>

            <div className="space-y-2 font-mono text-sm h-64 overflow-y-auto">
              {terminalOutput.map((line, index) => (
                <div key={index} className="text-green-400">
                  {line}
                </div>
              ))}
              <div className="text-green-400 animate-pulse">_</div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm inline-block">
            <h3 className="text-lg font-bold text-white mb-4">Alternative Communication Channels</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-400">Email:</span>
                <div className="text-white font-mono">saadanaqvi07@gmail.com</div>
              </div>
              <div>
                <span className="text-green-400">Response Time:</span>
                <div className="text-white">{"< 24 hours"}</div>
              </div>
              <div>
                <span className="text-green-400">Timezone:</span>
                <div className="text-white">PKT (UTC+5)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
