"use client"

import type React from "react"

import { useRef, useState, type FormEvent } from "react"
import { motion, useInView } from "framer-motion"
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Cog,
  Zap,
  Cpu,
  AlertCircle,
} from "lucide-react"

export default function ContactSection() {
  const contactRef = useRef(null)
  const isInView = useInView(contactRef, { once: false, amount: 0.2 })

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Validation state
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    subject?: string
    message?: string
  }>({})

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      subject?: string
      message?: string
    } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Create mailto link for Gmail
    const developerEmail = "omms99248@gmail.com"
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)

    // Gmail-specific mailto URL
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${developerEmail}&su=${subject}&body=${body}`

    // Open in new tab
    window.open(mailtoUrl, "_blank")

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

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

  const itemVariants = {
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

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
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
    <section className="relative py-16 px-4 overflow-hidden bg-white" ref={contactRef}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJiNmNiMiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

        {/* Decorative elements */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-100/10 blur-3xl -top-48 -left-48"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-100/10 blur-3xl -bottom-48 -right-48"
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
              Get In Touch
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to discuss collaboration opportunities? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            <div className="bg-white/[0.9] backdrop-blur-[8px] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] p-8 border border-blue-200/[0.5] relative overflow-hidden h-full">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-50/30 blur-3xl"></div>

              <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </motion.h3>

              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-blue-50/[0.8] p-3 rounded-lg mr-4">
                    <Mail className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Email</h4>
                    <a
                      href="mailto:omms99248@gmail.com"
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      omms99248@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-purple-50/[0.8] p-3 rounded-lg mr-4">
                    <Phone className="text-purple-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Phone</h4>
                    <a href="tel:+919876543210" className="text-gray-900 hover:text-purple-600 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-pink-50/[0.8] p-3 rounded-lg mr-4">
                    <MapPin className="text-pink-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Location</h4>
                    <p className="text-gray-900">Rourkela, Odisha, India</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Social Profiles</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/shantanu-panda-ba4542238/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50/[0.8] p-3 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://github.com/shantanu-panda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-50/[0.8] p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4">
                  <motion.a
                    href="/resume.pdf"
                    download="Shantanu_Panda_Resume.pdf"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Download Resume</span>
                  </motion.a>
                </motion.div>
              </div>

              {/* Animated engineering elements */}
              <div className="absolute bottom-4 right-4 opacity-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Cog className="w-12 h-12 text-blue-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <div className="bg-white/[0.9] backdrop-blur-[8px] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] p-8 border border-blue-200/[0.5] relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
              <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-purple-50/30 blur-3xl"></div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
              <p className="text-gray-600 mb-6">
                Fill out the form below and click &quot;Send Message&quot; to compose an email to me directly from your Gmail
                account.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="I'd like to discuss a potential project..."
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </form>

              {/* Animated engineering elements */}
              <div className="absolute top-1/2 right-8 opacity-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Cpu className="w-32 h-32 text-purple-600" />
                </motion.div>
              </div>
              <div className="absolute bottom-8 left-8 opacity-5">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Zap className="w-24 h-24 text-blue-600" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
