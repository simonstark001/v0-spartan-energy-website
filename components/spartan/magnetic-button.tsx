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
      "bg-[#BC171F] text-white hover:brightness-110 shadow-lg shadow-[#BC171F]/25",
    secondary:
      "bg-transparent text-white border border-white/80 hover:bg-white/5",
    outline:
      "bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0A192F]",
    ghost:
      "bg-transparent text-[#94A3B8] hover:text-white hover:bg-white/5",
  }

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-10 py-5 text-base",
  }

  const baseStyles = `
    relative inline-flex items-center justify-center gap-3
    font-semibold tracking-[0.15em] uppercase
    rounded-none transition-all duration-300
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
      <span>{children}</span>
      {icon && (
        <motion.span
          className="inline-flex"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {icon}
        </motion.span>
      )}
      
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
