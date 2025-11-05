"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ExerciseCard } from "@/components/exercise-card"
import { AnimatedCounter } from "@/components/animated-counter"
import { Trash2 } from "lucide-react"

interface ExerciseData {
  pushups: number
  squats: number
  pullups: number
}

const STORAGE_KEY = "fitness-tracker-data"
const RESET_KEY = "fitness-tracker-date"

export default function Home() {
  const [exercises, setExercises] = useState<ExerciseData>({
    pushups: 0,
    squats: 0,
    pullups: 0,
  })
  const [mounted, setMounted] = useState(false)
  const [showReset, setShowReset] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const today = new Date().toISOString().split("T")[0]
    const lastResetDate = localStorage.getItem(RESET_KEY)

    // Reset if it's a new day
    if (lastResetDate !== today) {
      localStorage.setItem(RESET_KEY, today)
      localStorage.removeItem(STORAGE_KEY)
      setExercises({ pushups: 0, squats: 0, pullups: 0 })
    } else {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setExercises(JSON.parse(saved))
      }
    }
  }, [])

  // Save data to localStorage
  const saveExercises = (data: ExerciseData) => {
    setExercises(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const handleIncrement = (key: keyof ExerciseData) => {
    const newData = { ...exercises, [key]: exercises[key] + 1 }
    saveExercises(newData)
  }

  const handleDecrement = (key: keyof ExerciseData) => {
    const newData = { ...exercises, [key]: Math.max(0, exercises[key] - 1) }
    saveExercises(newData)
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to clear today's data?")) {
      saveExercises({ pushups: 0, squats: 0, pullups: 0 })
      setShowReset(false)
    }
  }

  const total = exercises.pushups + exercises.squats + exercises.pullups

  if (!mounted) return null

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white drop-shadow-lg">Today's Workout</h1>
          <p className="text-white/80 text-lg">Keep pushing towards your goals! 🚀</p>
        </motion.div>

        {/* Total Counter */}
        <motion.div
          className="glass rounded-2xl p-8 mb-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Total Exercises</p>
          <motion.div
            className="text-6xl font-bold text-white mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          >
            <AnimatedCounter value={total} />
          </motion.div>

          <div className="flex gap-4 justify-center text-sm text-white/70">
            <div>
              <span className="font-semibold text-primary">
                <AnimatedCounter value={exercises.pushups} />
              </span>{" "}
              Pushups
            </div>
            <div>
              <span className="font-semibold text-secondary">
                <AnimatedCounter value={exercises.squats} />
              </span>{" "}
              Squats
            </div>
            <div>
              <span className="font-semibold text-accent">
                <AnimatedCounter value={exercises.pullups} />
              </span>{" "}
              Pullups
            </div>
          </div>
        </motion.div>

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ExerciseCard
              name="Pushups"
              icon="💪"
              color="from-blue-400 via-blue-500 to-blue-600"
              count={exercises.pushups}
              onIncrement={() => handleIncrement("pushups")}
              onDecrement={() => handleDecrement("pushups")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ExerciseCard
              name="Squats"
              icon="🦵"
              color="from-purple-400 via-purple-500 to-purple-600"
              count={exercises.squats}
              onIncrement={() => handleIncrement("squats")}
              onDecrement={() => handleDecrement("squats")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ExerciseCard
              name="Pullups"
              icon="🤸"
              color="from-pink-400 via-pink-500 to-pink-600"
              count={exercises.pullups}
              onIncrement={() => handleIncrement("pullups")}
              onDecrement={() => handleDecrement("pullups")}
            />
          </motion.div>
        </div>

        {/* Reset Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowReset(!showReset)}
            className="flex items-center gap-2 bg-destructive/20 hover:bg-destructive/30 text-destructive px-6 py-3 rounded-lg transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="w-4 h-4" />
            Reset Today's Data
          </motion.button>

          {showReset && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowReset(false)}
            >
              <motion.div className="glass rounded-xl p-6 max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Clear today's data?</h2>
                <p className="text-foreground/70 mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReset(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-colors font-semibold"
                  >
                    Clear
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
