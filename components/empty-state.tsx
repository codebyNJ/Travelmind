"use client"

import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

interface EmptyStateProps {
  isAuthenticated: boolean
  onCreateTrip: () => void
}

export function EmptyState({ isAuthenticated, onCreateTrip }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="max-w-md text-center p-8">
        <Compass className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">Select a Trip</h3>
        <p className="text-gray-600 mb-6">
          {isAuthenticated
            ? "Choose a trip from the sidebar or create a new one to view details"
            : "Login to start documenting your travel experiences"}
        </p>
        <Button onClick={onCreateTrip} className="bg-black hover:bg-gray-800 text-white px-6">
          {isAuthenticated ? "Create New Trip" : "Get Started"}
        </Button>
      </div>
    </div>
  )
}
