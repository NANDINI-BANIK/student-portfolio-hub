"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PDFGenerator } from "./pdf-generator"
import { X, Download, Share, Award, Calendar, Building, User } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  category: string
  date: string
  institution: string
  skills: string[]
  status: string
}

interface PortfolioPreviewProps {
  achievements: Achievement[]
  onClose: () => void
}

export function PortfolioPreview({ achievements, onClose }: PortfolioPreviewProps) {
  const [showPDFGenerator, setShowPDFGenerator] = useState(false)

  const groupedAchievements = achievements.reduce(
    (acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = []
      }
      acc[achievement.category].push(achievement)
      return acc
    },
    {} as Record<string, Achievement[]>,
  )

  const allSkills = [...new Set(achievements.flatMap((a) => a.skills))]

  const studentInfo = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    major: "Computer Science",
    year: "Senior",
    gpa: 3.8,
    university: "University of Technology",
    location: "San Francisco, CA",
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Portfolio Preview</h2>
            <p className="text-muted-foreground">Professional portfolio view</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowPDFGenerator(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share Link
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Alex Johnson</h1>
                <p className="text-xl text-muted-foreground">Computer Science Student</p>
                <p className="text-muted-foreground">University of Technology • Senior Year • GPA: 3.8</p>
              </div>
            </div>

            {/* Skills Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Core Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements by Category */}
            {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {category}
                  </CardTitle>
                  <CardDescription>
                    {categoryAchievements.length} achievement{categoryAchievements.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {categoryAchievements
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((achievement) => (
                        <div key={achievement.id} className="border-l-2 border-primary/20 pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{achievement.title}</h3>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(achievement.date)}
                            </div>
                          </div>

                          {achievement.institution && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Building className="h-4 w-4" />
                              {achievement.institution}
                            </div>
                          )}

                          <p className="text-muted-foreground mb-3">{achievement.description}</p>

                          {achievement.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {achievement.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {achievements.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No approved achievements to display in portfolio yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {showPDFGenerator && (
        <PDFGenerator
          achievements={achievements}
          studentInfo={studentInfo}
          onClose={() => setShowPDFGenerator(false)}
        />
      )}
    </div>
  )
}
