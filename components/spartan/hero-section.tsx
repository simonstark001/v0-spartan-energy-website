"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Home, Zap, Award, ArrowRight } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { ParticleField } from "./particle-field"

const stats = [
  { icon: MapPin, label: "Maharashtra & Pan-India" },
  { icon: Home, label: "Residential & Commercial" },
  { icon: Zap, label: "Government Subsidy" },
  { icon: Award, label: "25-Year Warranty" },
]

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
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        delay, 
        duration: 0.6, 
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
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0A192F]/85" />
      </motion.div>

      {/* Particle Field - Gold particles */}
      <ParticleField />

      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
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

      {/* Grid Pattern Overlay (Linear-style) */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Hero Content - Bottom Left (Rivian style) */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-24 pt-40"
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

          {/* Main Headline - Massive, Bebas Neue style */}
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(3.5rem,12vw,7rem)] leading-[0.95] tracking-[0.02em] text-white mb-8">
            <AnimatedWord delay={0.3}>POWER</AnimatedWord>{" "}
            <AnimatedWord delay={0.4}>YOUR</AnimatedWord>{" "}
            <AnimatedWord delay={0.5}>HOME.</AnimatedWord>
            <br />
            <span className="relative inline-block">
              <AnimatedWord delay={0.6}>LOWER</AnimatedWord>{" "}
              <AnimatedWord delay={0.7}>YOUR</AnimatedWord>{" "}
              <span className="relative inline-block">
                <AnimatedWord delay={0.8}>BILLS.</AnimatedWord>
                {/* Thin red underline under BILLS */}
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

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-[#94A3B8] opacity-60 max-w-xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            Smart solar solutions for Indian homes and businesses, engineered for
            long-term savings and energy independence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
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

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap gap-x-8 gap-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
              >
                <stat.icon size={16} className="text-[#F5A623]" strokeWidth={1.5} />
                <span className="text-xs tracking-[0.1em] uppercase text-[#94A3B8] opacity-70">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 hidden md:block"
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
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A192F] to-transparent z-[3] pointer-events-none" />
    </section>
  )
}
