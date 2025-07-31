"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Shield, Lock } from "lucide-react"

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      message:
        "Saadan's leadership in the Computer Science Society has been exceptional. His ability to organize events and bring students together is remarkable.",
      author: "Dr. Sarah Johnson",
      role: "Faculty Advisor",
      company: "University of Adelaide",
      encrypted: "U2FhZGFuJ3MgbGVhZGVyc2hpcCBpbiB0aGUgQ29tcHV0ZXI=",
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      message:
        "Working with Saadan on competitive programming has been inspiring. His problem-solving approach and mentoring skills are outstanding.",
      author: "Alex Chen",
      role: "Programming Club Member",
      company: "University of Adelaide",
      encrypted: "V29ya2luZyB3aXRoIFNhYWRhbiBvbiBjb21wZXRpdGl2ZQ==",
      timestamp: "2024-02-20T14:45:00Z",
    },
    {
      id: 3,
      message:
        "Saadan's technical expertise and collaborative spirit make him an invaluable team member. His contributions to our projects have been significant.",
      author: "Emily Rodriguez",
      role: "Project Team Lead",
      company: "Tech Innovation Hub",
      encrypted: "U2FhZGFuJ3MgdGVjaG5pY2FsIGV4cGVydGlzZSBhbmQ=",
      timestamp: "2024-03-10T09:15:00Z",
    },
    {
      id: 4,
      message:
        "His dedication to open source and teaching others about collaborative development has positively impacted our entire community.",
      author: "Michael Park",
      role: "Senior Developer",
      company: "Open Source Community",
      encrypted: "SGlzIGRlZGljYXRpb24gdG8gb3BlbiBzb3VyY2U=",
      timestamp: "2024-04-05T16:20:00Z",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Intercepted Messages</span>
          </h2>
          <p className="text-gray-400">
            <span className="text-green-400">$</span> decrypt testimonials.enc
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-4"></div>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="text-green-400" size={20} />
                <span className="text-green-400 font-mono text-sm">ENCRYPTED_MESSAGE.txt</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Lock size={14} />
                <span>DECRYPTED</span>
              </div>
            </div>

            {/* Encrypted Preview */}
            <div className="bg-gray-800/50 border border-gray-700 rounded p-3 mb-4 font-mono text-xs">
              <div className="text-gray-500 mb-1">// Encrypted content:</div>
              <div className="text-red-400 break-all">{currentTestimonial.encrypted}</div>
            </div>

            {/* Decrypted Message */}
            <div className="bg-black/30 border border-green-400/20 rounded p-6 mb-6">
              <div className="text-green-400 text-sm mb-2 font-mono">// Decrypted message:</div>
              <blockquote className="text-lg text-white leading-relaxed italic">
                "{currentTestimonial.message}"
              </blockquote>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">{currentTestimonial.author}</div>
                <div className="text-green-400 text-sm">
                  {currentTestimonial.role} at {currentTestimonial.company}
                </div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {new Date(currentTestimonial.timestamp).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 bg-gray-800 border border-green-400/30 rounded-lg text-green-400 hover:border-green-400/50 hover:bg-gray-700 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-green-400" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 bg-gray-800 border border-green-400/30 rounded-lg text-green-400 hover:border-green-400/50 hover:bg-gray-700 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
