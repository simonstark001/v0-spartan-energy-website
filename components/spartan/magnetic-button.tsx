"use client"

import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  href?: string
  icon?: ReactNode
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const variantStyles = {
    primary:
      "bg-[#BC171F] text-white hover:bg-[#d41920] shadow-lg shadow-[#BC171F]/25",
    secondary:
      "bg-[#112240] text-foreground hover:bg-[#1d3a5f] border border-[#8892b0]/20",
    outline:
      "bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background",
    ghost:
      "bg-transparent text-foreground hover:bg-[#112240]",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-semibold tracking-wider uppercase
    rounded-sm transition-colors duration-300
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `

  const Component = href ? motion.a : motion.button

  const props = href ? { href } : { onClick }

  return (
    <Component
      ref={ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      className={baseStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && (
        <motion.span
          className="inline-flex"
          initial={{ x: 0 }}
          whileHover={{ x: -2 }}
        >
          {icon}
        </motion.span>
      )}
      <span>{children}</span>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-sm opacity-0 overflow-hidden"
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>
    </Component>
  )
}
