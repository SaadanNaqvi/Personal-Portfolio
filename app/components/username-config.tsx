"use client"

import { useState, useEffect } from "react"
import { Settings, Save, X } from "lucide-react"

interface UsernameConfig {
  github: string
  leetcode: string
  codeforces: string
}

export default function UsernameConfig() {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<UsernameConfig>({
    github: "",
    leetcode: "",
    codeforces: "",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load saved config from localStorage
    const savedConfig = localStorage.getItem("portfolio-usernames")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("portfolio-usernames", JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)

    // Trigger a page reload to apply new usernames
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleInputChange = (platform: keyof UsernameConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [platform]: value }))
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 bg-blue-600 text-white p-2 rounded-full z-50 hover:bg-blue-700 transition-colors"
        title="Configure Usernames"
      >
        <Settings size={20} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Configure Usernames</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-blue-400 text-sm font-semibold mb-2">GitHub Username</label>
            <input
              type="text"
              value={config.github}
              onChange={(e) => handleInputChange("github", e.target.value)}
              placeholder="your-github-username"
              className="w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Example: octocat</p>
          </div>

          <div>
            <label className="block text-green-400 text-sm font-semibold mb-2">LeetCode Username</label>
            <input
              type="text"
              value={config.leetcode}
              onChange={(e) => handleInputChange("leetcode", e.target.value)}
              placeholder="your-leetcode-username"
              className="w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-400 focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Example: john_doe</p>
          </div>

          <div>
            <label className="block text-purple-400 text-sm font-semibold mb-2">Codeforces Handle</label>
            <input
              type="text"
              value={config.codeforces}
              onChange={(e) => handleInputChange("codeforces", e.target.value)}
              placeholder="your-codeforces-handle"
              className="w-full bg-black/50 border border-gray-600 rounded px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Example: tourist</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
              saved ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Save size={16} />
            <span>{saved ? "Saved!" : "Save & Reload"}</span>
          </button>
        </div>

        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-400/30 rounded">
          <p className="text-yellow-300 text-sm">
            💡 <strong>Tip:</strong> Make sure your profiles are public on all platforms for the APIs to work properly.
          </p>
        </div>
      </div>
    </div>
  )
}
