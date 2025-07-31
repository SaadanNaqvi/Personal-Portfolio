"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, ExternalLink, Settings, Code, Database } from "lucide-react"

export default function SetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [showTokens, setShowTokens] = useState(false)
  const [usernames, setUsernames] = useState({
    github: "SaadanNaqvi",
    leetcode: "Saadan_Naqvi",
    codeforces: "Saadan",
  })

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const saveUsernames = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-usernames", JSON.stringify(usernames))
      alert("Usernames saved successfully!")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const setupSteps = [
    {
      id: "usernames",
      title: "Configure Platform Usernames",
      description: "Set your coding platform usernames for real-time stats",
      required: true,
    },
    {
      id: "deploy",
      title: "Deploy to Vercel",
      description: "Deploy your portfolio to make it live",
      required: true,
    },
    {
      id: "domain",
      title: "Custom Domain (Optional)",
      description: "Add your own domain name",
      required: false,
    },
    {
      id: "analytics",
      title: "Analytics Setup (Optional)",
      description: "Track your portfolio visitors",
      required: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            Portfolio Setup Guide
          </h1>
          <p className="text-gray-400 text-lg">Get your cybersecurity portfolio up and running in minutes</p>
        </div>

        <Tabs defaultValue="quick-start" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="quick-start" className="data-[state=active]:bg-green-400/20">
              <Settings className="w-4 h-4 mr-2" />
              Quick Start
            </TabsTrigger>
            <TabsTrigger value="configuration" className="data-[state=active]:bg-green-400/20">
              <Code className="w-4 h-4 mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="deployment" className="data-[state=active]:bg-green-400/20">
              <Database className="w-4 h-4 mr-2" />
              Deployment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quick-start" className="space-y-6">
            <Card className="bg-gray-800 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400">Setup Progress</CardTitle>
                <CardDescription>Complete these steps to get your portfolio running</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {setupSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors cursor-pointer"
                    onClick={() => toggleStep(step.id)}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="text-green-400 w-5 h-5" />
                    ) : (
                      <Circle className="text-gray-400 w-5 h-5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{step.title}</h3>
                        {step.required && <Badge variant="destructive">Required</Badge>}
                      </div>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Alert className="border-green-400/30 bg-green-400/10">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-100">
                <strong>Good news!</strong> Your portfolio uses static GitHub data, so no API tokens are required. Just
                configure your usernames and deploy!
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card className="bg-gray-800 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400">Platform Usernames</CardTitle>
                <CardDescription>Configure your coding platform usernames for real-time statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Username</Label>
                    <Input
                      id="github"
                      value={usernames.github}
                      onChange={(e) => setUsernames({ ...usernames, github: e.target.value })}
                      className="bg-gray-900 border-gray-600"
                      placeholder="your-github-username"
                    />
                    <p className="text-xs text-gray-400">Used for repository and contribution stats</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leetcode">LeetCode Username</Label>
                    <Input
                      id="leetcode"
                      value={usernames.leetcode}
                      onChange={(e) => setUsernames({ ...usernames, leetcode: e.target.value })}
                      className="bg-gray-900 border-gray-600"
                      placeholder="your-leetcode-username"
                    />
                    <p className="text-xs text-gray-400">Used for problem-solving statistics</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codeforces">Codeforces Handle</Label>
                    <Input
                      id="codeforces"
                      value={usernames.codeforces}
                      onChange={(e) => setUsernames({ ...usernames, codeforces: e.target.value })}
                      className="bg-gray-900 border-gray-600"
                      placeholder="your-codeforces-handle"
                    />
                    <p className="text-xs text-gray-400">Used for competitive programming stats</p>
                  </div>
                </div>

                <Button onClick={saveUsernames} className="bg-green-600 hover:bg-green-700">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400">Security Notice</CardTitle>
                <CardDescription>Your portfolio is designed with security in mind</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="border-green-400/30 bg-green-400/10">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-100">
                    <strong>Secure Implementation:</strong> This portfolio uses static GitHub data and public APIs only.
                    No sensitive tokens are exposed to the client, ensuring your credentials remain secure.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <Card className="bg-gray-800 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400">Deploy to Vercel</CardTitle>
                <CardDescription>Deploy your portfolio to Vercel for free hosting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono">1.</span>
                    <span>Push your code to GitHub</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono">2.</span>
                    <span>Connect your GitHub repository to Vercel</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono">3.</span>
                    <span>Deploy with default settings (no environment variables needed!)</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button asChild className="bg-black hover:bg-gray-800">
                    <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Deploy to Vercel
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400">Custom Domain (Optional)</CardTitle>
                <CardDescription>Add your own domain name to your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  After deploying to Vercel, you can add a custom domain in your project settings.
                </p>
                <div className="bg-gray-900 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400"># Example domains:</div>
                  <div className="text-green-400">yourname.dev</div>
                  <div className="text-green-400">portfolio.yourname.com</div>
                  <div className="text-green-400">cyber.yourname.io</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400">Performance Tips</CardTitle>
                <CardDescription>Optimize your portfolio for better performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4 mt-0.5" />
                  <span className="text-sm">Static GitHub data ensures fast loading times</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4 mt-0.5" />
                  <span className="text-sm">Real-time LeetCode and Codeforces stats with fallbacks</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4 mt-0.5" />
                  <span className="text-sm">Responsive design works on all devices</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4 mt-0.5" />
                  <span className="text-sm">No sensitive data exposed to clients</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
