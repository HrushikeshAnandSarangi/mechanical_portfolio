"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { User, GraduationCap, Briefcase, Award, Users, MapPin } from "lucide-react"
import dynamic from "next/dynamic"
const L: { Icon?: typeof Icon } = typeof window !== "undefined" ? window.L : {}
import { useSectionInView } from "../hooks/useSection"

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

// Import Leaflet CSS
import "leaflet/dist/leaflet.css"
import type { Icon } from "leaflet"
// Define custom marker icon to fix the marker issue
const customIcon = (typeof window !== "undefined" && L && L.Icon)
  ? new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  : undefined

interface Section {
  id: string
  label: string
  icon: React.ElementType
}

const sections: Section[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "responsibilities", label: "Responsibilities", icon: Users },
]

const AboutSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  // Track section visibility with refs
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    personal: null,
    education: null,
    experience: null,
    achievements: null,
    responsibilities: null,
  })

  // Use our custom hook for section tracking
  const activeSection = useSectionInView(sectionRefs.current)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Ensure map renders correctly
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize()
      }, 300)
    }
  }, [activeSection])

  // Scroll to section on click
  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }



  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden ">
        {/* Blueprint grid */}
        <motion.div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiNmNiMiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.02, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } }
        />

        {/* Vibrant blurred circles */}
        <motion.div
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-400/30 blur-3xl -top-32 -right-32"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-purple-400/30 blur-3xl -bottom-32 -left-32"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-pink-400/30 blur-3xl top-20 left-20"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-teal-400/30 blur-3xl bottom-20 right-20"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-yellow-400/20 blur-3xl top-1/2 left-1/3"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
        />

        {/* Geometric shapes */}
        <motion.div
          className="absolute w-16 h-16 border-2 border-blue-300/60 rounded-full top-[15%] left-[15%]"
          animate={{
            y: [-15, 15, -15],
            x: [-5, 15, -5],
            opacity: [0.6, 0.9, 0.6],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-12 h-12 border-2 border-purple-300/60 rounded-lg rotate-45 bottom-[20%] right-[10%]"
          animate={{
            y: [10, -20, 10],
            x: [-10, 20, -10],
            opacity: [0.6, 0.9, 0.6],
            rotate: [45, 90, 45],
          }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute w-20 h-20 border-2 border-pink-300/60 hexagon top-[40%] left-[25%]"
          animate={{
            y: [-20, 20, -20],
            x: [10, -10, 10],
            opacity: [0.6, 0.9, 0.6],
            rotate: [0, -60, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-14 h-14 border-2 border-teal-300/60 top-[30%] right-[25%]"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
            opacity: [0.6, 0.9, 0.6],
            rotate: [0, 120, 0],
          }}
          transition={{ duration: 17, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute w-10 h-10 border-2 border-yellow-300/60 bottom-[15%] left-[40%]"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
          animate={{
            y: [10, -10, 10],
            x: [-10, 10, -10],
            opacity: [0.6, 0.9, 0.6],
            rotate: [0, 60, 0],
          }}
          transition={{ duration: 19, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
        />
        <motion.div
          className="absolute w-24 h-24 border-2 border-indigo-300/40 rounded-full top-[60%] right-[35%]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-16 h-16 border-2 border-orange-300/50 top-[10%] right-[45%]"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          animate={{
            y: [-20, 20, -20],
            x: [20, -20, 20],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center sm:text-left"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 relative inline-block">
            About Me
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto sm:mx-0 text-lg sm:text-xl">
            Explore my journey as a mechanical engineering student at NIT Rourkela, focusing on robotics and automation
            projects.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Sidebar - No Animations */}
          <div
            className="lg:sticky top-4 z-40 bg-blue-50 border border-blue-200 rounded-2xl shadow-lg p-6 w-full lg:col-span-1 max-h-[calc(100vh-2rem)] overflow-auto"
            style={{
              height: "fit-content",
            }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Navigate</h3>
            <div className="space-y-3">
              {sections.map((section) => {
                const SectionIcon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                  >
                    <SectionIcon size={20} className={activeSection === section.id ? "text-white" : "text-blue-600"} />
                    <span className="font-medium text-base">{section.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:col-span-2 space-y-12">
            {/* Personal Info */}
            <motion.div
              ref={(el) => {
                sectionRefs.current.personal = el
              }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white/90 border border-gray-200/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600"
                >
                  <User className="w-6 h-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">Personal Info</h3>
              </div>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Name:</span> Shantanu Panda
                  </p>
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:121me1026@nitrkl.ac.in"
                      className="text-blue-600 hover:underline transition-all duration-300 hover:text-blue-800"
                    >
                      121me1026@nitrkl.ac.in
                    </a>
                  </p>
                  <p className="text-gray-700 text-lg">
                    <span className={`font-semibold ${isMobile ? 'mobile' : ''}`}>Mobile:</span>{" "}
                    <a
                      href="tel:+918249454407"
                      className="text-blue-600 hover:underline transition-all duration-300 hover:text-blue-800"
                    >
                      +91-8249454407
                    </a>
                  </p>
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">GitHub:</span>{" "}
                    <a
                      href="https://github.com/shantanu-github"
                      className="text-blue-600 hover:underline transition-all duration-300 hover:text-blue-800"
                    >
                      shantanu-github
                    </a>
                  </p>
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">LinkedIn:</span>{" "}
                    <a
                      href="https://linkedin.com/in/ShantanuPanda-linkedin"
                      className="text-blue-600 hover:underline transition-all duration-300 hover:text-blue-800"
                    >
                      ShantanuPanda-linkedin
                    </a>
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">About Me</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    I am a mechanical engineering student at NIT Rourkela, working on robotics and automation projects.
                    My experience includes designing and fabricating components for intelligent ground vehicles and
                    mechanical arms, using tools like SolidWorks and ANSYS.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin size={24} className="text-blue-600" /> Location
                  </h4>
                  <p className="text-gray-700 text-lg mb-4">NIT Rourkela, Odisha, India</p>
                  <div className="h-64 sm:h-80 w-full rounded-lg overflow-hidden border border-gray-200/50 backdrop-blur-lg shadow-md">
                    {typeof window !== "undefined" && (
                      <MapContainer
                        center={[22.2528, 84.9016]}
                        zoom={15}
                        style={{ height: "100%", width: "100%" }}
                        className="z-10"
                        ref={mapRef}
                        whenReady={() => {
                          mapRef.current?.invalidateSize()
                        }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker
                          position={[22.2528, 84.9016]}
                          icon={customIcon}
                        >
                          <Popup>NIT Rourkela</Popup>
                        </Marker>
                      </MapContainer>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              ref={(el) => { sectionRefs.current.education = el }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white/90 border border-gray-200/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600"
                >
                  <GraduationCap className="w-6 h-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              </div>
              <div className="space-y-8">
                {[
                  {
                    title: "B.Tech in Mechanical Engineering",
                    institution: "National Institute of Technology, Rourkela",
                    score: "CGPA: 7.92",
                  },
                  {
                    title: "Class XII CBSE",
                    institution: "Delhi Public School, IOPCL Paradip Refinery",
                    score: "Percentage: 93.4%",
                  },
                  {
                    title: "Class X CBSE",
                    institution: "Delhi Public School, IOPCL Paradip Refinery",
                    score: "Percentage: 89.4%",
                  },
                ].map((edu, index) => (
                  <motion.div
                    key={edu.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50 hover:bg-blue-50/80 transition-all duration-300 hover:translate-x-1"
                  >
                    <h4 className="text-xl font-semibold text-gray-900">{edu.title}</h4>
                    <p className="text-gray-700 text-lg mt-1">{edu.institution}</p>
                    <p className="text-blue-600 text-base mt-1 font-medium">{edu.score}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              ref={(el) => { sectionRefs.current.experience = el }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white/90 border border-gray-200/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600"
                >
                  <Briefcase className="w-6 h-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
              </div>
              <div className="space-y-8">
                {[
                  {
                    title: "Intelligent Ground Vehicle",
                    role: "Mechanical Subsystem Lead, Cyborg Robotics Club",
                    period: "Dec 2022 - Present",
                    description:
                      "Led the design and fabrication of a chassis for an intelligent ground vehicle, ensuring compliance with competition standards. Utilized SolidWorks for 3D modeling and ANSYS for structural simulations, optimizing strength, weight, and cost. Managed manufacturing via 3D printing, welding, and laser cutting, coordinating with vendors for component procurement.",
                  },
                  {
                    title: "6 DOF Mechanical Arm",
                    role: "Mechanical Design Engineer, Cyborg Robotics Club",
                    period: "Mar 2024 - Present",
                    description:
                      "Engineered a 3 DOF mechanical arm for automation tasks, focusing on structural and dynamic analysis using ANSYS. Performed motor calculations in MATLAB to determine torque and speed requirements, selecting high-precision joints and motors with encoders to ensure smooth operation.",
                  },
                  {
                    title: "6-Wheeled Rover",
                    role: "Lead Designer and Researcher, Cyborg Robotics Club",
                    period: "Jan 2023 - Sep 2023",
                    description:
                      "Led the design and research of a 6-wheeled rover optimized for rocky terrains, using SolidWorks for design and MATLAB for motor calculations. Implemented a rocker-bogie suspension system and differential mechanism for enhanced stability and maneuverability.",
                  },
                  {
                    title: "Holonomic Art Bot",
                    role: "Design Engineer, Cyborg Robotics Club",
                    period: "Aug 2022 - Mar 2023",
                    description:
                      "Engineered and optimized the chassis for a 3-wheeled holonomic drive bot for precise floor drawing tasks, using SolidWorks for design and MATLAB for power and torque calculations. Ensured structural integrity and weight distribution for seamless integration with electronics.",
                  },
                  {
                    title: "Hexapod",
                    role: "Design and Manufacturing Lead, Cyborg Robotics Club",
                    period: "Jan 2023 - Aug 2023",
                    description:
                      "Designed a hexapod robot optimized for stable locomotion across diverse terrains, using SolidWorks for design and analysis. Led manufacturing using 3D printing and integrated servo motors and control systems for synchronized leg movement.",
                  },
                  {
                    title: "Rubik's Cube Solver",
                    role: "Design Engineer, Cyborg Robotics Club",
                    period: "Aug 2022 - Feb 2023",
                    description:
                      "Engineered a Rubik's Cube solver with precise mechanical design using SolidWorks. Conducted calculations for motor torque, gear ratios, and actuator movements, integrating adjustable grips and sensors for compatibility with various cube sizes.",
                  },
                ].map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="relative pl-6 border-l-2 border-blue-300 hover:border-blue-600 transition-all duration-300"
                  >
                    <motion.div
                      className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.2 + 0.1 * index, duration: 0.3, type: "spring" }}
                    />
                    <h4 className="text-xl font-semibold text-gray-900">{exp.title}</h4>
                    <p className="text-blue-600 font-medium mt-1">{exp.role}</p>
                    <p className="text-gray-500 text-sm mt-1">{exp.period}</p>
                    <p className="text-gray-700 text-base leading-relaxed mt-3">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              ref={(el) => { sectionRefs.current.achievements = el }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white/90 border border-gray-200/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600"
                >
                  <Award className="w-6 h-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">Achievements</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Achieved a CGPA of 7.92 in B.Tech Mechanical Engineering at NIT Rourkela.",
                  "Secured 93.4% in Class XII CBSE at Delhi Public School, IOPCL Paradip Refinery.",
                  "Attained 89.4% in Class X CBSE at Delhi Public School, IOPCL Paradip Refinery.",
                ].map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
                    className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 hover:bg-blue-50/80 transition-all duration-300 hover:translate-x-1"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.3 + 0.1 * index, duration: 0.3, type: "spring" }}
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mt-0.5"
                    >
                      <Award className="w-3 h-3" />
                    </motion.div>
                    <p className="text-gray-700 text-lg">{achievement}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Positions of Responsibility */}
            <motion.div
              ref={(el) => { sectionRefs.current.responsibilities = el }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white/90 border border-gray-200/50 backdrop-blur-lg rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600"
                >
                  <Users className="w-6 h-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">Positions of Responsibility</h3>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "Mechanical Lead, Institute Robotics Club",
                    period: "May 2022 - Present",
                    description:
                      "Managed and oversaw major robotics projects at Cyborg Robotics Club, mentored junior members in design and fabrication, and secured funding for initiatives.",
                  },
                  {
                    title: "Coordinator, Deathrace and Robusumo, InnoVision",
                    period: "November 2023",
                    description:
                      "Managed two events at NIT Rourkela's tech fest with over 600 participants. Oversaw procurement, scheduling, and fixtures, and secured funding and sponsorships.",
                  },
                ].map((position, index) => (
                  <motion.div
                    key={position.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 + 0.1 * index, duration: 0.5 }}
                    className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50 hover:bg-blue-50/80 transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    <h4 className="text-xl font-semibold text-gray-900">{position.title}</h4>
                    <p className="text-blue-600 text-base mt-1 font-medium">{position.period}</p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-3">{position.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.3 },
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="sr-only">Scroll to top</span>
        <motion.div
          className="absolute inset-0 rounded-full z-[-1] bg-blue-600"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0)",
              "0 0 0 8px rgba(59, 130, 246, 0.2)",
              "0 0 0 0 rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.button>

      {/* Custom CSS for hexagon shape */}
      <style jsx>{`
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </section>
  )
}

export default AboutSection
