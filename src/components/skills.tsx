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
  Filter,
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  // const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
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
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  // Toggle all categories
  const toggleAllCategories = () => {
    if (expandedCategories.length === filteredCategories.length) {
      setExpandedCategories([])
    } else {
      setExpandedCategories(filteredCategories.map((cat) => cat.name))
    }
  }

  // Get top skills across all categories
  const getTopSkills = () => {
    const allSkills = skillCategories.flatMap((category) =>
      category.skills.map((skill) => ({
        ...skill,
        category: category.name,
        categoryColor: category.color,
      })),
    )
    return allSkills.sort((a, b) => b.proficiency - a.proficiency).slice(0, 5)
  }

  const topSkills = getTopSkills()

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white" ref={skillsRef}>
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiNmNiMiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
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
            Expertise across mechanical engineering, robotics, and software development
          </p>
        </motion.div>

        {/* Top Skills Highlight - Recruiter-friendly summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 p-6 bg-white rounded-xl border border-gray-200 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">Key Expertise</span>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Recruiter Summary
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topSkills.map((skill, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-sm font-medium text-gray-700">{skill.proficiency}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.1 * index }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1">{skill.category}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter - More compact and professional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm appearance-none min-w-[180px]"
              >
                <option value="">All Categories</option>
                {skillCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleAllCategories}
              className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              {expandedCategories.length === filteredCategories.length ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </motion.div>

        {/* Skill Level Legend - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex flex-wrap gap-4 justify-between">
            {skillLevelDescriptions.map((level, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-12 h-2 rounded-full bg-gradient-to-r from-blue-200 to-blue-600 opacity-[0.2]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${level.range[1]}%` }}
                  ></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{level.label}</p>
                  <p className="text-xs text-gray-500">{level.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories - More professional layout */}
        {filteredCategories.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-4"
          >
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={categoryVariants}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Category Header */}
                <div
                  className={`p-4 cursor-pointer flex items-center justify-between ${
                    expandedCategories.includes(category.name) ? "border-b border-gray-100" : ""
                  }`}
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>{category.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <span className="text-sm text-gray-500">
                      ({category.skills.length} skill{category.skills.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                  <div>
                    {expandedCategories.includes(category.name) ? (
                      <ChevronUp className="text-gray-500" size={18} />
                    ) : (
                      <ChevronDown className="text-gray-500" size={18} />
                    )}
                  </div>
                </div>

                {/* Skills List */}
                <AnimatePresence>
                  {expandedCategories.includes(category.name) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 py-3"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="relative p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <h4 className="text-base font-medium text-gray-900">{skill.name}</h4>
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="ml-2 text-sm text-gray-500"
                                >
                                  {skill.proficiency}%
                                </motion.span>
                              </div>
                              <span className="text-sm font-medium text-gray-700 px-2 py-0.5 bg-gray-100 rounded-full">
                                {getSkillLevel(skill.proficiency).label}
                              </span>
                            </div>

                            {/* Skill Bar */}
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                variants={skillBarVariants}
                                initial="hidden"
                                animate="visible"
                                custom={skill.proficiency}
                              />
                            </div>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <p className="text-gray-500">No skills match your search criteria. Try adjusting your filters.</p>
          </motion.div>
        )}

        {/* Skills Distribution - Recruiter-friendly visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 p-6 bg-white rounded-lg border border-gray-200 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Distribution</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Category distribution */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Expertise by Category</h4>
              {skillCategories.map((category, index) => {
                const avgProficiency =
                  category.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / category.skills.length

                return (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className={`p-1 rounded-md mr-2 ${category.color}`}>{category.icon}</span>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm">{Math.round(avgProficiency)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${category.color.replace("bg-", "bg-")}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${avgProficiency}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right side: Proficiency level distribution */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Proficiency Level Distribution</h4>

              {/* Calculate distribution of skills by proficiency level */}
              {(() => {
                const allSkills = skillCategories.flatMap((category) => category.skills)
                const totalSkills = allSkills.length

                return skillLevelDescriptions.map((level, index) => {
                  const skillsInLevel = allSkills.filter(
                    (skill) => skill.proficiency >= level.range[0] && skill.proficiency <= level.range[1],
                  )
                  const percentage = (skillsInLevel.length / totalSkills) * 100

                  return (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{level.label}</span>
                        <span className="text-sm">
                          {skillsInLevel.length} skills ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                        />
                      </div>
                    </div>
                  )
                })
              })()}

              <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Professional Summary:</span> Highly skilled mechanical engineer with
                  expert-level proficiency in mechanical design, simulation & analysis, and software tools. Advanced
                  knowledge in robotics, thermal sciences, and fluid mechanics.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
