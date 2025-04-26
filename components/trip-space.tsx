"use client"

import { useSidebar } from "./sidebar-provider"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { CreateTripForm } from "./create-trip-form"
import { TripDetail } from "./trip-detail"
import { EmptyState } from "./empty-state"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "./auth-provider"

export function TripSpace() {
  const {
    showLogin,
    setShowLogin,
    showSignup,
    setShowSignup,
    showCreateTrip,
    setShowCreateTrip,
    selectedTrip,
    refreshTrips,
  } = useSidebar()

  const { user } = useAuth()

  const handleLoginSuccess = () => {
    setShowLogin(false)
    setShowCreateTrip(true)
  }

  const handleSignupSuccess = () => {
    setShowSignup(false)
    setShowCreateTrip(true)
  }

  const handleCreateTrip = async () => {
    await refreshTrips()
    setShowCreateTrip(false)
  }

  const switchToSignup = () => {
    setShowLogin(false)
    setShowSignup(true)
  }

  const switchToLogin = () => {
    setShowSignup(false)
    setShowLogin(true)
  }

  return (
    <div className="flex-1 overflow-auto bg-white">
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-6 w-full max-w-md shadow-medium"
          >
            <LoginForm
              onLogin={handleLoginSuccess}
              onCancel={() => setShowLogin(false)}
              onSwitchToSignup={switchToSignup}
            />
          </motion.div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-6 w-full max-w-md shadow-medium"
          >
            <SignupForm
              onSignup={handleSignupSuccess}
              onCancel={() => setShowSignup(false)}
              onSwitchToLogin={switchToLogin}
            />
          </motion.div>
        </div>
      )}

      {showCreateTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-6 w-full max-w-md shadow-medium"
          >
            <CreateTripForm onSubmit={handleCreateTrip} onCancel={() => setShowCreateTrip(false)} />
          </motion.div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedTrip ? (
          <motion.div
            key={selectedTrip.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TripDetail trip={selectedTrip} />
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EmptyState
              isAuthenticated={!!user}
              onCreateTrip={() => (user ? setShowCreateTrip(true) : setShowLogin(true))}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
