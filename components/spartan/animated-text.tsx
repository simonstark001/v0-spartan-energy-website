"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  type?: "words" | "chars" | "lines"
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  type = "words",
}: AnimatedTextProps) {
  const text = typeof children === "string" ? children : ""

  if (type === "words") {
    const words = text.split(" ")
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: delay + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {index < words.length - 1 && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </span>
    )
  }

  if (type === "chars") {
    const chars = text.split("")
    return (
      <span className={className}>
        {chars.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ y: 50, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.4,
              delay: delay + index * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  // Lines - for multi-line text
  return (
    <motion.span
      className={className}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.span>
  )
}

interface RevealTextProps {
  children: string
  className?: string
  delay?: number
}

export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export function Typewriter({ text, className = "", delay = 0, speed = 50 }: TypewriterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * (speed / 1000),
            duration: 0,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
