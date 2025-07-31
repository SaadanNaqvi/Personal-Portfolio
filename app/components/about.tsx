"use client"

import { Code, Database, Globe, Zap } from "lucide-react"

export default function About() {
  const skills = [
    { name: "Python/C++", level: 90, icon: <Code size={20} /> },
    { name: "MATLAB/Electronics", level: 85, icon: <Zap size={20} /> },
    { name: "Problem Solving", level: 95, icon: <Globe size={20} /> },
    { name: "Engineering Design", level: 80, icon: <Database size={20} /> },
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Digital Dossier</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Card */}
          <div className="relative">
            <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-8 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-cyan-400 rounded-full p-1">
                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-4xl">👨‍💻</span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Saadan Naqvi</h3>
                <p className="text-green-400">Electrical & Electronic Engineering and Computer Science Student</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <span className="text-green-400 w-20">Status:</span>
                  <span className="text-white">University Student</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-green-400 w-20">Location:</span>
                  <span className="text-white">Adelaide, Australia</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-green-400 w-20">Focus:</span>
                  <span className="text-white">Engineering & Competitive Programming</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Bio */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                <span className="text-green-400">$</span> cat about.txt
              </h3>
              <div className="bg-gray-900/30 border border-green-400/20 rounded-lg p-6 font-mono text-sm">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-green-400">{">"}</span> Dual degree student passionate about the intersection of
                  electrical engineering and computer science.
                  <br />
                  <span className="text-green-400">{">"}</span> Building innovative solutions through robotics,
                  algorithms, and engineering design.
                  <br />
                  <span className="text-green-400">{">"}</span> Active in university rover team and competitive
                  programming community.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                <span className="text-green-400">$</span> ./skills --list
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">{skill.icon}</span>
                        <span className="text-white font-medium">{skill.name}</span>
                      </div>
                      <span className="text-cyan-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
