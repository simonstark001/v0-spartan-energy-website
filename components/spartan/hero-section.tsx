"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MapPin, Home, Zap, Award, ArrowRight, Play } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { AnimatedText, RevealText } from "./animated-text"
import { ParticleField } from "./particle-field"

const stats = [
  {
    icon: MapPin,
    label: "Serving Maharashtra and Pan-India",
    color: "#BC171F",
  },
  {
    icon: Home,
    label: "Residential and Commercial Solutions",
    color: "#BC171F",
  },
  {
    icon: Zap,
    label: "Government Subsidy Assistance",
    color: "#BC171F",
  },
  {
    icon: Award,
    label: "25-Year Panel Warranty",
    color: "#BC171F",
  },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Main background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#0A192F] to-[#112240]"
          style={{ y: backgroundY }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(188,23,31,0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(245,166,35,0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(136, 146, 176, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(136, 146, 176, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A192F] to-transparent" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-4xl">
          {/* Pre-headline */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="w-12 h-[2px] bg-[#BC171F]"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
              Solar Excellence Since 2020
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            <AnimatedText delay={0.4} type="words">
              Power Your Home.
            </AnimatedText>
            <br />
            <span className="text-gradient-red">
              <AnimatedText delay={0.8} type="words">
                Lower Your Electricity Bills.
              </AnimatedText>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Smart solar solutions for Indian homes and businesses, engineered for
            long-term savings and energy independence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <MagneticButton
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
            >
              Get Your Residential Quote
            </MagneticButton>

            <MagneticButton
              variant="outline"
              size="lg"
            >
              Commercial Site Survey
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              size="lg"
              icon={<Play size={18} className="ml-1" />}
            >
              Watch Video
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators - Scrolling on mobile */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            {/* Gradient fades for mobile scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0A192F] to-transparent z-10 sm:hidden pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A192F] to-transparent z-10 sm:hidden pointer-events-none" />
            
            <div className="flex gap-6 md:gap-8 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3 shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon size={18} style={{ color: stat.color }} />
                  </div>
                  <span className="text-xs sm:text-sm tracking-wider uppercase text-muted-foreground whitespace-nowrap">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#BC171F]"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Background Image Overlay (optional) */}
      <motion.div
        className="absolute inset-0 z-[1] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238892b0' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          y: backgroundY,
        }}
      />
    </section>
  )
}
