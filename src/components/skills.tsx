"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Code,
  Cpu,
  Cog,
  Monitor,
  PenToolIcon as ToolIcon,
  Search,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Thermometer,
  Droplet,
} from "lucide-react"

// Skill categories and items
const skillCategories = [
  {
    name: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    color: "bg-blue-50/[0.8] border-blue-200/[0.5] text-blue-600",
    skills: [
      { name: "Python", proficiency: 85 },
      { name: "C++", proficiency: 75 },
    ],
  },
  {
    name: "Operating Systems",
    icon: <Monitor className="w-5 h-5" />,
    color: "bg-purple-50/[0.8] border-purple-200/[0.5] text-purple-600",
    skills: [
      { name: "Linux", proficiency: 80 },
      { name: "Windows", proficiency: 90 },
    ],
  },
  {
    name: "Software Tools",
    icon: <ToolIcon className="w-5 h-5" />,
    color: "bg-pink-50/[0.8] border-pink-200/[0.5] text-pink-600",
    skills: [
      { name: "ROS", proficiency: 75 },
      { name: "AutoCAD", proficiency: 85 },
      { name: "Matlab", proficiency: 80 },
      { name: "OnShape", proficiency: 70 },
      { name: "Ansys", proficiency: 90 },
      { name: "SolidWorks", proficiency: 95 },
      { name: "Arduino", proficiency: 85 },
    ],
  },
  {
    name: "Mechanical Design",
    icon: <Cog className="w-5 h-5" />,
    color: "bg-teal-50/[0.8] border-teal-200/[0.5] text-teal-600",
    skills: [
      { name: "Strength of Materials", proficiency: 90 },
      { name: "Machine Design", proficiency: 95 },
      { name: "CAD/CAM", proficiency: 85 },
      { name: "Product Design and Development", proficiency: 80 },
    ],
  },
  {
    name: "Thermal Sciences",
    icon: <Thermometer className="w-5 h-5" />,
    color: "bg-yellow-50/[0.8] border-yellow-200/[0.5] text-yellow-600",
    skills: [
      { name: "Thermodynamics", proficiency: 85 },
      { name: "Heat Transfer", proficiency: 80 },
      { name: "Refrigeration and Air Conditioning", proficiency: 75 },
    ],
  },
  {
    name: "Fluid Mechanics",
    icon: <Droplet className="w-5 h-5" />,
    color: "bg-blue-50/[0.8] border-blue-200/[0.5] text-blue-600",
    skills: [
      { name: "Fluid Mechanics", proficiency: 85 },
      { name: "Computational Fluid Dynamics (CFD)", proficiency: 80 },
    ],
  },
  {
    name: "Simulation & Analysis",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "bg-purple-50/[0.8] border-purple-200/[0.5] text-purple-600",
    skills: [
      { name: "Finite Element Analysis (FEA)", proficiency: 90 },
      { name: "3D Modeling and Simulation", proficiency: 95 },
    ],
  },
  {
    name: "Robotics",
    icon: <Cpu className="w-5 h-5" />,
    color: "bg-pink-50/[0.8] border-pink-200/[0.5] text-pink-600",
    skills: [
      { name: "Robot Kinematics", proficiency: 85 },
      { name: "Autonomous Systems", proficiency: 80 },
      { name: "Sensor Integration", proficiency: 75 },
    ],
  },
]

// Skill level descriptions
const skillLevelDescriptions = [
  { range: [0, 40], label: "Beginner", description: "Fundamental awareness and basic understanding" },
  { range: [41, 70], label: "Intermediate", description: "Practical application and working knowledge" },
  { range: [71, 85], label: "Advanced", description: "Applied theory and detailed understanding" },
  { range: [86, 100], label: "Expert", description: "Recognized authority with deep expertise" },
]

// Get skill level description based on proficiency
const getSkillLevel = (proficiency: number) => {
  return (
    skillLevelDescriptions.find((level) => proficiency >= level.range[0] && proficiency <= level.range[1]) ||
    skillLevelDescriptions[0]
  )
}

export default function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const skillsRef = useRef(null)
  const isInView = useInView(skillsRef, { once: false, amount: 0.1 })

  // Filter skills based on search term and category
  const filteredCategories = skillCategories.filter((category) => {
    // Filter by selected category
    if (selectedCategory && category.name !== selectedCategory) {
      return false
    }

    // Filter by search term
    if (searchTerm) {
      return (
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    return true
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (proficiency: number) => ({
      width: `${proficiency}%`,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    }),
  }

  // Handle category toggle
  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }

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
    <section className="relative py-16 px-4 overflow-hidden bg-white" ref={skillsRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiNmNiMiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

        {/* Decorative elements */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-100/10 blur-3xl -top-48 -right-48"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-100/10 blur-3xl -bottom-48 -left-48"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        {/* Engineering-themed background elements */}
        <motion.div
          className="absolute w-64 h-64 border-4 border-dashed border-blue-200/10 rounded-full top-[20%] right-[5%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute w-72 h-72 border-4 border-purple-200/10 rounded-full bottom-[10%] left-[5%]"
          variants={gearVariants}
          animate="animate"
        >
          {/* Gear teeth */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-12 bg-purple-200/10"
              style={{
                transformOrigin: "center 144px",
                transform: `rotate(${i * 36}deg)`,
                left: "calc(50% - 12px)",
                top: "-12px",
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
            <span className="relative z-10">
              Technical Skills
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore my technical expertise across mechanical engineering, robotics, and software development.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all md:w-64"
          >
            <option value="">All Categories</option>
            {skillCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Skill Level Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 p-6 bg-white/[0.9] backdrop-blur-[8px] rounded-xl border border-blue-200/[0.5] shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Proficiency Levels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillLevelDescriptions.map((level, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 h-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-600 opacity-[0.2]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${level.range[1]}%` }}
                  ></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{level.label}</p>
                  <p className="text-xs text-gray-500">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories */}
        {filteredCategories.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-6"
          >
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={categoryVariants}
                className={`${category.color} backdrop-blur-[4px] rounded-xl border ${category.color.replace("bg-", "border-")} shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`}
              >
                {/* Category Header */}
                <div className="p-6 cursor-pointer" onClick={() => toggleCategory(category.name)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>{category.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    </div>
                    <div>
                      {expandedCategory === category.name ? (
                        <ChevronUp className="text-gray-500" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-500" size={20} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Skills List */}
                <AnimatePresence>
                  {expandedCategory === category.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="space-y-6">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="relative"
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <h4 className="text-base font-medium text-gray-900">{skill.name}</h4>
                                {hoveredSkill === skill.name && (
                                  <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="ml-2 text-sm text-gray-500"
                                  >
                                    {skill.proficiency}%
                                  </motion.span>
                                )}
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {getSkillLevel(skill.proficiency).label}
                              </span>
                            </div>

                            {/* Interactive Skill Bar */}
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 relative"
                                variants={skillBarVariants}
                                initial="hidden"
                                animate="visible"
                                custom={skill.proficiency}
                              >
                                {/* Animated particles for visual interest */}
                                {hoveredSkill === skill.name && (
                                  <>
                                    <motion.div
                                      className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"
                                      animate={{
                                        x: [0, -10, 0],
                                        opacity: [0, 1, 0],
                                      }}
                                      transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                      }}
                                    />
                                    <motion.div
                                      className="absolute top-1 right-3 w-1 h-1 bg-white rounded-full"
                                      animate={{
                                        x: [0, -8, 0],
                                        opacity: [0, 1, 0],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                        delay: 0.3,
                                      }}
                                    />
                                  </>
                                )}
                              </motion.div>
                            </div>

                            {/* Skill Detail Tooltip */}
                            <AnimatePresence>
                              {hoveredSkill === skill.name && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className="absolute mt-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-full max-w-xs"
                                >
                                  <div className="text-sm">
                                    <p className="font-medium text-gray-900 mb-1">
                                      {getSkillLevel(skill.proficiency).label}
                                    </p>
                                    <p className="text-gray-600">{getSkillLevel(skill.proficiency).description}</p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-500 text-lg">No skills match your search criteria. Try adjusting your filters.</p>
          </motion.div>
        )}

        {/* Interactive Skill Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 p-8 bg-white/[0.9] backdrop-blur-[8px] rounded-xl border border-blue-200/[0.5] shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills Radar Chart</h3>

          <div className="aspect-square max-w-2xl mx-auto relative">
            {/* Radar Chart Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[5, 4, 3, 2, 1].map((level) => (
                <div
                  key={level}
                  className="absolute rounded-full border border-gray-200"
                  style={{
                    width: `${level * 20}%`,
                    height: `${level * 20}%`,
                    opacity: level * 0.15,
                  }}
                ></div>
              ))}

              {/* Radar Axes */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <div
                  key={i}
                  className="absolute h-1/2 w-px bg-gray-200 origin-bottom"
                  style={{ transform: `rotate(${angle}deg)` }}
                ></div>
              ))}
            </div>

            {/* Radar Chart Data Points */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>

                {/* Create polygon for each category */}
                {skillCategories.map((category, categoryIndex) => {
                  const avgProficiency =
                    category.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / category.skills.length
                  const radius = (avgProficiency / 100) * 80 // 80% of the chart radius
                  const angle = (categoryIndex * 360) / skillCategories.length
                  const x = 100 + radius * Math.cos((angle - 90) * (Math.PI / 180))
                  const y = 100 + radius * Math.sin((angle - 90) * (Math.PI / 180))

                  return (
                    <g key={categoryIndex}>
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={4}
                        fill="url(#skillGradient)"
                        initial={{ r: 0 }}
                        animate={{ r: 4 }}
                        transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                      />
                      <motion.line
                        x1={100}
                        y1={100}
                        x2={x}
                        y2={y}
                        stroke="url(#skillGradient)"
                        strokeWidth={2}
                        strokeOpacity={0.7}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.1 * categoryIndex }}
                      />
                      <motion.text
                        x={x + (x > 100 ? 10 : -10)}
                        y={y}
                        textAnchor={x > 100 ? "start" : "end"}
                        alignmentBaseline="middle"
                        fontSize={10}
                        fill="#4b5563"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + 0.1 * categoryIndex }}
                      >
                        {category.name}
                      </motion.text>
                    </g>
                  )
                })}

                {/* Connect the dots to form a polygon */}
                <motion.polygon
                  points={skillCategories
                    .map((category, categoryIndex) => {
                      const avgProficiency =
                        category.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / category.skills.length
                      const radius = (avgProficiency / 100) * 80
                      const angle = (categoryIndex * 360) / skillCategories.length
                      const x = 100 + radius * Math.cos((angle - 90) * (Math.PI / 180))
                      const y = 100 + radius * Math.sin((angle - 90) * (Math.PI / 180))
                      return `${x},${y}`
                    })
                    .join(" ")}
                  fill="url(#skillGradient)"
                  fillOpacity={0.2}
                  stroke="url(#skillGradient)"
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </svg>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>
              This radar chart visualizes my skill proficiency across different categories. Hover over skill bars for
              detailed information.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
