"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AchievementReviewModal } from "./achievement-review-modal"
import { Search, Clock, CheckCircle, XCircle, Eye, Calendar, User } from "lucide-react"

// Mock pending achievements data
const mockPendingAchievements = [
  {
    id: "1",
    student: {
      id: "student1",
      name: "Alex Johnson",
      email: "alex.johnson@university.edu",
      major: "Computer Science",
      year: "Senior",
      gpa: "3.8",
    },
    title: "Research Paper Publication",
    description:
      'Co-authored research paper on "Machine Learning Applications in Sustainable Computing" published in IEEE conference proceedings.',
    category: "Research & Publications",
    date: "2024-10-10",
    institution: "IEEE Computer Society",
    skills: ["Research", "Machine Learning", "Technical Writing", "Data Analysis"],
    submittedAt: "2024-12-15T10:00:00Z",
    files: [
      { name: "research_paper.pdf", size: "2.4 MB", type: "application/pdf" },
      { name: "conference_presentation.pptx", size: "5.1 MB", type: "application/vnd.ms-powerpoint" },
      { name: "peer_review_comments.pdf", size: "0.8 MB", type: "application/pdf" },
    ],
    priority: "high",
    previousSubmissions: 0,
  },
  {
    id: "2",
    student: {
      id: "student2",
      name: "Sarah Chen",
      email: "sarah.chen@university.edu",
      major: "Data Science",
      year: "Junior",
      gpa: "3.9",
    },
    title: "Hackathon First Place - TechFest 2024",
    description:
      "Led a team of 4 to develop an AI-powered sustainability tracking app that won first place out of 150+ teams.",
    category: "Competitions & Awards",
    date: "2024-11-20",
    institution: "TechFest Organization",
    skills: ["Leadership", "React", "Python", "Machine Learning", "Project Management"],
    submittedAt: "2024-12-14T15:30:00Z",
    files: [
      { name: "hackathon_certificate.pdf", size: "1.2 MB", type: "application/pdf" },
      { name: "project_demo.mp4", size: "45.3 MB", type: "video/mp4" },
      { name: "team_photo.jpg", size: "2.1 MB", type: "image/jpeg" },
    ],
    priority: "medium",
    previousSubmissions: 0,
  },
  {
    id: "3",
    student: {
      id: "student3",
      name: "Michael Rodriguez",
      email: "michael.rodriguez@university.edu",
      major: "Software Engineering",
      year: "Senior",
      gpa: "3.7",
    },
    title: "Dean's List Fall 2024",
    description:
      "Achieved Dean's List recognition for maintaining a GPA above 3.7 while taking 18 credit hours including advanced coursework.",
    category: "Academic Excellence",
    date: "2024-12-15",
    institution: "University of Technology",
    skills: ["Academic Excellence", "Time Management", "Critical Thinking"],
    submittedAt: "2024-12-16T09:15:00Z",
    files: [
      { name: "official_transcript.pdf", size: "0.9 MB", type: "application/pdf" },
      { name: "course_schedule.pdf", size: "0.3 MB", type: "application/pdf" },
    ],
    priority: "low",
    previousSubmissions: 1,
  },
]

export function ApprovalSystem() {
  const [achievements, setAchievements] = useState(mockPendingAchievements)
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const categories = [
    "Academic Excellence",
    "Research & Publications",
    "Leadership & Service",
    "Competitions & Awards",
    "Certifications",
    "Projects & Innovation",
    "Volunteer Work",
    "Internships & Work Experience",
  ]

  const handleApprove = (achievementId: string, feedback?: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== achievementId))
    // In real app, this would update the database
    console.log(`Approved achievement ${achievementId}`, feedback)
  }

  const handleReject = (achievementId: string, feedback: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== achievementId))
    // In real app, this would update the database and notify student
    console.log(`Rejected achievement ${achievementId}`, feedback)
  }

  const handleRequestChanges = (achievementId: string, feedback: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== achievementId))
    // In real app, this would update status and notify student
    console.log(`Requested changes for achievement ${achievementId}`, feedback)
  }

  const filteredAchievements = achievements
    .filter((achievement) => {
      const matchesSearch =
        achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = filterCategory === "all" || achievement.category === filterCategory
      const matchesPriority = filterPriority === "all" || achievement.priority === filterPriority

      return matchesSearch && matchesCategory && matchesPriority
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        case "oldest":
          return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          )
        case "student":
          return a.student.name.localeCompare(b.student.name)
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Achievement Review System</h2>
          <p className="text-muted-foreground">Review and approve student achievement submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{filteredAchievements.length} pending</Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student, achievement, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      achievement.priority === "high"
                        ? "bg-red-500"
                        : achievement.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{achievement.title}</h3>
                      <Badge className={getPriorityColor(achievement.priority)}>{achievement.priority}</Badge>
                      {achievement.previousSubmissions > 0 && (
                        <Badge variant="outline">Resubmission #{achievement.previousSubmissions + 1}</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{achievement.student.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Submitted {formatDate(achievement.submittedAt)}</span>
                      </div>
                      <Badge variant="outline">{achievement.category}</Badge>
                    </div>

                    <p className="text-muted-foreground mb-3 line-clamp-2">{achievement.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="font-medium">Student:</span> {achievement.student.major} •{" "}
                        {achievement.student.year} • GPA: {achievement.student.gpa}
                      </div>
                      <div>
                        <span className="font-medium">Files:</span> {achievement.files.length} attachment
                        {achievement.files.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => setSelectedAchievement(achievement)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleApprove(achievement.id)}>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleReject(achievement.id, "Quick rejection")}>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No pending achievements match your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Review Modal */}
      {selectedAchievement && (
        <AchievementReviewModal
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onRequestChanges={handleRequestChanges}
        />
      )}
    </div>
  )
}
