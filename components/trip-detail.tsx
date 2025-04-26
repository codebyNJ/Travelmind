"use client"

import { MapPin, Calendar, CloudSun, Users, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { useSidebar } from "./sidebar-provider"
import { deleteTrip } from "./trip-service"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

interface TripDetailProps {
  trip: {
    id?: string
    userId: string
    title: string
    date: string
    category: string
    description: string
    aiSummary?: string
    location?: string
    mood?: string
    weather?: string
    companions?: string[]
  }
}

export function TripDetail({ trip }: TripDetailProps) {
  const { user } = useAuth()
  const { refreshTrips, setSelectedTrip, setShowCreateTrip } = useSidebar()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!trip.id || !user) return

    if (!confirm("Are you sure you want to delete this trip?")) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteTrip(trip.id)
      toast({
        title: "Success",
        description: "Trip deleted successfully",
      })
      await refreshTrips()
      setSelectedTrip(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete trip",
        variant: "destructive",
      })
      console.error("Error deleting trip:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = () => {
    // In a real app, you would implement edit functionality here
    toast({
      title: "Edit Trip",
      description: "Edit functionality would open here",
    })
  }

  const isOwner = user && trip.userId === user.uid

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{trip.title}</h1>
          <div className="inline-block bg-gray-100 px-2 py-1 text-sm text-gray-700">{trip.category}</div>
        </div>

        {isOwner && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 hover:border-red-200"
            >
              {isDeleting ? (
                <>Deleting...</>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Trip Details</h2>

          <div className="space-y-4">
            {trip.location && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800">{trip.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-gray-800">{trip.date}</p>
              </div>
            </div>

            {trip.weather && (
              <div className="flex items-start">
                <CloudSun className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Weather</p>
                  <p className="text-gray-800">{trip.weather}</p>
                </div>
              </div>
            )}

            {trip.companions && trip.companions.length > 0 && (
              <div className="flex items-start">
                <Users className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Travel Companions</p>
                  <p className="text-gray-800">{trip.companions.join(", ")}</p>
                </div>
              </div>
            )}

            {trip.mood && (
              <div className="flex items-start">
                <div className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex items-center justify-center">😊</div>
                <div>
                  <p className="text-sm text-gray-500">Mood</p>
                  <p className="text-gray-800">{trip.mood}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">My Notes</h2>
          <p className="text-gray-700 leading-relaxed">{trip.description}</p>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white border border-gray-200 p-4">
            <div className="bg-gray-100 h-40 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Photo Memory #{item}</span>
            </div>
            <p className="text-center text-gray-700">Adventure moment #{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
