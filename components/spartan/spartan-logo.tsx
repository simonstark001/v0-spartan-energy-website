"use client"

import { motion } from "framer-motion"

interface SpartanLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function SpartanLogo({ className = "", size = "md", animated = true }: SpartanLogoProps) {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
  }

  const { width, height } = sizes[size]

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  }

  const helmetVariants = {
    initial: { rotate: 0 },
    hover: { rotate: [-2, 2, -2, 0], transition: { duration: 0.5 } },
  }

  const Wrapper = animated ? motion.div : "div"
  const wrapperProps = animated
    ? {
        initial: "initial",
        whileHover: "hover",
        variants: logoVariants,
      }
    : {}

  return (
    <Wrapper className={`flex items-center gap-3 cursor-pointer ${className}`} {...wrapperProps}>
      <motion.div
        variants={animated ? helmetVariants : undefined}
        className="relative"
      >
        {/* Spartan Helmet SVG */}
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield/Circle Background */}
          <circle cx="50" cy="50" r="48" fill="#0A192F" stroke="#F5A623" strokeWidth="2" />
          
          {/* Helmet Crest/Plume */}
          <motion.path
            d="M50 8 C50 8, 65 20, 65 35 C65 35, 50 30, 50 30 C50 30, 35 35, 35 35 C35 20, 50 8, 50 8"
            fill="#BC171F"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          
          {/* Main Helmet Body */}
          <motion.path
            d="M30 35 
               C30 35, 28 55, 30 70
               L35 75
               L35 55
               C35 55, 40 50, 50 50
               C60 50, 65 55, 65 55
               L65 75
               L70 70
               C72 55, 70 35, 70 35
               C70 35, 65 25, 50 25
               C35 25, 30 35, 30 35"
            fill="#e6f1ff"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Face Guard/Visor */}
          <motion.path
            d="M38 55 L38 72 L42 75 L42 58 C42 58, 46 55, 50 55 C54 55, 58 58, 58 58 L58 75 L62 72 L62 55"
            fill="#0A192F"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          
          {/* Eye Slit */}
          <motion.rect
            x="36"
            y="42"
            width="28"
            height="6"
            rx="1"
            fill="#0A192F"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />
          
          {/* Gold Accent Lines */}
          <motion.line
            x1="30"
            y1="35"
            x2="70"
            y2="35"
            stroke="#F5A623"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </svg>
      </motion.div>

      <div className="flex flex-col">
        <motion.span
          className="text-lg font-bold tracking-wider text-foreground leading-none"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          SPARTAN <span className="text-[#F5A623]">ENERGY</span>
        </motion.span>
        <motion.span
          className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Pioneering Solar Infrastructure
        </motion.span>
      </div>
    </Wrapper>
  )
}
