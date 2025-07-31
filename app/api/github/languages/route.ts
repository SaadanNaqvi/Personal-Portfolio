import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")
  const repo = searchParams.get("repo")

  if (!username || !repo) {
    return NextResponse.json({ error: "Username and repo are required" }, { status: 400 })
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

    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/languages`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return NextResponse.json({ error: `GitHub API error: ${response.status}` }, { status: response.status })
    }

    const languageData = await response.json()
    return NextResponse.json(languageData)
  } catch (error) {
    console.error("GitHub languages API error:", error)
    return NextResponse.json({ error: "Failed to fetch repository languages" }, { status: 500 })
  }
}
