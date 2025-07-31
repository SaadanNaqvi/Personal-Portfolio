"use client"

import { Users, Award, Calendar, MapPin, Rocket, Code2, Trophy, Zap } from "lucide-react"

export default function Community() {
  const involvements = [
    {
      id: 1,
      organization: "University of Adelaide Rover Team",
      role: "Team Member",
      period: "2025 - Present",
      location: "University of Adelaide",
      description:
        "Contributing to the development of autonomous rover systems for Mars exploration competitions, focusing on software development and system integration.",
      achievements: [
        "Developing autonomous navigation algorithms",
        "Contributing to rover control systems",
        "Participating in international rover competitions",
        "Collaborating on interdisciplinary engineering projects",
      ],
      skills: ["Robotics", "Autonomous Systems", "C++", "ROS", "Computer Vision", "Team Collaboration"],
      icon: "🚀",
      color: "border-red-400/30 hover:border-red-400/50",
      iconComponent: Rocket,
    },
    {
      id: 2,
      organization: "University of Adelaide Competitive Programming Club",
      role: "First Year Representative",
      period: "2025 - Present",
      location: "University of Adelaide",
      description:
        "Representing first-year students in the competitive programming club, organizing training sessions, and promoting algorithmic problem-solving among new students.",
      achievements: [
        "Organizing weekly coding practice sessions",
        "Mentoring new students in competitive programming",
        "Coordinating participation in programming contests",
        "Building bridges between first-years and senior members",
      ],
      skills: ["Algorithms", "Data Structures", "Leadership", "Mentoring", "Contest Organization"],
      icon: "🏆",
      color: "border-green-400/30 hover:border-green-400/50",
      iconComponent: Trophy,
    },
    {
      id: 3,
      organization: "Computer Science Society",
      role: "Active Member",
      period: "2025 - Present",
      location: "University of Adelaide",
      description:
        "Participating in computer science society activities, attending workshops, and contributing to the tech community within the university.",
      achievements: [
        "Attending technical workshops and seminars",
        "Networking with industry professionals",
        "Participating in hackathons and coding events",
        "Contributing to society initiatives",
      ],
      skills: ["Networking", "Technical Learning", "Event Participation", "Community Building"],
      icon: "💻",
      color: "border-blue-400/30 hover:border-blue-400/50",
      iconComponent: Code2,
    },
    {
      id: 4,
      organization: "Engineering Student Society",
      role: "Member",
      period: "2025 - Present",
      location: "University of Adelaide",
      description:
        "Engaging with the broader engineering community, participating in interdisciplinary projects and professional development activities.",
      achievements: [
        "Participating in engineering design challenges",
        "Attending professional development workshops",
        "Collaborating on cross-disciplinary projects",
        "Building connections across engineering fields",
      ],
      skills: ["Engineering Design", "Professional Development", "Cross-disciplinary Collaboration"],
      icon: "⚡",
      color: "border-purple-400/30 hover:border-purple-400/50",
      iconComponent: Zap,
    },
  ]

  return (
    <section id="community" className="py-20 px-4 bg-gray-900/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Community Involvement</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            <span className="text-green-400">$</span> grep -r "leadership" ~/university/clubs/
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {involvements.map((involvement) => {
            const IconComponent = involvement.iconComponent
            return (
              <div
                key={involvement.id}
                className={`group bg-gray-900/50 border ${involvement.color} rounded-lg p-6 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{involvement.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{involvement.organization}</h3>
                      <p className="text-green-400 font-semibold">{involvement.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-400 mb-1">
                      <Calendar size={14} className="mr-1" />
                      {involvement.period}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin size={14} className="mr-1" />
                      {involvement.location}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">{involvement.description}</p>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                    <Award size={14} className="mr-1" />
                    Key Contributions:
                  </h4>
                  <ul className="space-y-1">
                    {involvement.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start">
                        <span className="text-green-400 mr-2">▸</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
                    <Users size={14} className="mr-1" />
                    Skills Developed:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {involvement.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded-md font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 bg-gray-900/50 border border-green-400/30 rounded-lg p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            <span className="text-green-400">$</span> community --stats
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">4+</div>
              <div className="text-sm text-gray-400">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">50+</div>
              <div className="text-sm text-gray-400">Students Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">10+</div>
              <div className="text-sm text-gray-400">Events Participated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">1</div>
              <div className="text-sm text-gray-400">Year Active</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gray-900/50 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm inline-block">
            <h4 className="text-lg font-bold text-white mb-2">Want to collaborate?</h4>
            <p className="text-gray-400 text-sm mb-4">
              Always interested in joining new initiatives and contributing to the university community.
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold rounded-md hover:shadow-lg hover:shadow-green-400/50 transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
