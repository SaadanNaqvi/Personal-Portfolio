// API Configuration
// Replace these with your actual usernames
export const API_CONFIG = {
  github: {
    username: "your-github-username", // Replace with your GitHub username
    token: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
  },
  leetcode: {
    username: "your-leetcode-username", // Replace with your LeetCode username
  },
  codeforces: {
    username: "your-codeforces-username", // Replace with your Codeforces handle
  },
}

// API endpoints
export const API_ENDPOINTS = {
  github: {
    user: (username: string) => `https://api.github.com/users/${username}`,
    repos: (username: string) => `https://api.github.com/users/${username}/repos?per_page=100`,
    events: (username: string) => `https://api.github.com/users/${username}/events/public?per_page=100`,
  },
  leetcode: {
    stats: (username: string) => `https://leetcode-stats-api.herokuapp.com/${username}`,
    // Alternative: `https://alfa-leetcode-api.onrender.com/${username}`
  },
  codeforces: {
    user: (username: string) => `https://codeforces.com/api/user.info?handles=${username}`,
    submissions: (username: string) => `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`,
  },
}
