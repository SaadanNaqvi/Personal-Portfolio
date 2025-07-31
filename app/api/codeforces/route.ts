import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")

  console.log("Codeforces API proxy called with username:", username)

  if (!username) {
    console.error("No username provided to Codeforces proxy")
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    const apiUrl = `https://codeforces.com/api/user.info?handles=${username}`
    console.log("Fetching from Codeforces API:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    console.log("Codeforces API response status:", response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Codeforces API error response:", errorText)
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Codeforces API response data:", data)

    // Check if the API returned an error
    if (data.status === "FAILED") {
      console.error("Codeforces API returned FAILED status:", data.comment)
      return NextResponse.json(
        {
          status: "FAILED",
          comment: data.comment || "User not found or API error",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Codeforces API proxy error:", error)

    if (error.name === "TimeoutError") {
      return NextResponse.json(
        {
          error: "Request timeout",
          details: "Codeforces API took too long to respond",
        },
        { status: 408 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to fetch Codeforces data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
