"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  X,
  Star,
  MapPin,
  Calendar,
  Award,
  Eye,
  Bookmark,
  Mail,
  ExternalLink,
  GraduationCap,
  Building,
  User,
} from "lucide-react"

interface StudentProfileModalProps {
  student: any
  onClose: () => void
  onSave: () => void
  isSaved: boolean
}

export function StudentProfileModal({ student, onClose, onSave, isSaved }: StudentProfileModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-muted-foreground">
                {student.major} • {student.year} at {student.university}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onSave} className={isSaved ? "bg-primary text-primary-foreground" : ""}>
              <Bookmark className="h-4 w-4 mr-2" />
              {isSaved ? "Saved" : "Save Profile"}
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Contact Student
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium">Rating: {student.rating}/5.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>GPA: {student.gpa}/4.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{student.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Graduates {formatDate(student.graduationDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{student.achievements.length} Verified Achievements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{student.profileViews} Profile Views</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={student.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {student.isAvailable ? "Available for Opportunities" : "Not Currently Available"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Expertise */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>Technical and soft skills demonstrated through achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Verified Achievements</CardTitle>
                  <CardDescription>Faculty-approved accomplishments and recognitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.achievements.map((achievement: any, index: number) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{achievement.category}</Badge>
                            {achievement.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDate(achievement.date)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Preferred Roles */}
              <Card>
                <CardHeader>
                  <CardTitle>Career Interests</CardTitle>
                  <CardDescription>Roles and positions the student is interested in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.preferredRoles.map((role: string) => (
                      <Badge key={role} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Portfolio</p>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Full Portfolio
                    </Button>
                  </div>
                  <Separator />
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Academic Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">University</p>
                    <p className="text-sm text-muted-foreground">{student.university}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Major</p>
                    <p className="text-sm text-muted-foreground">{student.major}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Academic Year</p>
                    <p className="text-sm text-muted-foreground">{student.year}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current GPA</p>
                    <p className="text-sm text-muted-foreground">{student.gpa}/4.0</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Expected Graduation</p>
                    <p className="text-sm text-muted-foreground">{formatDate(student.graduationDate)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Last Active</p>
                    <p className="text-sm text-muted-foreground">{formatDate(student.lastActive)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile Views</p>
                    <p className="text-sm text-muted-foreground">{student.profileViews} total views</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Portfolio
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Award className="h-4 w-4 mr-2" />
                    View All Achievements
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Building className="h-4 w-4 mr-2" />
                    Similar Profiles
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
