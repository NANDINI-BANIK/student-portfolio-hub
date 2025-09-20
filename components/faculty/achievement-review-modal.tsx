"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  X,
  CheckCircle,
  XCircle,
  MessageSquare,
  Download,
  User,
  Calendar,
  Building,
  FileText,
  ImageIcon,
  Video,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AchievementReviewModalProps {
  achievement: any
  onClose: () => void
  onApprove: (id: string, feedback?: string) => void
  onReject: (id: string, feedback: string) => void
  onRequestChanges: (id: string, feedback: string) => void
}

export function AchievementReviewModal({
  achievement,
  onClose,
  onApprove,
  onReject,
  onRequestChanges,
}: AchievementReviewModalProps) {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState("")
  const [action, setAction] = useState<"approve" | "reject" | "changes" | null>(null)

  const handleSubmit = () => {
    if (!action) return

    switch (action) {
      case "approve":
        onApprove(achievement.id, feedback)
        toast({
          title: "Achievement Approved",
          description: `${achievement.title} has been approved for ${achievement.student.name}.`,
        })
        break
      case "reject":
        if (!feedback.trim()) {
          toast({
            title: "Feedback Required",
            description: "Please provide feedback when rejecting an achievement.",
            variant: "destructive",
          })
          return
        }
        onReject(achievement.id, feedback)
        toast({
          title: "Achievement Rejected",
          description: `${achievement.title} has been rejected with feedback.`,
        })
        break
      case "changes":
        if (!feedback.trim()) {
          toast({
            title: "Feedback Required",
            description: "Please provide specific feedback for requested changes.",
            variant: "destructive",
          })
          return
        }
        onRequestChanges(achievement.id, feedback)
        toast({
          title: "Changes Requested",
          description: `Feedback sent to ${achievement.student.name} for revisions.`,
        })
        break
    }
    onClose()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const formatFileSize = (bytes: string) => {
    return bytes // Already formatted in mock data
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Review Achievement</h2>
            <p className="text-muted-foreground">Detailed review and approval workflow</p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Achievement Details */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{achievement.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <Badge variant="outline">{achievement.category}</Badge>
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        achievement.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : achievement.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {achievement.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>Date Achieved:</strong> {formatDate(achievement.date)}
                      </span>
                    </div>
                    {achievement.institution && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>Institution:</strong> {achievement.institution}
                        </span>
                      </div>
                    )}
                  </div>

                  {achievement.skills.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Related Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {achievement.skills.map((skill: string) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Supporting Files */}
              <Card>
                <CardHeader>
                  <CardTitle>Supporting Documents</CardTitle>
                  <CardDescription>
                    {achievement.files.length} file{achievement.files.length !== 1 ? "s" : ""} attached
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievement.files.map((file: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Review Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Decision</CardTitle>
                  <CardDescription>Provide feedback and make your decision</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="feedback">Feedback for Student</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Provide constructive feedback, suggestions, or comments..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setAction("approve")}
                      variant={action === "approve" ? "default" : "outline"}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => setAction("changes")}
                      variant={action === "changes" ? "default" : "outline"}
                      className="flex-1"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Request Changes
                    </Button>
                    <Button
                      onClick={() => setAction("reject")}
                      variant={action === "reject" ? "destructive" : "outline"}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>

                  {action && (
                    <div className="pt-4 border-t">
                      <Button onClick={handleSubmit} className="w-full">
                        Submit Decision
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Student Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Student Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">{achievement.student.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.student.email}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Major</p>
                      <p className="text-sm text-muted-foreground">{achievement.student.major}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Academic Year</p>
                      <p className="text-sm text-muted-foreground">{achievement.student.year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Current GPA</p>
                      <p className="text-sm text-muted-foreground">{achievement.student.gpa}/4.0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submission Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Submission Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(achievement.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {achievement.previousSubmissions > 0 && (
                    <div>
                      <p className="text-sm font-medium">Previous Submissions</p>
                      <p className="text-sm text-muted-foreground">{achievement.previousSubmissions}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">Review Priority</p>
                    <Badge
                      className={
                        achievement.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : achievement.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {achievement.priority}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Review Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Verify authenticity of documents</p>
                  <p>• Check achievement relevance to academic goals</p>
                  <p>• Ensure proper documentation is provided</p>
                  <p>• Provide constructive feedback for improvements</p>
                  <p>• Consider student's academic standing</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
