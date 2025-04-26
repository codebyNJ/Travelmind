"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "./auth-provider"
import { addTrip } from "./trip-service"
import { useToast } from "@/components/ui/use-toast"

interface CreateTripFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function CreateTripForm({ onSubmit, onCancel }: CreateTripFormProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [mood, setMood] = useState("")
  const [weather, setWeather] = useState("")
  const [companions, setCompanions] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a trip",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const tripData = {
        userId: user.uid,
        title,
        date,
        category,
        description,
        location,
        mood,
        weather,
        companions: companions
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c),
      }

      await addTrip(tripData)

      toast({
        title: "Success!",
        description: "Your trip has been created successfully.",
      })

      onSubmit(tripData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive",
      })
      console.error("Error creating trip:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Trip Title</Label>
          <Input
            id="title"
            placeholder="e.g., Hiking in the Rockies"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border-gray-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="border-gray-200">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mountains">Mountains</SelectItem>
                <SelectItem value="Nature">Nature</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Relaxation">Relaxation</SelectItem>
                <SelectItem value="Urban">Urban</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., Rocky Mountain National Park, Colorado"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-gray-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mood">Mood</Label>
            <Input
              id="mood"
              placeholder="e.g., Exhilarated"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weather">Weather</Label>
            <Input
              id="weather"
              placeholder="e.g., Sunny, 65°F"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companions">Travel Companions (comma separated)</Label>
          <Input
            id="companions"
            placeholder="e.g., Alex, Jamie, Sam"
            value={companions}
            onChange={(e) => setCompanions(e.target.value)}
            className="border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Trip Notes</Label>
          <Textarea
            id="description"
            placeholder="Describe your trip experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="border-gray-200"
          />
        </div>

        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={onCancel} className="border-gray-200">
            Cancel
          </Button>
          <Button type="submit" className="bg-black hover:bg-gray-800" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Trip"}
          </Button>
        </div>
      </form>
    </div>
  )
}
