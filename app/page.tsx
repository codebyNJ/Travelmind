import { SidebarProvider } from "@/components/sidebar-provider"
import { AuthProvider } from "@/components/auth-provider"
import { TravelSidebar } from "@/components/travel-sidebar"
import { TripSpace } from "@/components/trip-space"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex h-screen bg-white">
          <TravelSidebar />
          <TripSpace />
        </div>
        <Toaster />
      </SidebarProvider>
    </AuthProvider>
  )
}
