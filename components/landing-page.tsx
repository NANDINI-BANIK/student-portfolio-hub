"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Users, FileText, Shield, Search } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { FacultyDashboard } from "@/components/dashboards/faculty-dashboard"
import { EmployerDashboard } from "@/components/dashboards/employer-dashboard"

export function LandingPage() {
  const { user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Portfolio Hub</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{user.role}</Badge>
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        {user.role === "student" && <StudentDashboard />}
        {user.role === "faculty" && <FacultyDashboard />}
        {user.role === "employer" && <EmployerDashboard />}
      </div>
    )
  }

  if (showLogin) {
    return (
      <LoginForm
        onBack={() => setShowLogin(false)}
        onRegister={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />
    )
  }

  if (showRegister) {
    return (
      <RegisterForm
        onBack={() => setShowRegister(false)}
        onLogin={() => {
          setShowRegister(false)
          setShowLogin(true)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Hub</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowLogin(true)}>
              Login
            </Button>
            <Button onClick={() => setShowRegister(true)}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
            Showcase Your Academic Journey with
            <span className="text-blue-600"> Verified Achievements</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-pretty">
            Build professional portfolios that consolidate your academic records, co-curricular activities, and
            achievements into one verified, shareable platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setShowRegister(true)} className="bg-blue-600 hover:bg-blue-700">
              Create Your Portfolio
            </Button>
            <Button size="lg" variant="outline">
              View Sample Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need for Professional Success
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive tools for students, faculty, and employers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Verified Achievements</CardTitle>
              <CardDescription>
                Faculty-approved uploads ensure authenticity and credibility of all achievements
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <FileText className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Professional Portfolios</CardTitle>
              <CardDescription>
                Auto-generate beautiful PDF and web portfolios ready for job applications
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Search className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Employer Discovery</CardTitle>
              <CardDescription>
                Advanced search filters help employers find candidates by skills and achievements
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Award className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Badge System</CardTitle>
              <CardDescription>
                Earn and display verified badges for skills, certifications, and accomplishments
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Endorsements</CardTitle>
              <CardDescription>
                Get endorsements from faculty and peers to strengthen your professional profile
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-indigo-600 mb-4" />
              <CardTitle>Academic Integration</CardTitle>
              <CardDescription>
                Seamlessly connect with institutional systems for automatic record updates
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Build Your Professional Portfolio?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students showcasing their achievements and landing better opportunities
          </p>
          <Button size="lg" variant="secondary" onClick={() => setShowRegister(true)}>
            Start Building Today
          </Button>
        </div>
      </section>
    </div>
  )
}
