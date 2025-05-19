"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Download, ExternalLink, ChevronDown, ChevronUp, Search, Code, Cpu, Cog, PenToolIcon as Tool, CheckCircle, Lightbulb } from 'lucide-react'


interface Project {
  name: string
  duration: string
  role: string
  description: string
  technologies: string
  details: string
  outcome: string
  icon: React.ElementType
  color: string
  iconColor: string
}

const projects: Project[] = [
  {
    name: "Intelligent Ground Vehicle",
    duration: "Dec 2022 - Present",
    role: "Mechanical Subsystem Lead for IGVC",
    description: "Led the design and fabrication of the chassis, including material selection, budget estimation, and ensuring it met competition standards. Focused on optimizing strength, weight, and cost efficiency.",
    technologies: "SolidWorks (3D modeling), ANSYS (structural, static, and dynamic simulations), 3D printing, welding, metal laser cutting.",
    details: "Designed and analyzed the chassis structure, validated design integrity under various loading conditions (stress, strain, and fatigue tests), and ensured durability and optimal performance. Managed manufacturing processes and coordinated with vendors for timely component procurement and quality adherence.",
    outcome: "Successfully developed a chassis that met competition standards with optimized strength, weight, and cost efficiency.",
    icon: Cpu,
    color: "bg-blue-50/[0.8] border-blue-200/[0.5]",
    iconColor: "text-blue-600",
  },
  {
    name: "6 DOF Mechanical Arm",
    duration: "Mar 2024 - Present",
    role: "Mechanical Design Engineer",
    description: "Engineered a 3 DOF mechanical arm, focusing on optimizing the mechanical design for automation tasks.",
    technologies: "ANSYS (structural, static, and dynamic analysis), MATLAB (motor calculations), high-precision joints, motors with encoders.",
    details: "Performed detailed motor calculations in MATLAB to determine torque and speed requirements, selected appropriate motors and high-precision joints to minimize backlash, and ensured smooth operation and high precision in automated processes. Carefully selected materials to enhance strength-to-weight ratio and durability.",
    outcome: "Achieved high precision and reliability in automation tasks through optimized design and component selection.",
    icon: Tool,
    color: "bg-purple-50/[0.8] border-purple-200/[0.5]",
    iconColor: "text-purple-600",
  },
  {
    name: "6-Wheeled ROVER",
    duration: "Jan 2023 - Sep 2023",
    role: "Lead Designer and Researcher",
    description: "Led the design and research of a 6-wheeled rover optimized for rocky terrains, ensuring durability and performance under challenging conditions.",
    technologies: "SolidWorks (design and analysis), MATLAB (motor calculations), rocker-bogie suspension system, differential mechanism, specialized wheels, and bearing joints.",
    details: "Engineered a rocker-bogie suspension system and differential mechanism for enhanced stability and maneuverability. Designed specialized wheels and bearing joints to improve traction and reduce wear. Performed motor calculations to achieve a maximum speed of 5 m/s on a 45-degree inclined grass surface, ensuring stability and precision on uneven terrains.",
    outcome: "Developed a robust rover capable of navigating rocky and uneven terrains with stability and precision.",
    icon: Cog,
    color: "bg-pink-50/[0.8] border-pink-200/[0.5]",
    iconColor: "text-pink-600",
  },
  {
    name: "Holonomic Art Bot",
    duration: "Aug 2022 - Mar 2023",
    role: "Design Engineer",
    description: "Engineered and optimized the chassis design for a 3-wheeled holonomic drive bot for precise floor drawing tasks.",
    technologies: "SolidWorks (chassis design and optimization), MATLAB (power and torque calculations), holonomic wheels.",
    details: "Focused on structural integrity and weight distribution for seamless integration with electronics and software. Conducted power and torque calculations to ensure optimal motor performance and stability, enabling smooth and accurate movements for high-precision tasks.",
    outcome: "Created a bot with precise vehicle dynamics, ideal for high-precision floor drawing tasks.",
    icon: Lightbulb,
    color: "bg-teal-50/[0.8] border-teal-200/[0.5]",
    iconColor: "text-teal-600",
  },
  {
    name: "HEXAPOD",
    duration: "Jan 2023 - Aug 2023",
    role: "Design and Manufacturing Lead",
    description: "Designed a hexapod robot optimized for stable and efficient locomotion across diverse terrains.",
    technologies: "SolidWorks (design and analysis), 3D printing (manufacturing), servo motors, control systems.",
    details: "Conducted static and dynamic analysis to ensure balance, flexibility, and load-bearing capacity across six legs. Led the manufacturing process using precision techniques like 3D printing and integrated servo motors and control systems for synchronized leg movement.",
    outcome: "Developed a hexapod robot with robust performance and smooth operation in complex environments.",
    icon: Code,
    color: "bg-yellow-50/[0.8] border-yellow-200/[0.5]",
    iconColor: "text-yellow-600",
  },
  {
    name: "Rubics Cube Solver",
    duration: "Aug 2022 - Feb 2023",
    role: "Design Engineer",
    description: "Engineered a Rubik's Cube solver with precise mechanical design for rapid and accurate cube manipulation.",
    technologies: "SolidWorks (design and optimization), motor torque and gear ratio calculations, actuators, adjustable grips, sensors.",
    details: "Conducted detailed calculations for motor torque, gear ratios, and actuator movements to ensure rapid and accurate manipulation. Designed adaptable mechanisms and integrated adjustable grips and sensors for compatibility with various cube sizes and designs.",
    outcome: "Created a flexible and efficient solver capable of seamlessly integrating with any standard Rubik's Cube.",
    icon: CheckCircle,
    color: "bg-blue-50/[0.8] border-blue-200/[0.5]",
    iconColor: "text-blue-600",
  },
]

const ExploreProjects: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<string | null>(null)
  const projectsRef = useRef(null)
  const isInView = useInView(projectsRef, { once: false, amount: 0.1 })

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter) {
      return matchesSearch && project.technologies.toLowerCase().includes(filter.toLowerCase())
    }
    
    return matchesSearch
  })

  // Extract unique technologies for filter
  const allTechnologies = projects
    .flatMap(project => project.technologies.split(',').map(tech => tech.trim()))
    .filter((tech, index, self) => self.indexOf(tech) === index)
    .sort()

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

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const handleToggleExpand = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index)
  }

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiNmNiMiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

        {/* Decorative elements */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-100/10 blur-3xl -top-48 -right-48"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-100/10 blur-3xl -bottom-48 -left-48"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Engineering-themed background elements */}
        <motion.div
          className="absolute w-64 h-64 border-4 border-dashed border-blue-200/10 rounded-full top-[30%] right-[10%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto" ref={projectsRef}>
        {/* Section Header with Resume Download */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
          >
            <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
              <span className="relative z-10">
                Explore Projects
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Discover my portfolio of mechanical engineering and robotics projects, showcasing innovation and technical expertise.
            </p>
          </motion.div>

          <motion.a
            href="/resume.pdf"
            download="Shantanu_Panda_Resume.pdf"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>Download Resume</span>
          </motion.a>
        </div>

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
              placeholder="Search projects by name, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <select
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value || null)}
            className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all md:w-64"
          >
            <option value="">All Technologies</option>
            {allTechnologies.map((tech, index) => (
              <option key={index} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => {
              const ProjectIcon = project.icon
              const isExpanded = expandedProject === index
              
              return (
                <motion.div
                  key={index}
                  variants={projectVariants}
                  className={`${project.color} backdrop-blur-[4px] rounded-xl border ${project.color.replace('bg-', 'border-')} shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative group`}
                  whileHover={{ y: -5 }}
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${project.color} mr-3`}>
                          <ProjectIcon className={`${project.iconColor}`} size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium text-gray-700">
                        {project.duration}
                      </span>
                      <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium text-gray-700">
                        {project.role}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-white/70 rounded-md text-xs font-medium text-gray-700 shadow-sm"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 flex items-center justify-center ${index % 2 === 0 ? 'bg-blue-100/50' : 'bg-purple-100/50'}`}>
                      <span className="text-gray-500 font-medium">Project Image</span>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30"></div>
                    
                    {/* Circuit pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
                  
                  {/* Card Footer */}
                  <div className="p-6 pt-4 border-t border-gray-100/30">
                    <button
                      onClick={() => handleToggleExpand(index)}
                      className="flex items-center justify-between w-full text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>{isExpanded ? "Show Less" : "View Details"}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Details:</h4>
                              <p className="text-gray-700 text-sm">{project.details}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-1">Outcome:</h4>
                              <p className="text-gray-700 text-sm">{project.outcome}</p>
                            </div>
                            
                            <a
                              href="#"
                              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <span>View Full Case Study</span>
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-500 text-lg">No projects match your search criteria. Try adjusting your filters.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ExploreProjects
