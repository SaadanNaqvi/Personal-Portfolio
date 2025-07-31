"use client"

import { useState } from "react"
import { ExternalLink, Github, Folder, Terminal } from "lucide-react"

interface ProjectsProps {
  playSound: (type: "click" | "hover" | "success") => void
}

export default function Projects({ playSound }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects = [
    {
      id: 1,
      name: "traffic-flow-simulator",
      type: "simulation",
      description: "Advanced traffic flow simulation system with real-time visualization and optimization algorithms",
      tech: ["Python", "Pygame", "NumPy", "Matplotlib", "Algorithm Design"],
      github: "https://github.com/SaadanNaqvi/Traffic-Flow-Simulator",
      status: "completed",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "flappy-bird-ai-genetic-algorithm",
      type: "ai-ml",
      description: "AI-powered Flappy Bird using genetic algorithms for autonomous gameplay and learning",
      tech: ["Python", "Pygame", "Genetic Algorithms", "Neural Networks", "AI"],
      github: "https://github.com/SaadanNaqvi/Flappy-Bird-AI-Genetic-Algorithm",
      status: "completed",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "portfolio-website",
      type: "web-app",
      description: "Modern cyberpunk-themed portfolio website with interactive terminal and real-time API integration",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React", "API Integration"],
      github: "https://github.com/SaadanNaqvi",
      live: "https://saadan-portfolio.dev",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "competitive-programming-solutions",
      type: "algorithms",
      description: "Collection of optimized solutions for competitive programming problems from various platforms",
      tech: ["C++", "Python", "Data Structures", "Algorithms", "Problem Solving"],
      github: "https://github.com/SaadanNaqvi",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filters = [
    { key: "all", label: "all", count: projects.length },
    { key: "simulation", label: "simulation", count: projects.filter((p) => p.type === "simulation").length },
    { key: "ai-ml", label: "ai/ml", count: projects.filter((p) => p.type === "ai-ml").length },
    { key: "web-app", label: "web-apps", count: projects.filter((p) => p.type === "web-app").length },
    { key: "algorithms", label: "algorithms", count: projects.filter((p) => p.type === "algorithms").length },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.type === activeFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "completed":
        return "text-blue-400"
      case "experimental":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Projects Terminal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            <span className="text-green-400">$</span> ls -la ~/projects/
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-4"></div>
        </div>

        {/* Terminal Filter */}
        <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-4 mb-8 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Terminal size={16} className="text-green-400" />
            <span className="text-green-400 text-sm">saadan@portfolio:~/projects$</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => {
                  setActiveFilter(filter.key)
                  playSound("click")
                }}
                onMouseEnter={() => playSound("hover")}
                className={`px-4 py-2 rounded-md text-sm font-mono transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-green-400 text-black"
                    : "bg-gray-800 text-green-400 hover:bg-gray-700"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-900/50 border border-green-400/30 rounded-lg overflow-hidden backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105"
              onMouseEnter={() => playSound("hover")}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-mono ${getStatusColor(project.status)} bg-black/50`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Folder size={16} className="text-green-400" />
                  <h3 className="text-xl font-bold text-white font-mono">{project.name}</h3>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded-md font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-400 hover:text-white transition-colors"
                    onClick={() => playSound("click")}
                  >
                    <Github size={16} />
                    <span className="text-sm">Source</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors"
                      onClick={() => playSound("click")}
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/SaadanNaqvi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-transparent border-2 border-green-400 text-green-400 font-mono rounded-md hover:bg-green-400 hover:text-black transition-all duration-300"
            onClick={() => playSound("click")}
          >
            <span className="text-green-400">$</span> git clone --all-repos
          </a>
        </div>
      </div>
    </section>
  )
}
