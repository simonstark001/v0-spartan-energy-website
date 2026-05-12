"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fontWeight="700" fill="#F5A623" fontFamily="system-ui">₹</text>
        <circle cx="16" cy="16" r="14" stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>
    ),
    title: "Financial Freedom",
    body: "Eliminate electricity bills within 5–7 years. Solar assets appreciate your property value and deliver immediate ROI.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 3L8 18H16L14 29L24 14H16L18 3Z" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: "Energy Security",
    body: "Zero dependency on grid fluctuations, load shedding, or tariff hikes. Your power, your terms.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28C22.6 28 28 22.6 28 16" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M24 4C24 4 20 10 16 14C12 18 8 20 8 20" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M28 8C26 6 22 5 18 7C16 11 18 16 22 17C26 18 29 15 28 8Z" stroke="#F5A623" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
    title: "Sustainable Impact",
    body: "Certified high-efficiency panels. Zero-emission generation. Performance guaranteed for 25 years.",
  },
]

export function SpartanAdvantage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0A192F] overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-5">
            <div className="w-[3px] self-stretch bg-[#BC171F] mt-1 shrink-0" />
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.06em] uppercase text-white">
                The Spartan Advantage
              </h2>
              <p className="mt-3 text-[#8892b0] text-base md:text-lg max-w-xl">
                Why leading homeowners and businesses across India choose Spartan Energy for their solar transition.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <AdvantageCard key={card.title} card={card} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AdvantageCard({
  card,
  index,
  isInView,
}: {
  card: (typeof cards)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative flex flex-col gap-5 p-7 md:p-8 rounded-sm cursor-default"
      style={{
        background: "#0D2137",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Hover border glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          border: "1px solid rgba(188, 23, 31, 0.4)",
          boxShadow: "0 0 28px rgba(188, 23, 31, 0.12)",
        }}
      />

      {/* Card glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(ellipse at 30% 0%, rgba(188, 23, 31, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 flex items-center justify-center">
        {card.icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-lg md:text-xl font-semibold text-white tracking-wide">
        {card.title}
      </h3>

      {/* Body */}
      <p className="relative z-10 text-[#8892b0] text-sm md:text-base leading-relaxed">
        {card.body}
      </p>

      {/* Bottom gold accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#F5A623] rounded-b-sm"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  )
}
