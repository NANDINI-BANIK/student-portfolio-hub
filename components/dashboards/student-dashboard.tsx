"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Award, Eye, Share, Plus, FolderOpen } from "lucide-react"
import { PortfolioManager } from "@/components/portfolio/portfolio-manager"

export function StudentDashboard() {
  const [activeView, setActiveView] = useState<"dashboard" | "portfolio">("dashboard")

  if (activeView === "portfolio") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setActiveView("dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>
        <PortfolioManager />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h2>
        <p className="text-muted-foreground">Manage your academic portfolio and achievements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting faculty review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setActiveView("portfolio")}
                >
                  <FolderOpen className="h-6 w-6" />
                  <span>Manage Portfolio</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Generate Portfolio</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <Eye className="h-6 w-6" />
                  <span>Preview Portfolio</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <Share className="h-6 w-6" />
                  <span>Share Portfolio</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest uploaded accomplishments</CardDescription>
                </div>
                <Button size="sm" onClick={() => setActiveView("portfolio")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Dean's List - Fall 2024", status: "approved", type: "Academic" },
                  { title: "Hackathon Winner - TechFest 2024", status: "pending", type: "Competition" },
                  { title: "Research Publication - AI Conference", status: "approved", type: "Research" },
                  { title: "Volunteer Certificate - 100 Hours", status: "pending", type: "Service" },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.type}</p>
                      </div>
                    </div>
                    <Badge variant={achievement.status === "approved" ? "default" : "secondary"}>
                      {achievement.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Major</p>
                <p className="text-sm text-muted-foreground">Computer Science</p>
              </div>
              <div>
                <p className="text-sm font-medium">Year</p>
                <p className="text-sm text-muted-foreground">Senior (4th Year)</p>
              </div>
              <div>
                <p className="text-sm font-medium">GPA</p>
                <p className="text-sm text-muted-foreground">3.8/4.0</p>
              </div>
              <div>
                <p className="text-sm font-medium">Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {["React", "Python", "Machine Learning", "Leadership"].map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Academic", count: 5 },
                  { name: "Research", count: 3 },
                  { name: "Leadership", count: 2 },
                  { name: "Service", count: 2 },
                ].map((category) => (
                  <div key={category.name} className="flex justify-between items-center">
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
