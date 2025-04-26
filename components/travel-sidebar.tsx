"use client"
import { Search, PlusSquare, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "./auth-provider"
import { UserMenu } from "./user-menu"

// Simplified categories
const categories = [
  { name: "All", icon: null },
  { name: "Mountains", icon: null },
  { name: "Nature", icon: null },
  { name: "Adventure", icon: null },
  { name: "Relaxation", icon: null },
  { name: "Urban", icon: null },
]

export function TravelSidebar() {
  const {
    setShowLogin,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setShowCreateTrip,
    trips,
    setSelectedTrip,
    selectedTrip,
    loading,
  } = useSidebar()

  const { user } = useAuth()
  const [categoryOpen, setCategoryOpen] = useState(false)

  const handleCreateTrip = () => {
    if (!user) {
      setShowLogin(true)
    } else {
      setShowCreateTrip(true)
    }
  }

  // Filter trips based on selected category
  const filteredTrips =
    selectedCategory && selectedCategory !== "All" ? trips.filter((trip) => trip.category === selectedCategory) : trips

  // Further filter by search query if present
  const searchedTrips = searchQuery
    ? filteredTrips.filter(
        (trip) =>
          trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredTrips

  return (
    <div className="w-64 border-r border-gray-200 h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">TravelMind</h1>
          <p className="text-xs text-gray-500">Your travel memories</p>
        </div>
        {user && <UserMenu />}
      </div>

      <div className="p-4">
        <Button onClick={handleCreateTrip} className="w-full bg-black hover:bg-gray-800 text-white">
          <PlusSquare className="mr-2 h-4 w-4" />
          New Trip
        </Button>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search trips..."
            className="pl-8 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <DropdownMenu open={categoryOpen} onOpenChange={setCategoryOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between border-gray-200 bg-white">
              {selectedCategory || "All Categories"}
              {categoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100%-2rem)]">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.name}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category.name === "All" ? null : category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-sm font-medium text-gray-500 mb-3">TRIPS</h2>
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-2">
            {searchedTrips.length > 0 ? (
              searchedTrips.map((trip) => (
                <button
                  key={trip.id}
                  className={`w-full text-left p-3 transition-all ${
                    selectedTrip?.id === trip.id ? "bg-gray-100 border-l-2 border-black" : "bg-white hover:bg-gray-50"
                  } shadow-subtle`}
                  onClick={() => setSelectedTrip(trip)}
                >
                  <div className="text-sm font-medium text-gray-900">{trip.title}</div>
                  <div className="text-xs text-gray-500">
                    {trip.date} • {trip.category}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center p-4 text-gray-500 text-sm">
                {user ? "No trips found" : "Sign in to view your trips"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
