"use client"

import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users } from "lucide-react"

export default function Education() {
  const education = [
    {
      id: 1,
      institution: "The University of Adelaide",
      degree: "Bachelor of Electrical & Electronic Engineering + Bachelor of Math & Computer Science",
      period: "2025 - 2029 (Expected)",
      location: "Adelaide, Australia",
      gpa: "Current Student",
      status: "current",
      description:
        "Pursuing a comprehensive dual degree with focus on electrical engineering principles, software engineering, artificial intelligence, and algorithm design.",
      coursework: [
        "Object Oriented Programming",
        "Mathematics 1A & 1B",
        "Analog and Digital Electronics",
        "MATLAB and C Programming",
      ],
      achievements: ["Recently commenced studies", "High school ATAR: 99.45"],
      projects: ["Traffic Flow Simulation System", "AI-Powered Flappy Bird with Genetic Algorithms"],
      icon: "🎓",
      color: "border-blue-400/30 hover:border-blue-400/50",
    },
    {
      id: 2,
      institution: "Norwood International High School",
      degree: "High School Diploma",
      period: "2020 - 2024",
      location: "Adelaide, Australia",
      gpa: "ATAR: 99.45",
      status: "completed",
      description:
        "Completed high school with exceptional performance in mathematics, physics, and computer science subjects.",
      coursework: ["Specialist Mathematics", "Mathematical Methods", "Digital Technology", "English", "Physics"],
      achievements: [
        "ATAR Score: 99.45 (Top 0.55%)",
        "Excellence in Mathematics and Sciences",
        "Digital Technology Award",
      ],
      projects: ["High School Programming Projects", "Mathematics Competition Participation"],
      icon: "📚",
      color: "border-green-400/30 hover:border-green-400/50",
    },
  ]

  const certifications = [
    {
      name: "High School Diploma",
      issuer: "Norwood International High School",
      date: "2024",
      status: "Completed",
    },
    {
      name: "Certificate III in Business",
      issuer: "Queensford College",
      date: "2023",
      status: "Completed",
    },
    {
      name: "University Admission",
      issuer: "University of Adelaide",
      date: "2025",
      status: "Current",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "text-green-400"
      case "completed":
        return "text-blue-400"
      case "In Progress":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <section id="education" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Academic Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            <span className="text-green-400">$</span> cat /var/log/education.log
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-4"></div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8 mb-16">
          {education.map((edu) => (
            <div
              key={edu.id}
              className={`group bg-gray-900/50 border ${edu.color} rounded-lg p-8 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105`}
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{edu.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.institution}</h3>
                    <p className="text-xl text-green-400 font-semibold mb-1">{edu.degree}</p>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 lg:text-right">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar size={14} className="mr-1" />
                    {edu.period}
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <MapPin size={14} className="mr-1" />
                    {edu.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <GraduationCap size={14} className="mr-1" />
                    <span className={`font-semibold ${getStatusColor(edu.status)}`}>{edu.gpa}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">{edu.description}</p>

              {/* Grid Layout for Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Coursework */}
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                    <BookOpen size={16} className="mr-2" />
                    Key Coursework:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {edu.coursework.map((course, i) => (
                      <div key={i} className="text-sm text-gray-300 flex items-start">
                        <span className="text-green-400 mr-2">▸</span>
                        {course}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                    <Award size={16} className="mr-2" />
                    Achievements:
                  </h4>
                  <div className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <div key={i} className="text-sm text-gray-300 flex items-start">
                        <span className="text-yellow-400 mr-2">★</span>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Academic Projects */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                  <Users size={16} className="mr-2" />
                  Notable Projects:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {edu.projects.map((project, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-md font-mono">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <span className="text-green-400">$</span> ls ~/certifications/
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-black/30 border border-green-400/20 rounded-lg p-4 hover:border-green-400/40 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <h4 className="text-white font-semibold text-sm mb-2">{cert.name}</h4>
                  <p className="text-gray-400 text-xs mb-2">{cert.issuer}</p>
                  <div className="flex items-center justify-center space-x-2 text-xs">
                    <span className="text-gray-400">{cert.date}</span>
                    <span className={`font-semibold ${getStatusColor(cert.status)}`}>{cert.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Stats */}
        <div className="mt-12 bg-gray-900/50 border border-green-400/30 rounded-lg p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            <span className="text-green-400">$</span> academic --stats
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">99.45</div>
              <div className="text-sm text-gray-400">ATAR Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">5+</div>
              <div className="text-sm text-gray-400">Subjects Studied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">3</div>
              <div className="text-sm text-gray-400">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">2029</div>
              <div className="text-sm text-gray-400">Expected Graduation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
