"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

interface ApiStatus {
  github: "loading" | "success" | "error" | "idle"
  leetcode: "loading" | "success" | "error" | "idle"
  codeforces: "loading" | "success" | "error" | "idle"
}

export default function ApiStatusIndicator() {
  const [status, setStatus] = useState<ApiStatus>({
    github: "idle",
    leetcode: "idle",
    codeforces: "idle",
  })

  const testApis = async () => {
    setStatus({ github: "loading", leetcode: "loading", codeforces: "loading" })

    // Test GitHub API
    try {
      const githubResponse = await fetch("https://api.github.com/users/octocat")
      setStatus((prev) => ({ ...prev, github: githubResponse.ok ? "success" : "error" }))
    } catch {
      setStatus((prev) => ({ ...prev, github: "error" }))
    }

    // Test LeetCode API
    try {
      const leetcodeResponse = await fetch("https://leetcode-stats-api.herokuapp.com/test")
      setStatus((prev) => ({ ...prev, leetcode: leetcodeResponse.ok ? "success" : "error" }))
    } catch {
      setStatus((prev) => ({ ...prev, leetcode: "error" }))
    }

    // Test Codeforces API
    try {
      const codeforcesResponse = await fetch("https://codeforces.com/api/user.info?handles=tourist")
      const data = await codeforcesResponse.json()
      setStatus((prev) => ({ ...prev, codeforces: data.status === "OK" ? "success" : "error" }))
    } catch {
      setStatus((prev) => ({ ...prev, codeforces: "error" }))
    }
  }

  useEffect(() => {
    testApis()
  }, [])

  const getStatusIcon = (apiStatus: string) => {
    switch (apiStatus) {
      case "loading":
        return <Clock className="animate-spin text-yellow-400" size={16} />
      case "success":
        return <CheckCircle className="text-green-400" size={16} />
      case "error":
        return <XCircle className="text-red-400" size={16} />
      default:
        return <AlertCircle className="text-gray-400" size={16} />
    }
  }

  const getStatusText = (apiStatus: string) => {
    switch (apiStatus) {
      case "loading":
        return "Testing..."
      case "success":
        return "Online"
      case "error":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900/90 border border-green-400/30 rounded-lg p-3 backdrop-blur-sm z-40">
      <h4 className="text-sm font-semibold text-white mb-2">API Status</h4>
      <div className="space-y-1 text-xs">
        <div className="flex items-center justify-between space-x-3">
          <span className="text-gray-300">GitHub:</span>
          <div className="flex items-center space-x-1">
            {getStatusIcon(status.github)}
            <span className="text-gray-300">{getStatusText(status.github)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-3">
          <span className="text-gray-300">LeetCode:</span>
          <div className="flex items-center space-x-1">
            {getStatusIcon(status.leetcode)}
            <span className="text-gray-300">{getStatusText(status.leetcode)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-3">
          <span className="text-gray-300">Codeforces:</span>
          <div className="flex items-center space-x-1">
            {getStatusIcon(status.codeforces)}
            <span className="text-gray-300">{getStatusText(status.codeforces)}</span>
          </div>
        </div>
      </div>
      <button onClick={testApis} className="mt-2 text-xs text-green-400 hover:text-green-300 transition-colors">
        Refresh Status
      </button>
    </div>
  )
}
