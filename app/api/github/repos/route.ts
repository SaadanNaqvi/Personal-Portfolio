import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App/1.0",
    }

    // Use server-side environment variable (without NEXT_PUBLIC prefix)
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers,
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      console.error("GitHub repos API error:", response.status)
      return NextResponse.json({ error: `GitHub API error: ${response.status}` }, { status: response.status })
    }

    const reposData = await response.json()

    // Sanitize repo data to only include necessary information
    const sanitizedRepos = reposData.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      size: repo.size,
      fork: repo.fork,
      html_url: repo.html_url,
      topics: repo.topics,
    }))

    return NextResponse.json(sanitizedRepos)
  } catch (error) {
    console.error("GitHub repos API error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub repositories" }, { status: 500 })
  }
}
