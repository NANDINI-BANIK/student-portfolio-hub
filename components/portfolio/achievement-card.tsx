"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Eye, FileText, Calendar, Building } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Achievement {
  id: string
  title: string
  description: string
  category: string
  date: string
  institution: string
  skills: string[]
  status: "approved" | "pending" | "rejected"
  submittedAt: string
  approvedBy?: string | null
  approvedAt?: string | null
  files: string[]
}

interface AchievementCardProps {
  achievement: Achievement
  onDelete: (id: string) => void
}

export function AchievementCard({ achievement, onDelete }: AchievementCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(achievement.status)}>{achievement.status}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(achievement.id)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-lg leading-tight">{achievement.title}</CardTitle>
        <CardDescription className="line-clamp-2">{achievement.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category */}
        <Badge variant="outline">{achievement.category}</Badge>

        {/* Date and Institution */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(achievement.date)}</span>
          </div>
          {achievement.institution && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{achievement.institution}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {achievement.skills.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Skills</p>
            <div className="flex flex-wrap gap-1">
              {achievement.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {achievement.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{achievement.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Files */}
        {achievement.files.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>
              {achievement.files.length} file{achievement.files.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Approval Info */}
        {achievement.status === "approved" && achievement.approvedBy && (
          <div className="text-xs text-muted-foreground pt-2 border-t">
            Approved by {achievement.approvedBy} on {formatDate(achievement.approvedAt!)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
