"use client"

import { useState } from "react"
import { Settings, CheckCircle, AlertCircle, ExternalLink, RefreshCw } from "lucide-react"

export default function SetupGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [usernames, setUsernames] = useState({
    github: "SaadanNaqvi",
    leetcode: "Saadan_Naqvi",
    codeforces: "Saadan",
  })

  const saveUsernames = () => {
    localStorage.setItem("portfolio-usernames", JSON.stringify(usernames))
    // Trigger a page refresh to update stats
    window.location.reload()
  }

  const resetToDefaults = () => {
    const defaults = {
      github: "SaadanNaqvi",
      leetcode: "Saadan_Naqvi",
      codeforces: "Saadan",
    }
    setUsernames(defaults)
    localStorage.setItem("portfolio-usernames", JSON.stringify(defaults))
    window.location.reload()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-gray-900/90 border border-green-400/30 rounded-lg p-3 backdrop-blur-sm z-50 hover:border-green-400/50 transition-colors"
      >
        <Settings className="text-green-400" size={20} />
      </button>
    )
  }

  return (
    <div className="fixed top-4 right-4 bg-gray-900/95 border border-green-400/30 rounded-lg p-6 backdrop-blur-sm z-50 w-96 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-green-400 font-bold text-lg">Portfolio Configuration</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Current Status */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">API Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">GitHub:</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-green-400">Static Data</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">LeetCode:</span>
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-yellow-400" size={16} />
                <span className="text-yellow-400">Multiple APIs</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Codeforces:</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-400" size={16} />
                <span className="text-green-400">Direct API</span>
              </div>
            </div>
          </div>
        </div>

        {/* Username Configuration */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Configure Usernames</h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">GitHub Username</label>
              <input
                type="text"
                value={usernames.github}
                onChange={(e) => setUsernames({ ...usernames, github: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-green-400 focus:outline-none"
                placeholder="your-github-username"
              />
              <p className="text-xs text-gray-500 mt-1">Uses static data - no API calls needed</p>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">LeetCode Username</label>
              <input
                type="text"
                value={usernames.leetcode}
                onChange={(e) => setUsernames({ ...usernames, leetcode: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-green-400 focus:outline-none"
                placeholder="your-leetcode-username"
              />
              <p className="text-xs text-gray-500 mt-1">Tries multiple API endpoints for reliability</p>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Codeforces Handle</label>
              <input
                type="text"
                value={usernames.codeforces}
                onChange={(e) => setUsernames({ ...usernames, codeforces: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-green-400 focus:outline-none"
                placeholder="your-codeforces-handle"
              />
              <p className="text-xs text-gray-500 mt-1">Uses official Codeforces API</p>
            </div>
          </div>
        </div>

        {/* LeetCode API Information */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">LeetCode API Status</h4>
          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3">
            <div className="flex items-start space-x-2">
              <AlertCircle className="text-yellow-400 mt-0.5" size={16} />
              <div className="text-sm">
                <p className="text-yellow-400 font-medium">API Reliability Notice</p>
                <p className="text-gray-300 mt-1">
                  LeetCode APIs can be unreliable. The portfolio tries multiple endpoints and shows fallback data if all
                  fail.
                </p>
                <div className="mt-2 space-y-1 text-xs text-gray-400">
                  <p>• Primary: leetcode-stats-api.herokuapp.com</p>
                  <p>• Backup: alfa-leetcode-api.onrender.com</p>
                  <p>• Fallback: faisalshohag API</p>
                  <p>• Last resort: LeetCode GraphQL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Security & Privacy</h4>
          <div className="bg-green-900/20 border border-green-400/30 rounded p-3">
            <div className="flex items-start space-x-2">
              <CheckCircle className="text-green-400 mt-0.5" size={16} />
              <div className="text-sm">
                <p className="text-green-400 font-medium">Secure Implementation</p>
                <p className="text-gray-300 mt-1">
                  No sensitive tokens required. All API calls are made client-side to public endpoints only.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={saveUsernames}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Save & Refresh</span>
          </button>
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded text-sm transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Links */}
        <div className="space-y-2 pt-4 border-t border-gray-700">
          <h4 className="text-white font-semibold text-sm">Useful Links</h4>
          <div className="space-y-1">
            <a
              href="https://github.com/SaadanNaqvi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm"
            >
              <ExternalLink size={14} />
              <span>GitHub Profile</span>
            </a>
            <a
              href="https://leetcode.com/Saadan_Naqvi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm"
            >
              <ExternalLink size={14} />
              <span>LeetCode Profile</span>
            </a>
            <a
              href="https://codeforces.com/profile/Saadan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm"
            >
              <ExternalLink size={14} />
              <span>Codeforces Profile</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
