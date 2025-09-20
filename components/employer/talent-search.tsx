"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { StudentProfileModal } from "./student-profile-modal"
import { Search, Star, Bookmark, Eye, MapPin, Award, Users } from "lucide-react"

// Mock student data
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    major: "Computer Science",
    year: "Senior",
    gpa: 3.8,
    university: "University of Technology",
    location: "San Francisco, CA",
    skills: ["React", "Python", "Machine Learning", "Leadership", "Data Analysis"],
    achievements: [
      {
        title: "Dean's List Fall 2024",
        category: "Academic Excellence",
        date: "2024-12-15",
        verified: true,
      },
      {
        title: "Research Publication - AI Conference",
        category: "Research & Publications",
        date: "2024-10-10",
        verified: true,
      },
    ],
    rating: 4.9,
    profileViews: 156,
    lastActive: "2024-12-18",
    portfolioUrl: "/portfolio/alex-johnson",
    isAvailable: true,
    preferredRoles: ["Software Engineer", "Data Scientist", "Research Assistant"],
    graduationDate: "2025-05-15",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@university.edu",
    major: "Data Science",
    year: "Junior",
    gpa: 3.9,
    university: "University of Technology",
    location: "Seattle, WA",
    skills: ["Python", "SQL", "Statistics", "Research", "Tableau", "Machine Learning"],
    achievements: [
      {
        title: "Hackathon Winner - TechFest 2024",
        category: "Competitions & Awards",
        date: "2024-11-20",
        verified: true,
      },
      {
        title: "Data Science Certification",
        category: "Certifications",
        date: "2024-09-15",
        verified: true,
      },
    ],
    rating: 4.8,
    profileViews: 89,
    lastActive: "2024-12-17",
    portfolioUrl: "/portfolio/sarah-chen",
    isAvailable: true,
    preferredRoles: ["Data Analyst", "Research Intern", "Business Intelligence Analyst"],
    graduationDate: "2026-05-15",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@university.edu",
    major: "Software Engineering",
    year: "Senior",
    gpa: 3.7,
    university: "University of Technology",
    location: "Austin, TX",
    skills: ["JavaScript", "Node.js", "AWS", "Project Management", "React", "DevOps"],
    achievements: [
      {
        title: "Leadership Certificate",
        category: "Leadership & Service",
        date: "2024-08-20",
        verified: true,
      },
      {
        title: "AWS Certification",
        category: "Certifications",
        date: "2024-07-10",
        verified: true,
      },
    ],
    rating: 4.7,
    profileViews: 134,
    lastActive: "2024-12-16",
    portfolioUrl: "/portfolio/michael-rodriguez",
    isAvailable: false,
    preferredRoles: ["Full Stack Developer", "DevOps Engineer", "Technical Lead"],
    graduationDate: "2025-05-15",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.wilson@university.edu",
    major: "Cybersecurity",
    year: "Junior",
    gpa: 3.6,
    university: "University of Technology",
    location: "Boston, MA",
    skills: ["Cybersecurity", "Python", "Network Security", "Ethical Hacking", "Risk Assessment"],
    achievements: [
      {
        title: "Cybersecurity Competition Winner",
        category: "Competitions & Awards",
        date: "2024-10-05",
        verified: true,
      },
    ],
    rating: 4.6,
    profileViews: 67,
    lastActive: "2024-12-18",
    portfolioUrl: "/portfolio/emma-wilson",
    isAvailable: true,
    preferredRoles: ["Security Analyst", "Penetration Tester", "Security Consultant"],
    graduationDate: "2026-05-15",
  },
]

export function TalentSearch() {
  const [students, setStudents] = useState(mockStudents)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [savedProfiles, setSavedProfiles] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    skills: [] as string[],
    majors: [] as string[],
    years: [] as string[],
    gpaRange: [3.0, 4.0] as number[],
    locations: [] as string[],
    availability: "all" as string,
    graduationYear: "all" as string,
  })
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const allSkills = [...new Set(students.flatMap((s) => s.skills))].sort()
  const allMajors = [...new Set(students.map((s) => s.major))].sort()
  const allLocations = [...new Set(students.map((s) => s.location))].sort()

  const handleSaveProfile = (studentId: string) => {
    setSavedProfiles((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    )
  }

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        student.preferredRoles.some((role) => role.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSkills =
        filters.skills.length === 0 || filters.skills.some((skill) => student.skills.includes(skill))

      const matchesMajors = filters.majors.length === 0 || filters.majors.includes(student.major)

      const matchesYears = filters.years.length === 0 || filters.years.includes(student.year)

      const matchesGPA = student.gpa >= filters.gpaRange[0] && student.gpa <= filters.gpaRange[1]

      const matchesLocations = filters.locations.length === 0 || filters.locations.includes(student.location)

      const matchesAvailability =
        filters.availability === "all" ||
        (filters.availability === "available" && student.isAvailable) ||
        (filters.availability === "unavailable" && !student.isAvailable)

      const matchesGraduation =
        filters.graduationYear === "all" ||
        (filters.graduationYear === "2025" && student.graduationDate.includes("2025")) ||
        (filters.graduationYear === "2026" && student.graduationDate.includes("2026"))

      return (
        matchesSearch &&
        matchesSkills &&
        matchesMajors &&
        matchesYears &&
        matchesGPA &&
        matchesLocations &&
        matchesAvailability &&
        matchesGraduation
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "gpa":
          return b.gpa - a.gpa
        case "achievements":
          return b.achievements.length - a.achievements.length
        case "views":
          return b.profileViews - a.profileViews
        case "name":
          return a.name.localeCompare(b.name)
        case "recent":
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        default:
          return 0
      }
    })

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSkillFilter = (skill: string) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const clearFilters = () => {
    setFilters({
      skills: [],
      majors: [],
      years: [],
      gpaRange: [3.0, 4.0],
      locations: [],
      availability: "all",
      graduationYear: "all",
    })
    setSearchTerm("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Talent Search</h2>
          <p className="text-muted-foreground">Discover and connect with verified student talent</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{filteredStudents.length} profiles found</Badge>
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? "List View" : "Grid View"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students, skills, roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills Filter */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 12).map((skill) => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSkillFilter(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Academic Filters */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Academic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Major</label>
                <Select
                  value={filters.majors[0] || "all"}
                  onValueChange={(value) => updateFilter("majors", value === "all" ? [] : [value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Majors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Majors</SelectItem>
                    {allMajors.map((major) => (
                      <SelectItem key={major} value={major}>
                        {major}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Academic Year</label>
                <div className="space-y-2">
                  {["Freshman", "Sophomore", "Junior", "Senior"].map((year) => (
                    <div key={year} className="flex items-center space-x-2">
                      <Checkbox
                        id={year}
                        checked={filters.years.includes(year)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFilter("years", [...filters.years, year])
                          } else {
                            updateFilter(
                              "years",
                              filters.years.filter((y) => y !== year),
                            )
                          }
                        }}
                      />
                      <label htmlFor={year} className="text-sm">
                        {year}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  GPA Range: {filters.gpaRange[0]} - {filters.gpaRange[1]}
                </label>
                <Slider
                  value={filters.gpaRange}
                  onValueChange={(value) => updateFilter("gpaRange", value)}
                  max={4.0}
                  min={2.0}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Other Filters */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Other Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Availability</label>
                <Select value={filters.availability} onValueChange={(value) => updateFilter("availability", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Graduation Year</label>
                <Select value={filters.graduationYear} onValueChange={(value) => updateFilter("graduationYear", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
            Clear All Filters
          </Button>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sort and View Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="gpa">Highest GPA</SelectItem>
                      <SelectItem value="achievements">Most Achievements</SelectItem>
                      <SelectItem value="views">Most Viewed</SelectItem>
                      <SelectItem value="recent">Recently Active</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">{filteredStudents.length} results</p>
              </div>
            </CardContent>
          </Card>

          {/* Student Profiles */}
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{student.rating}</span>
                        </div>
                        {student.isAvailable && <Badge className="bg-green-100 text-green-800">Available</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {student.major} • {student.year} • GPA: {student.gpa}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{student.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>{student.achievements.length} achievements</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveProfile(student.id)}
                      className={savedProfiles.includes(student.id) ? "bg-primary text-primary-foreground" : ""}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Top Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {student.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{student.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Preferred Roles</p>
                    <p className="text-sm text-muted-foreground">{student.preferredRoles.join(", ")}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{student.profileViews} views</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No students match your search criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSave={() => handleSaveProfile(selectedStudent.id)}
          isSaved={savedProfiles.includes(selectedStudent.id)}
        />
      )}
    </div>
  )
}
