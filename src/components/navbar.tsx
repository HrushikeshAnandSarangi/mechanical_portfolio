"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Home, User, Briefcase, Settings, Mail } from "lucide-react"

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Throttled scroll handler to improve performance
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setScrolled(scrollY > 20)
  }, [])

  // Throttle function to limit how often scroll events are processed
  const throttle = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null
    let lastExecTime = 0
    return (...args: Parameters<T>) => {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func(...args)
        lastExecTime = currentTime
      } else {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func(...args)
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  }

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }))
    }

    updateTime() // Initial call
    const interval = setInterval(updateTime, 1000)

    // Throttled scroll handler
    const throttledScrollHandler = throttle(handleScroll, 16) // ~60fps

    // Check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial checks
    handleResize()
    handleScroll()

    // Add event listeners
    window.addEventListener("scroll", throttledScrollHandler, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", throttledScrollHandler)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleScroll])

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: User, label: "About" },
    { href: "/projects", icon: Briefcase, label: "Projects" },
    { href: "/skills", icon: Settings, label: "Skills" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ]

  return (
    <>
      {/* Main Header */}
      <header 
        className={`
          fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-out
          ${scrolled 
            ? 'h-0 opacity-0 pointer-events-none' 
            : 'h-16 sm:h-20 bg-white/90 backdrop-blur-md shadow-sm'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-4 sm:px-6">
          {/* Left side - Developer location (hidden on mobile when scrolled) */}
          <div className={`text-gray-600 font-medium text-sm sm:text-base transition-opacity duration-300 ${isMobile && scrolled ? 'opacity-0' : 'opacity-100'}`}>
            Asia/India
          </div>

          {/* Center - Main Navigation (hidden when scrolled) */}
          <nav className="bg-gray-100/80 backdrop-blur-sm rounded-full shadow-sm px-3 sm:px-6 py-2">
            <ul className="flex items-center space-x-2 sm:space-x-6">
              {navItems.map(({ href, icon: Icon, label }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="flex flex-col items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 rounded-lg hover:bg-white/50"
                  >
                    <Icon size={isMobile ? 18 : 20} />
                    <span className="text-xs mt-1 hidden sm:block">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side - Current time */}
          <div className="text-gray-600 font-medium text-sm sm:text-base font-mono">
            {currentTime}
          </div>
        </div>
      </header>

      {/* Compact Floating Navigation (shown when scrolled) */}
      <nav
        className={`
          fixed top-4 left-1/2 transform -translate-x-1/2 z-50
          transition-all duration-300 ease-out
          ${scrolled 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
          }
        `}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 px-2 sm:px-4 py-2">
          <ul className="flex items-center space-x-1 sm:space-x-3">
            {navItems.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link 
                  href={href} 
                  className="flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 sm:p-3 rounded-full hover:bg-gray-100/50"
                  title={label}
                >
                  <Icon size={isMobile ? 16 : 18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-0' : 'h-16 sm:h-20'}`} />
    </>
  )
}