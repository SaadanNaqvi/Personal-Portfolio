"use client"

import { useState } from "react"
import { Copy, Check, ExternalLink, Github, Code, Trophy } from "lucide-react"

export default function SetupGuide() {
  const [copiedText, setCopiedText] = useState("")

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(""), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900/50 border border-green-400/30 rounded-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="text-green-400">// </span>
        API Setup Guide
      </h2>

      <div className="space-y-8">
        {/* GitHub Setup */}
        <div className="border border-blue-400/30 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Github className="text-blue-400 mr-2" size={24} />
            <h3 className="text-xl font-bold text-white">GitHub Integration</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-300 mb-2">1. Replace the username in the code:</p>
              <div className="bg-black/50 border border-gray-700 rounded p-3 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-green-400">const username = "your-actual-github-username"</span>
                  <button
                    onClick={() => copyToClipboard('const username = "your-actual-github-username"', "github-username")}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedText === "github-username" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-300 mb-2">
                2. (Optional) Create a GitHub Personal Access Token for higher rate limits:
              </p>
              <div className="bg-yellow-900/20 border border-yellow-400/30 rounded p-3 mb-2">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Without a token, you're limited to 60 requests per hour. With a token, you get 5,000 requests per
                  hour.
                </p>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm ml-4">
                <li>Go to GitHub Settings → Developer settings → Personal access tokens</li>
                <li>Generate new token (classic)</li>
                <li>
                  Select scopes: <code className="bg-gray-800 px-1 rounded">public_repo</code> and{" "}
                  <code className="bg-gray-800 px-1 rounded">read:user</code>
                </li>
                <li>
                  Copy the token and add to your <code className="bg-gray-800 px-1 rounded">.env.local</code> file:
                </li>
              </ol>
              <div className="bg-black/50 border border-gray-700 rounded p-3 font-mono text-sm mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-400">NEXT_PUBLIC_GITHUB_TOKEN=your_token_here</span>
                  <button
                    onClick={() => copyToClipboard("NEXT_PUBLIC_GITHUB_TOKEN=your_token_here", "github-token")}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedText === "github-token" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LeetCode Setup */}
        <div className="border border-green-400/30 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Code className="text-green-400 mr-2" size={24} />
            <h3 className="text-xl font-bold text-white">LeetCode Integration</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-300 mb-2">1. Find your LeetCode username:</p>
              <div className="bg-blue-900/20 border border-blue-400/30 rounded p-3 mb-2">
                <p className="text-blue-300 text-sm flex items-center">
                  <ExternalLink size={14} className="mr-1" />
                  Go to your LeetCode profile:{" "}
                  <code className="bg-gray-800 px-1 rounded ml-1">leetcode.com/your-username</code>
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-300 mb-2">2. Replace the username in the code:</p>
              <div className="bg-black/50 border border-gray-700 rounded p-3 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-green-400">const username = "your-leetcode-username"</span>
                  <button
                    onClick={() => copyToClipboard('const username = "your-leetcode-username"', "leetcode-username")}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedText === "leetcode-username" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-300 mb-2">3. Make sure your LeetCode profile is public:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm ml-4">
                <li>Go to LeetCode Settings → Profile</li>
                <li>Make sure "Make my profile public" is enabled</li>
                <li>Your solved problems should be visible to others</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Codeforces Setup */}
        <div className="border border-purple-400/30 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Trophy className="text-purple-400 mr-2" size={24} />
            <h3 className="text-xl font-bold text-white">Codeforces Integration</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-300 mb-2">1. Find your Codeforces handle:</p>
              <div className="bg-purple-900/20 border border-purple-400/30 rounded p-3 mb-2">
                <p className="text-purple-300 text-sm flex items-center">
                  <ExternalLink size={14} className="mr-1" />
                  Go to your Codeforces profile:{" "}
                  <code className="bg-gray-800 px-1 rounded ml-1">codeforces.com/profile/your-handle</code>
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-300 mb-2">2. Replace the username in the code:</p>
              <div className="bg-black/50 border border-gray-700 rounded p-3 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-green-400">const username = "your-codeforces-handle"</span>
                  <button
                    onClick={() => copyToClipboard('const username = "your-codeforces-handle"', "codeforces-username")}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedText === "codeforces-username" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing */}
        <div className="border border-cyan-400/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            <span className="text-cyan-400">// </span>
            Testing Your Setup
          </h3>

          <div className="space-y-2 text-gray-300 text-sm">
            <p>After updating the usernames:</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Save all files and restart your development server</li>
              <li>Check the browser console for any API errors</li>
              <li>The stats should load within a few seconds</li>
              <li>If you see fallback data, check the console for error messages</li>
            </ol>
          </div>

          <div className="bg-green-900/20 border border-green-400/30 rounded p-3 mt-4">
            <p className="text-green-300 text-sm">
              ✅ <strong>Pro tip:</strong> Test each API individually by temporarily commenting out the others in the
              Promise.all() call.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
