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

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GitHub API error:", response.status, errorData)
      return NextResponse.json({ error: `GitHub API error: ${response.status}` }, { status: response.status })
    }

    const userData = await response.json()

    // Only return necessary data to avoid exposing sensitive information
    const sanitizedData = {
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      login: userData.login,
      name: userData.name,
      bio: userData.bio,
      location: userData.location,
      company: userData.company,
    }

    return NextResponse.json(sanitizedData)
  } catch (error) {
    console.error("GitHub user API error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub user data" }, { status: 500 })
  }
}
