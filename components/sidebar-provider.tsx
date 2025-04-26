"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-provider"
import { getTrips, type Trip } from "./trip-service"
import { useToast } from "@/components/ui/use-toast"

type SidebarContextType = {
  showLogin: boolean
  setShowLogin: (show: boolean) => void
  showSignup: boolean
  setShowSignup: (show: boolean) => void
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  showCreateTrip: boolean
  setShowCreateTrip: (show: boolean) => void
  selectedTrip: Trip | null
  setSelectedTrip: (trip: Trip | null) => void
  trips: Trip[]
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
  refreshTrips: () => Promise<void>
  loading: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateTrip, setShowCreateTrip] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()

  const refreshTrips = async () => {
    if (!user) {
      setTrips([])
      return
    }

    setLoading(true)
    try {
      const userTrips = await getTrips(user.uid)
      setTrips(userTrips)

      // If we had a selected trip, update it with the refreshed data
      if (selectedTrip) {
        const updatedTrip = userTrips.find((trip) => trip.id === selectedTrip.id)
        if (updatedTrip) {
          setSelectedTrip(updatedTrip)
        } else {
          setSelectedTrip(null)
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your trips. Please try again.",
        variant: "destructive",
      })
      console.error("Error loading trips:", error)
    } finally {
      setLoading(false)
    }
  }

  // Load trips when user changes
  useEffect(() => {
    refreshTrips()
  }, [user])

  return (
    <SidebarContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        showCreateTrip,
        setShowCreateTrip,
        selectedTrip,
        setSelectedTrip,
        trips,
        setTrips,
        refreshTrips,
        loading,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
