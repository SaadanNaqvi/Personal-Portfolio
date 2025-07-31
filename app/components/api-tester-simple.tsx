"use client"

import { useState } from "react"
import { Play, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function SimpleApiTester() {
  const [results, setResults] = useState<Record<string, any>>({})
  const [testing, setTesting] = useState(false)

  const testAllAPIs = async () => {
    setTesting(true)
    setResults({})

    const usernames = {
      github: "SaadanNaqvi", // Replace with your actual username
      leetcode: "Saadan_Naqvi", // Replace with your actual username
      codeforces: "Saadan", // Replace with your actual handle
    }

    // Test GitHub
    try {
      const response = await fetch(`https://api.github.com/users/${usernames.github}`)
      const data = await response.json()
      setResults((prev) => ({
        ...prev,
        github: {
          success: response.ok,
          status: response.status,
          data: response.ok
            ? {
                login: data.login,
                public_repos: data.public_repos,
                followers: data.followers,
              }
            : data.message,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        github: { success: false, error: error.message },
      }))
    }

    // Test LeetCode
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${usernames.leetcode}`)
      const data = await response.json()
      setResults((prev) => ({
        ...prev,
        leetcode: {
          success: response.ok && !data.errors,
          status: response.status,
          data: response.ok
            ? {
                totalSolved: data.totalSolved,
                easySolved: data.easySolved,
                mediumSolved: data.mediumSolved,
                hardSolved: data.hardSolved,
              }
            : data,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        leetcode: { success: false, error: error.message },
      }))
    }

    // Test Codeforces
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${usernames.codeforces}`)
      const data = await response.json()
      setResults((prev) => ({
        ...prev,
        codeforces: {
          success: data.status === "OK",
          status: data.status,
          data:
            data.status === "OK"
              ? {
                  handle: data.result[0].handle,
                  rating: data.result[0].rating,
                  rank: data.result[0].rank,
                }
              : data.comment,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        codeforces: { success: false, error: error.message },
      }))
    }

    setTesting(false)
  }

  const getStatusIcon = (result: any) => {
    if (!result) return <AlertTriangle className="text-gray-400" size={16} />
    if (result.success) return <CheckCircle className="text-green-400" size={16} />
    return <XCircle className="text-red-400" size={16} />
  }

  return (
    <div className="fixed top-32 right-4 bg-gray-900/95 border border-cyan-400/30 rounded-lg p-4 backdrop-blur-sm z-40 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-cyan-400 font-bold">API Tester</h3>
        <button
          onClick={testAllAPIs}
          disabled={testing}
          className="flex items-center space-x-2 px-3 py-1 bg-cyan-600 text-white rounded text-sm hover:bg-cyan-700 disabled:opacity-50"
        >
          <Play size={14} />
          <span>{testing ? "Testing..." : "Test All"}</span>
        </button>
      </div>

      <div className="space-y-3">
        {["github", "leetcode", "codeforces"].map((platform) => (
          <div key={platform} className="flex items-center justify-between p-2 bg-black/30 rounded">
            <div className="flex items-center space-x-2">
              {getStatusIcon(results[platform])}
              <span className="text-white capitalize">{platform}</span>
            </div>
            <div className="text-xs text-gray-400">
              {results[platform] ? (results[platform].success ? "✅ Working" : "❌ Failed") : "⏳ Waiting"}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(results).length > 0 && (
        <div className="mt-4 p-2 bg-black/50 rounded max-h-40 overflow-y-auto">
          <h4 className="text-xs text-gray-400 mb-2">Detailed Results:</h4>
          <pre className="text-xs text-gray-300 whitespace-pre-wrap">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
