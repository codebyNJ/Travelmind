import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBlujwSg80a7CBGSGtR_rWkAiNIDKzC9dM",
  authDomain: "travel-3cf03.firebaseapp.com",
  projectId: "travel-3cf03",
  storageBucket: "travel-3cf03.firebasestorage.app",
  messagingSenderId: "1044141809089",
  appId: "1:1044141809089:web:468524c047c04c4259e340",
  measurementId: "G-GY34S4HYZQ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
