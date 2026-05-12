"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Site Survey",
    description: "Our engineers assess your property, roof, and energy needs on-site.",
  },
  {
    number: "02",
    title: "Custom Design",
    description: "Tailored system design — capacity, panel layout, inverter selection.",
  },
  {
    number: "03",
    title: "Expert Installation",
    description: "Certified teams. Most residential installs completed in 1–3 days.",
  },
  {
    number: "04",
    title: "Utility Activation",
    description: "Grid connection, net metering setup, and full system handover.",
  },
]

export function SpartanJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0D2137] overflow-hidden"
    >
      {/* Subtle grid */}
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

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(188,23,31,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-5">
            <div className="w-[3px] self-stretch bg-[#BC171F] mt-1 shrink-0" />
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[0.06em] uppercase text-white">
                The Spartan Journey
              </h2>
              <p className="mt-3 text-[#8892b0] text-base md:text-lg max-w-xl">
                From your first call to full energy independence — a seamless four-step process.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Desktop: 4-column with animated connecting line */}
        <div className="hidden md:block">
          {/* Connecting line container */}
          <div ref={lineRef} className="relative mb-0">
            <div className="absolute top-[28px] left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-[1px] bg-white/[0.06]" />
            <motion.div
              className="absolute top-[28px] left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-[1px] bg-[#BC171F] origin-left"
              style={{ scaleX: lineScaleX }}
            />

            {/* Steps */}
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="relative flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.3 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Node dot on the line */}
                  <div className="relative z-10 mb-8">
                    <motion.div
                      className="w-14 h-14 rounded-full border flex items-center justify-center"
                      style={{
                        background: "#0D2137",
                        borderColor: "rgba(188, 23, 31, 0.5)",
                      }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.18, duration: 0.4 }}
                    >
                      <span className="text-sm font-bold text-[#BC171F] tracking-widest">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <StepContent step={step} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-0 md:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Left: number node + vertical line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0"
                  style={{
                    background: "#0D2137",
                    borderColor: "rgba(188, 23, 31, 0.5)",
                  }}
                >
                  <span className="text-xs font-bold text-[#BC171F] tracking-widest">
                    {step.number}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="w-[1px] flex-1 min-h-[48px] my-2 origin-top"
                    style={{ background: "rgba(188, 23, 31, 0.3)" }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-10">
                <StepContent step={step} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StepContent({ step }: { step: (typeof steps)[0] }) {
  return (
    <div className="relative">
      {/* Ghost large number */}
      <span
        className="absolute -top-2 -left-1 text-[4.5rem] font-black leading-none select-none pointer-events-none"
        style={{ color: "rgba(255,255,255,0.04)" }}
      >
        {step.number}
      </span>

      <h3 className="relative text-lg md:text-xl font-semibold text-white mb-2 mt-1">
        {step.title}
      </h3>
      <p className="relative text-[#8892b0] text-sm md:text-base leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}
