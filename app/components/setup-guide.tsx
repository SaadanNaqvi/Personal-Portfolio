"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, Copy, ExternalLink, Github, Code, Trophy, AlertTriangle } from "lucide-react"

export default function SetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [usernames, setUsernames] = useState({
    github: "SaadanNaqvi",
    leetcode: "Saadan_Naqvi",
    codeforces: "Saadan",
  })

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const saveUsernames = () => {
    localStorage.setItem("portfolio-usernames", JSON.stringify(usernames))
    alert("Usernames saved! Refresh the page to see updated stats.")
  }

  const setupSteps = [
    {
      id: 1,
      title: "Clone the Repository",
      description: "Get the portfolio code on your local machine",
      code: `git clone https://github.com/your-username/cyber-portfolio.git
cd cyber-portfolio`,
      category: "setup",
    },
    {
      id: 2,
      title: "Install Dependencies",
      description: "Install all required packages",
      code: `npm install
# or
yarn install`,
      category: "setup",
    },
    {
      id: 3,
      title: "Configure Your Information",
      description: "Update personal information in the components",
      details: [
        "Edit app/components/hero.tsx - Update name, title, and description",
        "Edit app/components/about.tsx - Add your bio and skills",
        "Edit app/components/experience.tsx - Add your work experience",
        "Edit app/components/education.tsx - Add your education details",
        "Edit app/components/projects.tsx - Showcase your projects",
      ],
      category: "config",
    },
    {
      id: 4,
      title: "Update Platform Usernames",
      description: "Configure your coding platform usernames for real-time stats",
      component: "username-config",
      category: "config",
    },
    {
      id: 5,
      title: "Run Development Server",
      description: "Start the development server to see your changes",
      code: `npm run dev
# or
yarn dev`,
      category: "setup",
    },
    {
      id: 6,
      title: "Deploy to Vercel",
      description: "Deploy your portfolio to production",
      code: `# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod`,
      category: "deploy",
    },
  ]

  const StepCard = ({ step }: { step: any }) => {
    const isCompleted = completedSteps.includes(step.id)

    return (
      <Card className="mb-4 border-green-400/30 bg-gray-900/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleStep(step.id)}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
              </button>
              <div>
                <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                <CardDescription className="text-gray-400">{step.description}</CardDescription>
              </div>
            </div>
            <Badge variant={isCompleted ? "default" : "secondary"} className="bg-green-400/20 text-green-400">
              Step {step.id}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {step.code && (
            <div className="relative">
              <pre className="bg-black/50 border border-green-400/20 rounded-lg p-4 text-sm text-green-400 overflow-x-auto">
                <code>{step.code}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={() => copyToClipboard(step.code)}
              >
                <Copy size={16} />
              </Button>
            </div>
          )}

          {step.details && (
            <div className="mt-4">
              <ul className="space-y-2">
                {step.details.map((detail: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-300">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.component === "username-config" && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="github" className="text-green-400 flex items-center space-x-2">
                    <Github size={16} />
                    <span>GitHub Username</span>
                  </Label>
                  <Input
                    id="github"
                    value={usernames.github}
                    onChange={(e) => setUsernames({ ...usernames, github: e.target.value })}
                    className="mt-1 bg-gray-800 border-green-400/30 text-white"
                    placeholder="your-github-username"
                  />
                </div>

                <div>
                  <Label htmlFor="leetcode" className="text-green-400 flex items-center space-x-2">
                    <Code size={16} />
                    <span>LeetCode Username</span>
                  </Label>
                  <Input
                    id="leetcode"
                    value={usernames.leetcode}
                    onChange={(e) => setUsernames({ ...usernames, leetcode: e.target.value })}
                    className="mt-1 bg-gray-800 border-green-400/30 text-white"
                    placeholder="your-leetcode-username"
                  />
                </div>

                <div>
                  <Label htmlFor="codeforces" className="text-green-400 flex items-center space-x-2">
                    <Trophy size={16} />
                    <span>Codeforces Handle</span>
                  </Label>
                  <Input
                    id="codeforces"
                    value={usernames.codeforces}
                    onChange={(e) => setUsernames({ ...usernames, codeforces: e.target.value })}
                    className="mt-1 bg-gray-800 border-green-400/30 text-white"
                    placeholder="your-codeforces-handle"
                  />
                </div>
              </div>

              <Button onClick={saveUsernames} className="bg-green-400/20 text-green-400 hover:bg-green-400/30">
                Save Usernames
              </Button>

              <Alert className="border-green-400/30 bg-green-400/10">
                <AlertTriangle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  <strong>Note:</strong> GitHub stats are now displayed using static data for your username
                  "SaadanNaqvi". LeetCode and Codeforces stats are fetched in real-time from their respective APIs.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-400">// </span>
            <span className="text-white">Portfolio Setup Guide</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow these steps to customize and deploy your cybersecurity portfolio
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-4"></div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-green-400/30">
            <TabsTrigger value="all" className="text-gray-400 data-[state=active]:text-green-400">
              All Steps
            </TabsTrigger>
            <TabsTrigger value="setup" className="text-gray-400 data-[state=active]:text-green-400">
              Setup
            </TabsTrigger>
            <TabsTrigger value="config" className="text-gray-400 data-[state=active]:text-green-400">
              Config
            </TabsTrigger>
            <TabsTrigger value="deploy" className="text-gray-400 data-[state=active]:text-green-400">
              Deploy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {setupSteps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </TabsContent>

          <TabsContent value="setup" className="mt-6">
            {setupSteps
              .filter((step) => step.category === "setup")
              .map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
          </TabsContent>

          <TabsContent value="config" className="mt-6">
            {setupSteps
              .filter((step) => step.category === "config")
              .map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
          </TabsContent>

          <TabsContent value="deploy" className="mt-6">
            {setupSteps
              .filter((step) => step.category === "deploy")
              .map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
          </TabsContent>
        </Tabs>

        {/* Progress Summary */}
        <Card className="border-green-400/30 bg-gray-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <CheckCircle className="text-green-400" size={20} />
              <span>Setup Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">
                {completedSteps.length} of {setupSteps.length} steps completed
              </span>
              <span className="text-green-400 font-semibold">
                {Math.round((completedSteps.length / setupSteps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps.length / setupSteps.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="border-green-400/30 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <ExternalLink className="text-green-400" size={20} />
                <span>Useful Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="https://vercel.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-400 hover:text-green-300 transition-colors"
              >
                → Vercel Documentation
              </a>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-400 hover:text-green-300 transition-colors"
              >
                → Next.js Documentation
              </a>
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-400 hover:text-green-300 transition-colors"
              >
                → Tailwind CSS Documentation
              </a>
            </CardContent>
          </Card>

          <Card className="border-green-400/30 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <AlertTriangle className="text-green-400" size={20} />
                <span>Important Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              <p>• GitHub stats are displayed using static data for security</p>
              <p>• LeetCode and Codeforces APIs are fetched in real-time</p>
              <p>• Make sure to update all personal information</p>
              <p>• Test your portfolio locally before deploying</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
