"use client"

import { useRef, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  href?: string
  icon?: ReactNode
}

interface Ripple {
  id: number
  x: number
  y: number
}

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  href,
  icon,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = { id: Date.now(), x, y }
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  const variantStyles = {
    primary: "bg-[#BC171F] text-white",
    secondary: "bg-transparent text-white border border-white/60",
    outline: "bg-transparent text-white border-2 border-white",
    ghost: "bg-transparent text-[#94A3B8]",
  }

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-10 py-5 text-base",
  }

  const baseStyles = `
    relative inline-flex items-center justify-center gap-3
    font-semibold tracking-[0.15em] uppercase
    rounded-none overflow-hidden
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `

  const Component = href ? motion.a : motion.button
  const props = href ? { href } : { onClick: handleClick }

  return (
    <Component
      ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      className={baseStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: isHovered ? 1.05 : 1,
        boxShadow: variant === "primary" && isHovered 
          ? "0 0 40px rgba(188, 23, 31, 0.5)" 
          : "0 0 0px rgba(188, 23, 31, 0)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
            animate={{ 
              width: 300, 
              height: 300, 
              x: -150, 
              y: -150, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Secondary button fill from left effect */}
      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      )}

      {/* Border brighten for secondary */}
      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 border border-white pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <span className="relative z-10">{children}</span>
      
      {/* Conveyor arrow animation */}
      {icon && (
        <span className="relative z-10 w-5 h-5 overflow-hidden">
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            animate={{ 
              x: isHovered ? 24 : 0,
              opacity: isHovered ? 0 : 1
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ x: -24, opacity: 0 }}
            animate={{ 
              x: isHovered ? 0 : -24,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
        </span>
      )}
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 overflow-hidden pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>
    </Component>
  )
}
