"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Cog, Wrench, Cpu, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { MouseEvent } from "react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface MousePosition {
  x: number
  y: number
}

export default function ExploreProjectsCard(): JSX.Element {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for smooth movement
  const springX = useSpring(mouseX, { stiffness: 500, damping: 100 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 100 })

  // Transform values for background gradient
  const gradientX = useTransform(springX, [0, 1], [0, 100])
  const gradientY = useTransform(springY, [0, 1], [0, 100])

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
    setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  // Handle mouse enter
  const handleMouseEnter = (): void => {
    setIsHovered(true)
  }

  // Handle mouse leave
  const handleMouseLeave = (): void => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  // Handle click navigation
  const handleClick = (): void => {
    router.push("/projects")
  }

  // Floating icons animation
  const floatingIcons = [
    { Icon: Cog, delay: 0, x: 20, y: 30 },
    { Icon: Wrench, delay: 0.5, x: 80, y: 20 },
    { Icon: Cpu, delay: 1, x: 70, y: 70 },
    { Icon: BarChart3, delay: 1.5, x: 30, y: 80 },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl cursor-pointer group"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {/* Dynamic Background */}
          <motion.div
            className="absolute inset-0 opacity-90"
            style={{
              background: useTransform(
                [gradientX, gradientY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, 
                    rgba(20, 184, 166, 0.8) 0%, 
                    rgba(59, 130, 246, 0.6) 25%, 
                    rgba(147, 51, 234, 0.4) 50%, 
                    rgba(236, 72, 153, 0.3) 75%, 
                    rgba(20, 184, 166, 0.2) 100%
                  )`,
              ),
            }}
          />

          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />

          {/* Floating Engineering Icons */}
          {floatingIcons.map(({ Icon, delay, x, y }, index) => (
            <motion.div
              key={index}
              className="absolute text-white/20"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Icon size={24} />
            </motion.div>
          ))}

          {/* Cursor Follower */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: mousePosition.x - 50,
              top: mousePosition.y - 50,
              width: 100,
              height: 100,
            }}
            animate={{
              scale: isHovered ? 1 : 0,
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full h-full rounded-full bg-white/30 blur-xl" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left Content */}
              <div className="flex-1 mb-6 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore My Projects</h2>
                  <p className="text-lg md:text-xl text-white/90 mb-6 max-w-lg">
                    Discover innovative mechanical engineering solutions, from advanced simulations to cutting-edge
                    robotics implementations.
                  </p>

                  {/* Project Stats */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="text-2xl font-bold">5+</div>
                      <div className="text-sm text-white/80">Projects</div>
                    </motion.div>
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="text-2xl font-bold">5+</div>
                      <div className="text-sm text-white/80">Technologies</div>
                    </motion.div>
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="text-2xl font-bold">3+</div>
                      <div className="text-sm text-white/80">Years Experience</div>
                    </motion.div>
                  </div>

                  {/* Featured Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["SolidWorks", "Ansys", "MATLAB", "Python", "ROS"].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Content - Call to Action */}
              <div className="flex-shrink-0">
                <motion.div
                  className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
                    <ArrowRight size={32} className="text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Section */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-white/80 text-sm">
                    From concept to implementation • Advanced engineering solutions
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-white/80 text-sm">View Portfolio</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hover Effect Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Engineering Circuit Pattern */}
          <svg className="absolute bottom-4 right-4 w-32 h-32 text-white/10" viewBox="0 0 100 100" fill="none">
            <motion.path
              d="M20 20 L80 20 L80 80 L20 80 Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="15"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.path
              d="M35 35 L65 35 M35 65 L65 65 M35 35 L35 65 M65 35 L65 65"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        {/* Additional Context */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-gray-600 text-sm">
            Click to explore detailed case studies, technical specifications, and project outcomes
          </p>
        </motion.div>
      </div>
    </section>
  )
}
