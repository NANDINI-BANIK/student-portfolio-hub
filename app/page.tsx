import { AuthProvider } from "@/components/auth/auth-provider"
import { LandingPage } from "@/components/landing-page"

export default function Home() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  )
}
