"use client"

import { useState } from "react"
import { Play, CheckCircle, XCircle, Loader } from "lucide-react"

export default function ApiTester() {
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const testGitHubAPI = async () => {
    const username = "SaadanNaqvi" // Replace with your username
    setLoading((prev) => ({ ...prev, github: true }))

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        github: {
          success: response.ok,
          data: response.ok ? data : data.message,
          status: response.status,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        github: {
          success: false,
          data: error.message,
          status: "Network Error",
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, github: false }))
    }
  }

  const testLeetCodeAPI = async () => {
    const username = "Saadan_Naqvi" // Replace with your username
    setLoading((prev) => ({ ...prev, leetcode: true }))

    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        leetcode: {
          success: response.ok,
          data: response.ok ? data : data.message,
          status: response.status,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        leetcode: {
          success: false,
          data: error.message,
          status: "Network Error",
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, leetcode: false }))
    }
  }

  const testCodeforcesAPI = async () => {
    const username = "Saadan" // Replace with your handle
    setLoading((prev) => ({ ...prev, codeforces: true }))

    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`)
      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        codeforces: {
          success: data.status === "OK",
          data: data.status === "OK" ? data.result[0] : data.comment,
          status: data.status,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        codeforces: {
          success: false,
          data: error.message,
          status: "Network Error",
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, codeforces: false }))
    }
  }

  const TestButton = ({
    platform,
    onTest,
    color,
  }: {
    platform: string
    onTest: () => void
    color: string
  }) => (
    <button
      onClick={onTest}
      disabled={loading[platform]}
      className={`flex items-center space-x-2 px-4 py-2 ${color} rounded-md hover:opacity-80 transition-opacity disabled:opacity-50`}
    >
      {loading[platform] ? <Loader className="animate-spin" size={16} /> : <Play size={16} />}
      <span>Test {platform}</span>
    </button>
  )

  const ResultDisplay = ({ platform }: { platform: string }) => {
    const result = results[platform]
    if (!result) return null

    return (
      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          {result.success ? (
            <CheckCircle className="text-green-400" size={16} />
          ) : (
            <XCircle className="text-red-400" size={16} />
          )}
          <span className="font-semibold text-white">
            {platform} API - Status: {result.status}
          </span>
        </div>
        <pre className="text-sm text-gray-300 overflow-x-auto">{JSON.stringify(result.data, null, 2)}</pre>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900/50 border border-green-400/30 rounded-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6">
        <span className="text-green-400">// </span>
        API Testing Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">GitHub API</h3>
          <TestButton platform="github" onTest={testGitHubAPI} color="bg-blue-600 text-white" />
          <ResultDisplay platform="github" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">LeetCode API</h3>
          <TestButton platform="leetcode" onTest={testLeetCodeAPI} color="bg-green-600 text-white" />
          <ResultDisplay platform="leetcode" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Codeforces API</h3>
          <TestButton platform="codeforces" onTest={testCodeforcesAPI} color="bg-purple-600 text-white" />
          <ResultDisplay platform="codeforces" />
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-400/30 rounded-lg">
        <h4 className="text-yellow-300 font-semibold mb-2">⚠️ Before Testing:</h4>
        <ul className="text-yellow-200 text-sm space-y-1">
          <li>1. Replace "your-username" with your actual usernames in the code above</li>
          <li>2. Make sure your profiles are public on all platforms</li>
          <li>3. Check the browser console for detailed error messages</li>
        </ul>
      </div>
    </div>
  )
}
