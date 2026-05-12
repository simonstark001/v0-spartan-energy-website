"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { ParticleField } from "./particle-field"

const trustItems = [
  "Maharashtra & Pan-India",
  "Residential & Commercial",
  "Government Subsidy",
  "25-Year Warranty",
  "Certified Engineers",
  "Premium Panels",
]

// Animated counter component
function AnimatedCounter({ 
  end, 
  duration = 2,
  prefix = "",
  suffix = ""
}: { 
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const controls = animate(count, end, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (end >= 100) {
          setDisplayValue(Math.floor(latest).toLocaleString())
        } else {
          setDisplayValue(latest.toFixed(1))
        }
      }
    })
    return controls.stop
  }, [count, end, duration])

  return <span>{prefix}{displayValue}{suffix}</span>
}

// Word animation component with blur effect
function AnimatedWord({ 
  children, 
  delay 
}: { 
  children: string
  delay: number 
}) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        delay, 
        duration: 0.7, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      {children}
    </motion.span>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background Image with Ken Burns effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')`,
          }}
          animate={{ 
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "reverse"
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0A192F]/85" />
      </motion.div>

      {/* Aurora/Light sweep effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{
            background: `linear-gradient(
              135deg,
              transparent 0%,
              transparent 40%,
              rgba(188, 23, 31, 0.08) 45%,
              rgba(245, 166, 35, 0.06) 50%,
              rgba(188, 23, 31, 0.08) 55%,
              transparent 60%,
              transparent 100%
            )`,
          }}
          animate={{
            x: ["-50%", "50%"],
            y: ["-50%", "50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Particle Field - Gold particles drifting upward */}
      <ParticleField />

      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[1000px] h-[1000px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(245,166,35,0.08) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[800px] h-[800px]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(188,23,31,0.06) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-32 pt-40"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl">
          {/* Pre-headline with animated red line */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="h-[2px] bg-[#BC171F]"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            />
            <span className="text-sm tracking-[0.25em] uppercase text-[#94A3B8] opacity-80">
              Solar Excellence Since 2020
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(3.5rem,12vw,7rem)] leading-[0.95] tracking-[0.02em] text-white mb-6">
            <AnimatedWord delay={0.3}>POWER</AnimatedWord>{" "}
            <AnimatedWord delay={0.4}>YOUR</AnimatedWord>{" "}
            <AnimatedWord delay={0.5}>HOME.</AnimatedWord>
            <br />
            <span className="relative inline-block">
              <AnimatedWord delay={0.6}>LOWER</AnimatedWord>{" "}
              <AnimatedWord delay={0.7}>YOUR</AnimatedWord>{" "}
              <span className="relative inline-block">
                <AnimatedWord delay={0.8}>BILLS.</AnimatedWord>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#BC171F]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </span>
          </h1>

          {/* Live Metrics Bar */}
          <motion.div
            className="flex items-center gap-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold text-white">
                <AnimatedCounter end={500} suffix="+" />
              </span>
              <span className="text-xs tracking-wide uppercase text-[#94A3B8]">Installations</span>
            </div>
            <div className="w-[1px] h-6 bg-[#94A3B8]/30" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold text-white">
                <AnimatedCounter end={2.4} prefix="₹" suffix="Cr" />
              </span>
              <span className="text-xs tracking-wide uppercase text-[#94A3B8]">Savings Generated</span>
            </div>
            <div className="w-[1px] h-6 bg-[#94A3B8]/30" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold text-white">
                <AnimatedCounter end={4.9} suffix="★" />
              </span>
              <span className="text-xs tracking-wide uppercase text-[#94A3B8]">Avg Rating</span>
            </div>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-[#94A3B8] opacity-60 max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            Smart solar solutions for Indian homes and businesses, engineered for
            long-term savings and energy independence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <MagneticButton
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} strokeWidth={2} />}
            >
              Get Your Quote
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
            >
              Commercial Survey
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee Trust Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 py-4 bg-[#0A192F]/80 backdrop-blur-sm border-t border-white/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, i) => (
              <span
                key={i}
                className="text-xs tracking-[0.2em] uppercase text-[#94A3B8]/60 flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-[#F5A623]/60" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 right-8 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#94A3B8] opacity-50 [writing-mode:vertical-lr]">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#94A3B8]/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-12 left-0 right-0 h-32 bg-gradient-to-t from-[#0A192F] to-transparent z-[3] pointer-events-none" />
    </section>
  )
}
