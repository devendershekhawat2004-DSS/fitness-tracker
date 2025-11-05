"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { RefreshCw } from "lucide-react"

const HARDCODED_QUOTES = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Success is not final, failure is not fatal.",
    author: "Winston Churchill",
  },
  {
    text: "Strength does not come from what you can do. It comes from overcoming the things you once thought you couldn't.",
    author: "Rikki Rogers",
  },
  {
    text: "Your body can stand almost anything. It's your mind that you need to convince.",
    author: "Andrew Murphy",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
  },
  {
    text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown",
  },
]

export default function MotivationPage() {
  const [quote, setQuote] = useState(HARDCODED_QUOTES[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    getNewQuote()
  }, [])

  const getNewQuote = () => {
    const randomQuote = HARDCODED_QUOTES[Math.floor(Math.random() * HARDCODED_QUOTES.length)]
    setQuote(randomQuote)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white drop-shadow-lg">Daily Motivation 🔥</h1>
          <p className="text-white/80 text-lg">Get inspired to crush your fitness goals</p>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          className="glass rounded-2xl p-12 text-center max-w-2xl mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          key={quote.text}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-relaxed">"{quote.text}"</p>
            <p className="text-white/70 text-lg">— {quote.author}</p>
          </motion.div>
        </motion.div>

        {/* New Quote Button */}
        <motion.button
          onClick={getNewQuote}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-5 h-5" />
          Get New Quote
        </motion.button>

        {/* Inspiration Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { emoji: "🎯", title: "Set Goals", desc: "Define what you want to achieve" },
            { emoji: "⏰", title: "Stay Consistent", desc: "Show up every single day" },
            { emoji: "🏆", title: "Track Progress", desc: "Celebrate small wins" },
            { emoji: "🧠", title: "Mind Over Matter", desc: "Push through the hard days" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="glass rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
