import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore"

export type Trip = {
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
  createdAt?: Timestamp
}

// Add a new trip
export const addTrip = async (trip: Trip) => {
  try {
    const tripWithTimestamp: any = {
      ...trip,
      createdAt: Timestamp.now(),
    }

    // Remove aiSummary if it's not provided
    if (!trip.aiSummary) {
      delete tripWithTimestamp.aiSummary
    }

    const docRef = await addDoc(collection(db, "trips"), tripWithTimestamp)
    return { id: docRef.id, ...tripWithTimestamp }
  } catch (error) {
    console.error("Error adding trip:", error)
    throw error
  }
}

// Get trips for a specific user
export const getTrips = async (userId: string) => {
  try {
    const q = query(
      collection(db, "trips"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Trip[]
  } catch (error) {
    console.error("Error getting trips:", error)
    throw error
  }
}

// Update a trip
export const updateTrip = async (tripId: string, tripData: Partial<Trip>) => {
  try {
    const tripRef = doc(db, "trips", tripId)
    await updateDoc(tripRef, tripData)
    return { id: tripId, ...tripData }
  } catch (error) {
    console.error("Error updating trip:", error)
    throw error
  }
}

// Delete a trip
export const deleteTrip = async (tripId: string) => {
  try {
    const tripRef = doc(db, "trips", tripId)
    await deleteDoc(tripRef)
    return tripId
  } catch (error) {
    console.error("Error deleting trip:", error)
    throw error
  }
}
