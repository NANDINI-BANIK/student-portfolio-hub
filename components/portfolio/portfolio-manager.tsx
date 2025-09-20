"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AchievementUpload } from "./achievement-upload"
import { AchievementCard } from "./achievement-card"
import { PortfolioPreview } from "./portfolio-preview"
import { PDFGenerator } from "./pdf-generator"
import { Plus, Search, Eye, Download, Share } from "lucide-react"

// Mock achievements data
const mockAchievements = [
  {
    id: "1",
    title: "Dean's List - Fall 2024",
    description: "Achieved Dean's List recognition for maintaining a GPA above 3.7 while taking 18 credit hours.",
    category: "Academic Excellence",
    date: "2024-12-15",
    institution: "University of Technology",
    skills: ["Academic Excellence", "Time Management"],
    status: "approved",
    submittedAt: "2024-12-16T10:00:00Z",
    approvedBy: "Dr. Sarah Wilson",
    approvedAt: "2024-12-17T14:30:00Z",
    files: ["transcript_fall2024.pdf"],
  },
  {
    id: "2",
    title: "Hackathon Winner - TechFest 2024",
    description: "First place winner in the annual TechFest hackathon with an AI-powered sustainability app.",
    category: "Competitions & Awards",
    date: "2024-11-20",
    institution: "TechFest Organization",
    skills: ["React", "Python", "Machine Learning", "Teamwork"],
    status: "pending",
    submittedAt: "2024-12-15T09:00:00Z",
    approvedBy: null,
    approvedAt: null,
    files: ["hackathon_certificate.pdf", "project_demo.mp4"],
  },
  {
    id: "3",
    title: "Research Publication - AI Conference",
    description:
      'Co-authored research paper on "Machine Learning Applications in Sustainable Computing" published in IEEE conference.',
    category: "Research & Publications",
    date: "2024-10-10",
    institution: "IEEE Computer Society",
    skills: ["Research", "Machine Learning", "Technical Writing"],
    status: "approved",
    submittedAt: "2024-10-15T16:00:00Z",
    approvedBy: "Dr. Sarah Wilson",
    approvedAt: "2024-10-16T11:00:00Z",
    files: ["research_paper.pdf", "conference_presentation.pptx"],
  },
]

export function PortfolioManager() {
  const [achievements, setAchievements] = useState(mockAchievements)
  const [showUpload, setShowUpload] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showPDFGenerator, setShowPDFGenerator] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

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

  const handleAddAchievement = (newAchievement: any) => {
    setAchievements((prev) => [newAchievement, ...prev])
  }

  const handleDeleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id))
  }

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = filterCategory === "all" || achievement.category === filterCategory
    const matchesStatus = filterStatus === "all" || achievement.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const stats = {
    total: achievements.length,
    approved: achievements.filter((a) => a.status === "approved").length,
    pending: achievements.filter((a) => a.status === "pending").length,
    rejected: achievements.filter((a) => a.status === "rejected").length,
  }

  const studentInfo = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    major: "Computer Science",
    year: "Senior",
    gpa: 3.8,
    university: "University of Technology",
    location: "San Francisco, CA",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Manager</h2>
          <p className="text-muted-foreground">Manage your achievements and build your professional portfolio</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={() => setShowPDFGenerator(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => setShowUpload(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Achievements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Needs Revision</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search achievements, skills, or keywords..."
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Needs Revision</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} onDelete={handleDeleteAchievement} />
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <p className="text-muted-foreground mb-4">No achievements found matching your criteria.</p>
            <Button onClick={() => setShowUpload(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Achievement
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {showUpload && <AchievementUpload onClose={() => setShowUpload(false)} onSubmit={handleAddAchievement} />}

      {showPreview && (
        <PortfolioPreview
          achievements={achievements.filter((a) => a.status === "approved")}
          onClose={() => setShowPreview(false)}
        />
      )}

      {showPDFGenerator && (
        <PDFGenerator
          achievements={achievements.filter((a) => a.status === "approved")}
          studentInfo={studentInfo}
          onClose={() => setShowPDFGenerator(false)}
        />
      )}
    </div>
  )
}
