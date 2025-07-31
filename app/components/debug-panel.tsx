"use client"

import { useState } from "react"
import { Play, Eye, EyeOff, RefreshCw } from "lucide-react"

export default function DebugPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const testCodeforcesAPI = async (username: string) => {
    setLoading((prev) => ({ ...prev, codeforces: true }))

    try {
      console.log("Testing Codeforces API with username:", username)

      // Test direct API
      const directResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`)
      const directData = await directResponse.json()

      // Test proxy API
      const proxyResponse = await fetch(`/api/codeforces?username=${username}`)
      const proxyData = await proxyResponse.json()

      setTestResults((prev) => ({
        ...prev,
        codeforces: {
          direct: {
            status: directResponse.status,
            ok: directResponse.ok,
            data: directData,
          },
          proxy: {
            status: proxyResponse.status,
            ok: proxyResponse.ok,
            data: proxyData,
          },
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        codeforces: {
          error: error.message,
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, codeforces: false }))
    }
  }

  const testGitHubAPI = async (username: string) => {
    setLoading((prev) => ({ ...prev, github: true }))

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      const data = await response.json()

      setTestResults((prev) => ({
        ...prev,
        github: {
          status: response.status,
          ok: response.ok,
          data: data,
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        github: {
          error: error.message,
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, github: false }))
    }
  }

  const testLeetCodeAPI = async (username: string) => {
    setLoading((prev) => ({ ...prev, leetcode: true }))

    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      const data = await response.json()

      setTestResults((prev) => ({
        ...prev,
        leetcode: {
          status: response.status,
          ok: response.ok,
          data: data,
        },
      }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        leetcode: {
          error: error.message,
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, leetcode: false }))
    }
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-red-600 text-white p-2 rounded-full z-50 hover:bg-red-700 transition-colors"
        title="Open Debug Panel"
      >
        <Eye size={20} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900/95 border border-red-400/30 rounded-lg p-4 backdrop-blur-sm z-50 max-w-md max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-red-400 font-bold">Debug Panel</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
          <EyeOff size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold mb-2">Test APIs</h4>
          <div className="space-y-2">
            <button
              onClick={() => testCodeforcesAPI("tourist")} // Test with known user
              disabled={loading.codeforces}
              className="flex items-center space-x-2 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50"
            >
              {loading.codeforces ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
              <span>Test Codeforces</span>
            </button>

            <button
              onClick={() => testGitHubAPI("octocat")} // Test with known user
              disabled={loading.github}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading.github ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
              <span>Test GitHub</span>
            </button>

            <button
              onClick={() => testLeetCodeAPI("test")} // Test with any username
              disabled={loading.leetcode}
              className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {loading.leetcode ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
              <span>Test LeetCode</span>
            </button>
          </div>
        </div>

        {Object.keys(testResults).length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-2">Results</h4>
            <div className="space-y-2 text-xs">
              {Object.entries(testResults).map(([api, result]) => (
                <div key={api} className="bg-black/50 p-2 rounded">
                  <div className="text-cyan-400 font-semibold">{api.toUpperCase()}</div>
                  <pre className="text-gray-300 whitespace-pre-wrap overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
