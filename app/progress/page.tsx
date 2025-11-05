"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

interface DailyData {
  date: string
  pushups: number
  squats: number
  pullups: number
  total: number
}

const PROGRESS_KEY = "fitness-tracker-progress"

export default function ProgressPage() {
  const [data, setData] = useState<DailyData[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const today = new Date().toISOString().split("T")[0]
    const exerciseData = localStorage.getItem("fitness-tracker-data")

    if (exerciseData) {
      const parsed = JSON.parse(exerciseData)
      const progressData = localStorage.getItem(PROGRESS_KEY)
      let history: DailyData[] = progressData ? JSON.parse(progressData) : []

      // Check if we need to save today's data
      if (!history.some((h) => h.date === today)) {
        const total = parsed.pushups + parsed.squats + parsed.pullups
        history.push({
          date: new Date(today).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          pushups: parsed.pushups,
          squats: parsed.squats,
          pullups: parsed.pullups,
          total,
        })

        // Keep last 30 days
        if (history.length > 30) {
          history = history.slice(-30)
        }

        localStorage.setItem(PROGRESS_KEY, JSON.stringify(history))
      }

      setData(history.length > 0 ? history : generateMockData())
    } else {
      setData(generateMockData())
    }
  }, [])

  const generateMockData = (): DailyData[] => {
    const data: DailyData[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const pushups = Math.floor(Math.random() * 30) + 5
      const squats = Math.floor(Math.random() * 40) + 10
      const pullups = Math.floor(Math.random() * 20) + 2

      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        pushups,
        squats,
        pullups,
        total: pushups + squats + pullups,
      })
    }
    return data
  }

  if (!mounted) return null

  const stats = {
    totalWorkouts: data.length,
    averageExercises: Math.round(data.reduce((sum, d) => sum + d.total, 0) / data.length),
    bestDay: data.length > 0 ? Math.max(...data.map((d) => d.total)) : 0,
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white drop-shadow-lg">Your Progress 📈</h1>
          <p className="text-white/80 text-lg mb-8">Track your fitness journey over time</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Workouts", value: stats.totalWorkouts },
            { label: "Avg Daily", value: stats.averageExercises },
            { label: "Best Day", value: stats.bestDay },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <motion.div
          className="glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Exercise Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line type="monotone" dataKey="pushups" stroke="hsl(243, 100%, 56%)" strokeWidth={2} />
              <Line type="monotone" dataKey="squats" stroke="hsl(280, 85%, 50%)" strokeWidth={2} />
              <Line type="monotone" dataKey="pullups" stroke="hsl(357, 100%, 57%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Daily Total</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Bar dataKey="total" fill="hsl(243, 100%, 56%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </main>
    </div>
  )
}
