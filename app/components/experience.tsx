"use client"

import { Calendar, MapPin } from "lucide-react"

export default function Experience() {
  const experiences = [
    {
      id: 1,
      company: "Freelance Tutoring",
      position: "Mathematics & Science Tutor",
      period: "2023 - 2024",
      location: "Adelaide, Australia",
      description:
        "Provided personalized tutoring services to high school students in advanced mathematics and science subjects during final years of high school.",
      achievements: [
        "Helped 15+ students improve their grades significantly",
        "Developed custom learning materials and problem sets",
        "Built strong reputation through word-of-mouth referrals",
        "Managed scheduling and client relationships independently",
      ],
      tech: ["Teaching", "Mathematics", "Physics", "Problem Solving", "Communication", "Time Management"],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-gray-900/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Work Experience</span>
          </h2>
          <p className="text-gray-400">
            <span className="text-green-400">$</span> cat /var/log/work_history.log
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-4"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-cyan-400"></div>

          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative mb-12 last:mb-0">
              {/* Timeline Node */}
              <div className="absolute left-6 w-4 h-4 bg-green-400 rounded-full border-4 border-black"></div>

              {/* Content */}
              <div className="ml-20">
                <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                      <p className="text-green-400 font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex flex-col md:items-end mt-2 md:mt-0">
                      <div className="flex items-center text-sm text-gray-400 mb-1">
                        <Calendar size={14} className="mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin size={14} className="mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start">
                          <span className="text-green-400 mr-2">▸</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-green-400 mb-2">Skills Developed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded-md font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Status */}
        <div className="mt-12 bg-gray-900/50 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            <span className="text-green-400">$</span> current_status --work
          </h3>
          <p className="text-gray-300">
            Currently focused on university studies in Electrical & Electronic Engineering and Computer Science.
            <br />
            <span className="text-green-400">Seeking:</span> Internships and co-op opportunities in engineering and
            technology fields.
          </p>
        </div>
      </div>
    </section>
  )
}
