"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseOpacity: number
  color: string
  flareTimer: number
  isFlaring: boolean
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  const colors = ["#F5A623", "#E8B84A", "#D4920F", "#FFBE3D"]

  const createParticle = useCallback((width: number, height: number): Particle => {
    const baseOpacity = Math.random() * 0.4 + 0.1
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(Math.random() * 0.3 + 0.1), // Drift upward like heat haze
      size: Math.random() * 2.5 + 0.5,
      opacity: baseOpacity,
      baseOpacity,
      color: colors[Math.floor(Math.random() * colors.length)],
      flareTimer: Math.random() * 500 + 200, // Random time until flare
      isFlaring: false,
    }
  }, [])

  const initParticles = useCallback((width: number, height: number) => {
    // Increased particle count
    const particleCount = Math.floor((width * height) / 8000)
    particles.current = Array.from({ length: Math.min(particleCount, 180) }, () =>
      createParticle(width, height)
    )
  }, [createParticle])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)

    particles.current.forEach((particle, i) => {
      // Update position - drift upward
      particle.x += particle.vx
      particle.y += particle.vy

      // Occasional flare effect
      particle.flareTimer--
      if (particle.flareTimer <= 0 && !particle.isFlaring) {
        if (Math.random() < 0.02) { // 2% chance to start flaring
          particle.isFlaring = true
          particle.flareTimer = 60 // Flare duration
        } else {
          particle.flareTimer = Math.random() * 300 + 100
        }
      }

      if (particle.isFlaring) {
        // Flare: brighten then dim
        const flareProgress = 1 - (particle.flareTimer / 60)
        if (flareProgress < 0.5) {
          particle.opacity = particle.baseOpacity + (0.6 * (flareProgress * 2))
        } else {
          particle.opacity = particle.baseOpacity + (0.6 * (2 - flareProgress * 2))
        }
        particle.flareTimer--
        if (particle.flareTimer <= 0) {
          particle.isFlaring = false
          particle.flareTimer = Math.random() * 500 + 200
          particle.opacity = particle.baseOpacity
        }
      }

      // Mouse interaction - subtle attraction
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 180) {
        const force = (180 - dist) / 180
        particle.vx += (dx / dist) * force * 0.008
        particle.vy += (dy / dist) * force * 0.008
      }

      // Apply friction
      particle.vx *= 0.995
      particle.vy *= 0.998

      // Reset at top, respawn at bottom
      if (particle.y < -10) {
        particle.y = height + 10
        particle.x = Math.random() * width
      }
      // Wrap horizontal
      if (particle.x < 0) particle.x = width
      if (particle.x > width) particle.x = 0

      // Draw particle with glow for flaring ones
      if (particle.isFlaring) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity * 0.2
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.fill()

      // Draw connections (fewer for performance)
      if (i % 2 === 0) {
        particles.current.slice(i + 1, i + 10).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = ((80 - distance) / 80) * 0.08
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      }
    })

    ctx.globalAlpha = 1
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawParticles(ctx, canvas.width, canvas.height)
    animationRef.current = requestAnimationFrame(animate)
  }, [drawParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    handleResize()
    animate()

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, initParticles])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
