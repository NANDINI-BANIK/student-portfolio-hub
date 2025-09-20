"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users, Bookmark, Eye, Filter, Star } from "lucide-react"
import { TalentSearch } from "@/components/employer/talent-search"

export function EmployerDashboard() {
  const [activeView, setActiveView] = useState<"dashboard" | "search">("dashboard")

  if (activeView === "search") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setActiveView("dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>
        <TalentSearch />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Employer Dashboard</h2>
        <p className="text-muted-foreground">Discover talented students and their verified achievements</p>
      </div>

      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by skills, achievements, or keywords..." className="pl-10" />
            </div>
            <Button onClick={() => setActiveView("search")}>
              <Filter className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
            <Button variant="outline">Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Verified students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saved Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">In your shortlist</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Students reached out</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Students */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Featured Student Profiles</CardTitle>
                  <CardDescription>Top-rated students matching your criteria</CardDescription>
                </div>
                <Button onClick={() => setActiveView("search")}>Browse All Profiles</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Alex Johnson",
                    major: "Computer Science",
                    year: "Senior",
                    gpa: "3.8",
                    skills: ["React", "Python", "Machine Learning", "Leadership"],
                    achievements: 12,
                    rating: 4.9,
                  },
                  {
                    name: "Sarah Chen",
                    major: "Data Science",
                    year: "Junior",
                    gpa: "3.9",
                    skills: ["Python", "SQL", "Statistics", "Research"],
                    achievements: 8,
                    rating: 4.8,
                  },
                  {
                    name: "Michael Rodriguez",
                    major: "Software Engineering",
                    year: "Senior",
                    gpa: "3.7",
                    skills: ["JavaScript", "Node.js", "AWS", "Project Management"],
                    achievements: 15,
                    rating: 4.7,
                  },
                ].map((student, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.major} • {student.year} • GPA: {student.gpa}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{student.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Skills & Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {student.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">{student.achievements} verified achievements</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  {["React", "Python", "Java", "Leadership", "Research"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Searches */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["React Developers", "Data Science Students", "Leadership Experience", "Research Background"].map(
                  (search) => (
                    <div key={search} className="flex justify-between items-center p-2 hover:bg-muted rounded">
                      <span className="text-sm">{search}</span>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" onClick={() => setActiveView("search")}>
                <Users className="h-4 w-4 mr-2" />
                Browse All Profiles
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Bookmark className="h-4 w-4 mr-2" />
                View Saved (23)
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Search className="h-4 w-4 mr-2" />
                Advanced Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
