"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-provider"
// Add import for auth
import { auth } from "@/lib/firebase"

interface SignupFormProps {
  onSignup: () => void
  onCancel: () => void
  onSwitchToLogin: () => void
}

export function SignupForm({ onSignup, onCancel, onSwitchToLogin }: SignupFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { signUpWithEmail, signInWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await signUpWithEmail(email, password)
      onSignup()
    } catch (err) {
      // Error handling is done in the auth provider
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle()
      // Only proceed to onSignup if no error was thrown
      if (auth.currentUser) {
        onSignup()
      }
    } catch (err) {
      // Error handling is done in the auth provider
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border-gray-200"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={onCancel} className="border-gray-200">
            Cancel
          </Button>
          <Button type="submit" className="bg-black hover:bg-gray-800">
            Sign Up
          </Button>
        </div>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        <Button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign up with Google
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Note: Google sign-in may not work in development environments. Use email/password if you encounter issues.
        </p>
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-black underline">
            Log in
          </button>
        </div>
      </form>
    </div>
  )
}
