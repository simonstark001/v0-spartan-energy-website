"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

const subsidyRows = [
  { label: "Up to 2 kW", amount: "₹30,000" },
  { label: "2 – 3 kW", amount: "₹60,000" },
  { label: "Above 3 kW", amount: "₹78,000" },
]

const bullets = [
  "Up to ₹78,000 subsidy for residential systems",
  "Additional Maharashtra state benefits",
  "We handle all DISCOM paperwork and applications",
  "Approval typically within 30–45 days",
]

export function SubsidySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0A192F] overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(245,166,35,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Grid texture */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#BC171F]">
                Government Initiative
              </span>
              <div className="h-[1px] w-8 bg-[#BC171F]/50" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Save Up To{" "}
              <span className="text-[#F5A623]">₹78,000</span>
              <br />
              On Your Solar Installation
            </h2>

            {/* Body */}
            <p className="text-[#8892b0] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              The PM Surya Ghar Muft Bijli Yojana provides direct subsidies for
              residential rooftop solar. Maharashtra state schemes add further
              savings for homeowners and agricultural consumers.
            </p>

            {/* Bullets */}
            <ul className="flex flex-col gap-4">
              {bullets.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-[#a8b2d1] text-sm md:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    className="mt-[6px] w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ background: "#F5A623" }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow behind card */}
            <div
              className="absolute -inset-4 rounded-sm pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(188,23,31,0.08) 0%, transparent 70%)",
              }}
            />

            <div
              className="relative overflow-hidden rounded-sm"
              style={{
                background: "#0D2137",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "2px solid #BC171F",
              }}
            >
              {/* Card Header */}
              <div className="px-7 pt-7 pb-5 border-b border-white/[0.06]">
                <h3 className="text-lg font-semibold text-white tracking-wide">
                  Subsidy at a Glance
                </h3>
                <p className="text-[#8892b0] text-sm mt-1">
                  PM Surya Ghar Muft Bijli Yojana — 2024
                </p>
              </div>

              {/* Table */}
              <div className="px-7 py-5">
                {/* Header row */}
                <div className="flex justify-between mb-3 pb-3 border-b border-white/[0.06]">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#8892b0]">
                    System Size
                  </span>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#8892b0]">
                    Subsidy Amount
                  </span>
                </div>

                {/* Rows */}
                <div className="flex flex-col gap-1">
                  {subsidyRows.map((row, i) => (
                    <motion.div
                      key={row.label}
                      className="flex justify-between items-center py-3 px-3 rounded-sm group"
                      style={{ background: "rgba(255,255,255,0.0)" }}
                      whileHover={{ background: "rgba(255,255,255,0.03)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    >
                      <span className="text-[#a8b2d1] text-sm md:text-base">
                        {row.label}
                      </span>
                      <span className="text-[#F5A623] font-semibold text-base md:text-lg">
                        {row.amount}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-7 border-t border-white/[0.06]" />

              {/* CTA */}
              <div className="px-7 py-6">
                <motion.button
                  className="w-full flex items-center justify-center gap-3 py-4 text-sm font-semibold tracking-[0.15em] uppercase text-white rounded-sm relative overflow-hidden group"
                  style={{
                    background: "#BC171F",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  {/* Shine sweep on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                  />
                  <span className="relative z-10">Check Your Eligibility</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>

                <p className="mt-4 text-center text-[#8892b0] text-xs">
                  Free consultation · No commitment required
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
