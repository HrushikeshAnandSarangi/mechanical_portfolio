"use client"

export default function HeroBackground() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f5f7fa]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/[0.3] via-purple-200/[0.3] to-pink-300/[0.3] backdrop-blur-[8px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f5f7fa]/70 via-transparent to-[#f5f7fa]/70 pointer-events-none" />
    </div>
  )
}