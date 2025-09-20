"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Users, FileText, Award } from "lucide-react"
import { ApprovalSystem } from "@/components/faculty/approval-system"

export function FacultyDashboard() {
  const [activeView, setActiveView] = useState<"dashboard" | "approvals">("dashboard")

  if (activeView === "approvals") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setActiveView("dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>
        <ApprovalSystem />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Faculty Dashboard</h2>
        <p className="text-muted-foreground">Review and approve student achievements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting your approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+6 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">In your department</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Endorsements Given</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Student achievements awaiting your review</CardDescription>
                </div>
                <Button onClick={() => setActiveView("approvals")}>View All Reviews</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    student: "Alex Johnson",
                    achievement: "Research Paper Publication",
                    type: "Research",
                    submitted: "2 days ago",
                    priority: "high",
                  },
                  {
                    student: "Sarah Chen",
                    achievement: "Hackathon First Place",
                    type: "Competition",
                    submitted: "1 day ago",
                    priority: "medium",
                  },
                  {
                    student: "Michael Rodriguez",
                    achievement: "Dean's List Fall 2024",
                    type: "Academic",
                    submitted: "3 hours ago",
                    priority: "low",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.priority === "high"
                            ? "bg-red-500"
                            : item.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{item.achievement}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.student} • {item.type} • {item.submitted}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent approval actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Approved",
                    student: "Emma Wilson",
                    achievement: "Leadership Certificate",
                    time: "1 hour ago",
                  },
                  {
                    action: "Approved",
                    student: "David Kim",
                    achievement: "Research Presentation",
                    time: "3 hours ago",
                  },
                  {
                    action: "Requested Changes",
                    student: "Lisa Zhang",
                    achievement: "Project Portfolio",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span> {activity.achievement} for{" "}
                        {activity.student}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Department Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm text-muted-foreground">Computer Science</p>
              </div>
              <div>
                <p className="text-sm font-medium">Students Under Review</p>
                <p className="text-sm text-muted-foreground">156 Active</p>
              </div>
              <div>
                <p className="text-sm font-medium">Approval Rate</p>
                <p className="text-sm text-muted-foreground">94% This Semester</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" onClick={() => setActiveView("approvals")}>
                <Clock className="h-4 w-4 mr-2" />
                Review Pending (8)
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                View All Students
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>

          {/* Achievement Types */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Academic", pending: 3 },
                  { name: "Research", pending: 2 },
                  { name: "Leadership", pending: 2 },
                  { name: "Service", pending: 1 },
                ].map((type) => (
                  <div key={type.name} className="flex justify-between items-center">
                    <span className="text-sm">{type.name}</span>
                    <Badge variant={type.pending > 0 ? "default" : "secondary"}>{type.pending} pending</Badge>
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
