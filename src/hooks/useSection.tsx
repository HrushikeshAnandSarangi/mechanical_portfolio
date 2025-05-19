"use client"

import { useState, useEffect } from "react"

export function useSectionInView(
  sectionRefs: { [key: string]: HTMLDivElement | null },
  options = { margin: "-40% 0px -40% 0px" },
) {
  const [activeSection, setActiveSection] = useState<string>("personal")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find which section this element belongs to
            const sectionId = Object.keys(sectionRefs).find((key) => sectionRefs[key] === entry.target)
            if (sectionId) {
              setActiveSection(sectionId)
            }
          }
        })
      },
      { rootMargin: options.margin },
    )

    // Observe all section elements
    Object.values(sectionRefs).forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [sectionRefs, options.margin])

  return activeSection
}
