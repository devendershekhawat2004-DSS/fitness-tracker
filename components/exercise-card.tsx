"use client"

import { motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useEffect, useState } from "react"

interface ExerciseCardProps {
  name: string
  icon: string
  color: string
  count: number
  onIncrement: () => void
  onDecrement: () => void
}

export function ExerciseCard({ name, icon, color, count, onIncrement, onDecrement }: ExerciseCardProps) {
  const [prevCount, setPrevCount] = useState(count)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (count !== prevCount) {
      setAnimate(true)
      setPrevCount(count)
      const timer = setTimeout(() => setAnimate(false), 300)
      return () => clearTimeout(timer)
    }
  }, [count, prevCount])

  return (
    <motion.div
      className="glass rounded-2xl p-6 text-center"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className={`text-5xl mb-4 ${animate ? "animate-pulse-count" : ""}`}>{icon}</div>

      <h3 className="text-lg font-semibold mb-4">{name}</h3>

      <motion.div
        className={`text-4xl font-bold mb-6 bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        animate={animate ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {count}
      </motion.div>

      <div className="flex gap-3 justify-center">
        <motion.button
          onClick={onDecrement}
          className="bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg p-3 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Minus className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={onIncrement}
          className={`${color.replace("from-", "from-").replace("via-", "via-").replace("to-", "to-")} rounded-lg p-3 transition-colors text-white font-semibold`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}
