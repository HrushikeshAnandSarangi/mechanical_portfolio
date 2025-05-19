"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, User, Briefcase, Settings, Mail } from "lucide-react"

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }

    updateTime() // Initial call
    const interval = setInterval(updateTime, 1000)

    // Check if scrolled
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    // Check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    handleResize()

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className={`relative top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'h-16 bg-transparent' : 'bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between ${scrolled  ? 'opacity-0' : 'opacity-100'}${isMobile } `}>
        {/* Left side - Developer location */}
        <div className="text-gray-600 font-medium">
          Asia/India
        </div>

        {/* Center - Navigation */}
        <nav
          className={`
          bg-gray-100 rounded-full shadow-sm transition-all duration-300
          ${scrolled ? 'fixed top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 z-50 scale-90 opacity-100' : 'px-4 md:px-6 py-2'}
        `}
        >
          <ul className="flex items-center space-x-4 md:space-x-8">
            <li>
              <Link href="/" className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors">
                <Home size={scrolled ? 16 : 20} />
                <span className={`text-xs mt-1 transition-opacity duration-300 ${scrolled ? "hidden" : "block"}`}>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User size={scrolled ? 16 : 20} />
                <span className={`text-xs mt-1 transition-opacity duration-300 ${scrolled ? "hidden" : "block"}`}>
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Briefcase size={scrolled ? 16 : 20} />
                <span className={`text-xs mt-1 transition-opacity duration-300 ${scrolled ? "hidden" : "block"}`}>
                  Projects
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/skills"
                className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Settings size={scrolled ? 16 : 20} />
                <span className={`text-xs mt-1 transition-opacity duration-300 ${scrolled ? "hidden" : "block"}`}>
                  Skills
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Mail size={scrolled ? 16 : 20} />
                <span className={`text-xs mt-1 transition-opacity duration-300 ${scrolled ? "hidden" : "block"}`}>
                  Contact
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right side - User's local time */}
        <div
          className={`text-gray-600 font-medium transition-opacity duration-300 ${scrolled ? "opacity-0 md:opacity-100" : "opacity-100"}`}
        >
          {currentTime}
        </div>
      </div>
    </header>
  )
}
