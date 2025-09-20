"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "student" | "faculty" | "admin" | "employer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  institution?: string
  department?: string
  verified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string, role: UserRole, institution?: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "student@university.edu",
    name: "Alex Johnson",
    role: "student",
    institution: "University of Technology",
    department: "Computer Science",
    verified: true,
  },
  {
    id: "2",
    email: "faculty@university.edu",
    name: "Dr. Sarah Wilson",
    role: "faculty",
    institution: "University of Technology",
    department: "Computer Science",
    verified: true,
  },
  {
    id: "3",
    email: "employer@techcorp.com",
    name: "Michael Chen",
    role: "employer",
    institution: "TechCorp Inc.",
    verified: true,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("portfolio-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    // Mock authentication - in real app, this would call your auth API
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "password") {
      setUser(foundUser)
      localStorage.setItem("portfolio-user", JSON.stringify(foundUser))
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    institution?: string,
  ): Promise<boolean> => {
    setLoading(true)

    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      institution,
      verified: role === "student" ? false : true, // Students need verification
    }

    setUser(newUser)
    localStorage.setItem("portfolio-user", JSON.stringify(newUser))
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("portfolio-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}
