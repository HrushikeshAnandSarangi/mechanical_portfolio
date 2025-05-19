"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"


const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-gray-100/[0.4]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
    const cn = (...classes: (string | undefined)[]) => {
        return classes.filter(Boolean).join(' ')
    }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
        scale: 1,
      }}
      transition={{
        duration: 3,
        delay,
        ease: [0.22, 0.78, 0.38, 1], // Softer custom Bezier for smooth entry
        opacity: { duration: 1.5 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          times: [0, 0.4, 0.6, 1], // Smooth timing for oscillation
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[4px] border-2 border-gray-200/[0.5]",
            "shadow-[0_12px_48px_8px_rgba(0,0,0,0.08)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.5),transparent_60%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric({
  title1 = "Creating Solutions",
  title2 = "Driving Automation",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: 0.6 + i * 0.3, // Increased stagger for smoother sequence
        ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing
      },
    }),
  }

    const cn = (...classes: (string | undefined)[]) => {
        return classes.filter(Boolean).join(' ')
    }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f5f7fa]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/[0.3] via-purple-200/[0.3] to-pink-300/[0.3] backdrop-blur-[8px]" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.4}
          width={600}
          height={140}
          rotate={12}
          gradient="from-blue-400/[0.4]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.6}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-pink-400/[0.4]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.5}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-purple-400/[0.4]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.8}
          width={200}
          height={60}
          rotate={20}
          gradient="from-yellow-400/[0.4]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.9}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-teal-400/[0.4]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />

        <ElegantShape
          delay={1.0}
          width={400}
          height={100}
          rotate={10}
          gradient="from-green-400/[0.4]"
          className="right-[5%] md:right-[10%] bottom-[15%] md:bottom-[20%]"
        />

        <ElegantShape
          delay={1.1}
          width={250}
          height={70}
          rotate={-20}
          gradient="from-orange-400/[0.4]"
          className="left-[-5%] md:left-[0%] top-[50%] md:top-[55%]"
        />

        <ElegantShape
          delay={1.2}
          width={180}
          height={50}
          rotate={15}
          gradient="from-red-400/[0.4]"
          className="right-[25%] md:right-[30%] top-[25%] md:top-[30%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="h-full bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700 block whitespace-nowrap overflow-hidden text-ellipsis">{title1}</span>
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-gray-900 to-pink-700",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Turning complex challenges into precision-driven solutions through the art of mechatronics and robotics.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f7fa]/70 via-transparent to-[#f5f7fa]/70 pointer-events-none" />
    </div>
  )
}