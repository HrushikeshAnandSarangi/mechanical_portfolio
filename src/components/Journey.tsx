"use client"

import { useEffect, useRef, useState } from "react"
import { PenToolIcon as Tool, Lightbulb, Cog, Ruler, CheckCircle, Zap } from "lucide-react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
const journeySteps = [
  {
    title: "Spark of Innovation",
    description:
      "It all began with a challenge that lit a fire within me. Leading the mechanical subsystem for the Intelligent Ground Vehicle Competition at NIT Rourkela, I faced the daunting task of designing a lightweight yet robust chassis to conquer treacherous terrains. That moment—envisioning a vehicle defying obstacles—ignited my passion for robotics and set me on a path to innovate relentlessly.",
    icon: Lightbulb,
    color: "bg-blue-50/[0.8] border-blue-200/[0.5]",
    iconColor: "text-blue-600",
  },
  {
    title: "Designing the Future",
    description:
      "Ideas danced from my mind to the screen, transforming into intricate 3D models. For the 6-DOF Mechanical Arm, I poured my creativity into SolidWorks, crafting a high-precision arm. Through ANSYS structural analysis, I ensured every curve and joint could withstand real-world demands, blending the artistry of design with the rigor of engineering.",
    icon: Ruler,
    color: "bg-purple-50/[0.8] border-purple-200/[0.5]",
    iconColor: "text-purple-600",
  },
  {
    title: "Engineering Precision",
    description:
      "With designs in hand, I tackled the challenge of making them move. For the 6-Wheeled Rover, I engineered a rocker-bogie suspension system, using MATLAB to calculate motor torque for a blazing 5 m/s speed on a 45-degree incline. Each calculation was a step toward mastering rocky terrains, proving that precision could tame the wildest challenges.",
    icon: Cog,
    color: "bg-pink-50/[0.8] border-pink-200/[0.5]",
    iconColor: "text-pink-600",
  },
  {
    title: "Building & Refining",
    description:
      "Prototyping was where dreams met reality. For the Hexapod project, I wielded 3D printing and precision manufacturing to bring components to life. Dynamic analysis guided countless iterations, each one refining the hexapod's gait until it danced across diverse terrains with grace—a testament to my grit and commitment to perfection.",
    icon: Tool,
    color: "bg-teal-50/[0.8] border-teal-200/[0.5]",
    iconColor: "text-teal-600",
  },
  {
    title: "Delivering Excellence",
    description:
      "The final act was delivering solutions that inspire. My Rubik's Cube Solver, crafted with adaptable mechanisms in SolidWorks, didn't just solve puzzles—it redefined possibilities. Its precision and flexibility for cubes of any size embodied my journey: turning complex challenges into elegant, impactful solutions that leave a lasting mark.",
    icon: CheckCircle,
    color: "bg-yellow-50/[0.8] border-yellow-200/[0.5]",
    iconColor: "text-yellow-600",
  },
]

// Floating shapes for background animation
interface AnimationProps {
  initial: { y?: number; rotate?: number };
  animate: { y?: number[]; rotate?: number[] };
  transition: {
    duration: number;
    repeat: number;
    ease: string;
    delay?: number;
  };
}

const FloatingShape = ({ className, animationProps }: { className: string; animationProps: AnimationProps }) => (
  <motion.div
    className={`absolute opacity-20 ${className}`}
    animate={animationProps.animate}
    transition={animationProps.transition}
    initial={animationProps.initial}
  />
)

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState(0)
  const controls = useAnimation()
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.2 })

  // Optimized step refs using a single ref callback
  const stepRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const registerStepRef = (index: number) => (node: HTMLDivElement | null) => {
    if (node) stepRefs.current.set(index, node)
    else stepRefs.current.delete(index)
  }

  // Optimized intersection observer with fewer state updates
  useEffect(() => {
    if (stepRefs.current.size === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLDivElement
          const index = Number.parseInt(target.dataset.index || "0")

          if (entry.isIntersecting) {
            setActiveStep(index)
          }
        })
      },
      { threshold: 0.6, rootMargin: "-10% 0px -10% 0px" },
    )

    stepRefs.current.forEach((ref) => observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  // Animate timeline when in view
  useEffect(() => {
    if (timelineInView) {
      controls.start("visible")
    }
  }, [timelineInView, controls])

  // Animation variants - optimized for performance
  const profileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  }

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  // Background floating shapes animation configurations
  const floatingShapes = [
    {
      className: "w-24 h-24 rounded-full bg-blue-400 top-20 left-[10%]",
      animationProps: {
        initial: { y: 0 },
        animate: { y: [0, -30, 0] },
        transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      },
    },
    {
      className: "w-32 h-32 rounded-full bg-purple-400 bottom-40 right-[5%]",
      animationProps: {
        initial: { y: 0 },
        animate: { y: [0, 40, 0] },
        transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 },
      },
    },
    {
      className: "w-40 h-40 rounded-full bg-pink-400 top-[40%] left-[5%]",
      animationProps: {
        initial: { y: 0 },
        animate: { y: [0, 50, 0] },
        transition: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 },
      },
    },
    {
      className: "w-20 h-20 rounded-full bg-teal-400 top-[30%] right-[15%]",
      animationProps: {
        initial: { y: 0 },
        animate: { y: [0, -40, 0] },
        transition: { duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 },
      },
    },
    {
      className: "w-36 h-36 rounded-full bg-yellow-400 bottom-20 left-[20%]",
      animationProps: {
        initial: { y: 0 },
        animate: { y: [0, -30, 0] },
        transition: { duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 },
      },
    },
    {
      className: "w-48 h-48 rounded-full bg-blue-400 top-[60%] right-[10%]",
      animationProps: {
        initial: { y: 0 },
        animate: { y: [0, 30, 0] },
        transition: { duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 },
      },
    },
    // Geometric shapes
    {
      className: "w-32 h-32 rotate-45 bg-purple-400 top-[20%] left-[30%]",
      animationProps: {
        initial: { rotate: 45 },
        animate: { rotate: [45, 90, 45] },
        transition: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      },
    },
    {
      className: "w-24 h-24 rotate-12 bg-pink-400 bottom-[15%] right-[25%]",
      animationProps: {
        initial: { rotate: 12 },
        animate: { rotate: [12, -12, 12] },
        transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 },
      },
    },
  ]

  // Gear animation for engineering theme
  const gearVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape, index) => (
          <FloatingShape key={index} className={shape.className} animationProps={shape.animationProps} />
        ))}

        {/* Engineering-themed background elements */}
        <motion.div
          className="absolute w-64 h-64 border-8 border-dashed border-blue-200/30 rounded-full top-[10%] left-[50%] transform -translate-x-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute w-96 h-96 border-4 border-purple-200/20 rounded-full top-[30%] left-[60%]"
          variants={gearVariants}
          animate="animate"
        >
          {/* Gear teeth */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-16 bg-purple-200/20"
              style={{
                transformOrigin: "center 192px",
                transform: `rotate(${i * 30}deg)`,
                left: "calc(50% - 16px)",
                top: "-16px",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute w-72 h-72 border-4 border-teal-200/20 rounded-full bottom-[10%] right-[10%]"
          variants={gearVariants}
          animate="animate"
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {/* Gear teeth */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-12 bg-teal-200/20"
              style={{
                transformOrigin: "center 144px",
                transform: `rotate(${i * 36}deg)`,
                left: "calc(50% - 12px)",
                top: "-12px",
              }}
            />
          ))}
        </motion.div>

        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiNmNiMiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Profile Section with Enhanced Aesthetics */}
        <motion.div
          variants={profileVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center justify-between mb-20 bg-white/[0.9] backdrop-blur-[8px] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] p-8 border border-blue-200/[0.5] relative overflow-hidden"
        >
          {/* Decorative elements inside profile card */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-50/30 blur-3xl"></div>
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-purple-50/30 blur-3xl"></div>

          <div className="md:w-2/5 mb-8 md:mb-0 flex justify-center relative">
            <motion.div
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-200/[0.5] shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
              whileHover={{ scale: 1.03, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="https://res.cloudinary.com/dk6m1qejk/image/upload/v1747665889/WhatsApp_Image_2025-04-12_at_16.26.46_57e1487d_rzmavb.jpg"
                alt="Shantanu Panda"
                width={256}
                height={256}
                className="object-cover"
                priority
              />

              {/* Animated ring around profile image */}
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-dashed border-blue-300/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>

            {/* Floating icons around profile */}
            <motion.div
              className="absolute -top-4 -right-4 bg-blue-100 p-2 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Cog className="text-blue-600 w-6 h-6" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-purple-100 p-2 rounded-full shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            >
              <Ruler className="text-purple-600 w-6 h-6" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-8 bg-pink-100 p-2 rounded-full shadow-lg"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
            >
              <Zap className="text-pink-600 w-6 h-6" />
            </motion.div>
          </div>

          <div className="md:w-3/5 md:pl-10 relative">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Hello, I&apos;m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-pink-700">
                Shantanu Panda
              </span>
            </h2>
            <h3 className="text-xl text-gray-700 mb-4 font-medium">Mechatronics Engineer & Robotics Enthusiast</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              With a B.Tech in Mechanical Engineering from NIT Rourkela, I craft robotic systems that push
              boundaries. From leading the Cyborg Robotics Club to designing a 6-wheeled rover that conquers rugged
              terrains, my work weaves creativity, precision, and technology into solutions that inspire.
            </p>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={skillsContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {["SolidWorks", "ANSYS", "MATLAB", "Robotics", "3D Printing", "Automation"].map((skill, index) => (
                <motion.span
                  key={index}
                  variants={skillItemVariants}
                  className="px-4 py-1.5 bg-blue-50/[0.8] text-blue-700 rounded-full text-sm font-medium shadow-[0_4px_10px_rgba(59,130,246,0.15)] transition-all duration-200 hover:shadow-[0_6px_15px_rgba(59,130,246,0.25)] hover:bg-blue-100/[0.8] hover:-translate-y-1"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Decorative circuit lines */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,30 L30,30 L30,10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M70,10 L70,30 L90,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M90,70 L70,70 L70,90" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M30,90 L30,70 L10,70" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="10" cy="30" r="3" fill="#3b82f6" />
                <circle cx="30" cy="10" r="3" fill="#3b82f6" />
                <circle cx="90" cy="30" r="3" fill="#3b82f6" />
                <circle cx="70" cy="10" r="3" fill="#3b82f6" />
                <circle cx="90" cy="70" r="3" fill="#3b82f6" />
                <circle cx="70" cy="90" r="3" fill="#3b82f6" />
                <circle cx="30" cy="90" r="3" fill="#3b82f6" />
                <circle cx="10" cy="70" r="3" fill="#3b82f6" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Journey Section with Enhanced Visual Elements */}
        <div className="mb-16 relative" ref={timelineRef}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-900 mb-16 relative"
          >
            <span className="relative z-10 inline-block">
              A Saga of Engineering Innovation
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </motion.h2>

          <div className="relative">
            {/* Timeline Line with Flowing Gradient */}
            <motion.div
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1"
              style={{
                backgroundImage: "linear-gradient(to bottom, #3b82f6, #ec4899, #3b82f6)",
                backgroundSize: "100% 200%",
              }}
              animate={{ backgroundPositionY: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Journey Steps with Enhanced Visual Elements */}
            {journeySteps.map((step, index) => {
              const StepIcon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  ref={registerStepRef(index)}
                  data-index={index}
                  variants={stepVariants}
                  initial="hidden"
                  animate={controls}
                  custom={index}
                  className={`relative flex flex-col md:flex-row items-center mb-20`}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:order-last md:pl-12"}`}>
                    <motion.div
                      className={`p-6 rounded-xl border ${step.color} backdrop-blur-[4px] shadow-[0_12px_48px_rgba(0,0,0,0.05)] transition-all duration-500 relative overflow-hidden`}
                      animate={
                        activeStep === index
                          ? { y: [0, 5, 0], boxShadow: "0 0 20px rgba(59,130,246,0.5)" }
                          : { y: 0, boxShadow: "none" }
                      }
                      transition={{
                        y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        boxShadow: { duration: 0.5 },
                      }}
                    >
                      {/* Decorative elements inside step card */}
                      <div
                        className={`absolute top-0 ${isEven ? "right" : "left"}-0 w-1/3 h-1 bg-gradient-to-r from-transparent ${isEven ? "to-blue-400/30" : "from-blue-400/30 to-transparent"}`}
                      ></div>
                      <div
                        className={`absolute bottom-0 ${!isEven ? "right" : "left"}-0 w-1/3 h-1 bg-gradient-to-r ${!isEven ? "from-transparent to-purple-400/30" : "from-purple-400/30 to-transparent"}`}
                      ></div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2 justify-start md:justify-end">
                        {!isEven && (
                          <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <StepIcon className={`${step.iconColor}`} size={24} />
                          </motion.div>
                        )}
                        {step.title}
                        {isEven && (
                          <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          >
                            <StepIcon className={`${step.iconColor}`} size={24} />
                          </motion.div>
                        )}
                      </h3>
                      <p className="text-gray-700 leading-relaxed relative z-10">{step.description}</p>

                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAxMCBMIDUwIDEwIE0gMTAgMzAgTCA1MCAzMCBNIDEwIDUwIEwgNTAgNTAgTSAxMCAxMCBMIDEwIDUwIE0gMzAgMTAgTCAzMCA1MCBNIDUwIDEwIEwgNTAgNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
                    </motion.div>
                  </div>

                  {/* Timeline Node with Enhanced Animation */}
                  <motion.div
                    className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.5)] z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {/* Pulse effect for active step */}
                    {activeStep === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-blue-400"
                        animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                      />
                    )}
                  </motion.div>

                  <div className={`md:w-1/2 ${!isEven ? "md:pr-12" : "md:order-last md:pl-12"}`}></div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
