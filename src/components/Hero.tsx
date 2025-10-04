'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate interactive values based on scroll (smoother curves)
  const parallaxY = scrollY * 0.3
  const scale = Math.max(0.7, 1 - scrollY * 0.0005)
  const opacity = Math.max(0.3, 1 - scrollY * 0.0015)
  const rotate = Math.sin(scrollY * 0.01) * 2

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Diagonal gradient for Fighting Urban Heat Islands section */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-green-400 to-blue-400"></div>
      {/* Overlay to maintain readability */}
      <div className="absolute inset-0 bg-slate-900/50"></div>
      <div className="text-center text-white px-4 max-w-4xl relative z-10">
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
            opacity: opacity,
            textShadow: `0 0 ${scrollY * 0.05}px rgba(255,255,255,0.3)`,
          }}
        >
          <span className="inline-block hover:scale-110 transition-transform duration-300">
            Fighting
          </span>{' '}
          <span className="inline-block hover:scale-110 transition-transform duration-300 delay-100">
            Urban
          </span>{' '}
          <span className="inline-block hover:scale-110 transition-transform duration-300 delay-200 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
            Heat
          </span>{' '}
          <span className="inline-block hover:scale-110 transition-transform duration-300 delay-300 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Islands
          </span>
        </h1>
        <p 
          className="text-xl md:text-2xl mb-8 text-slate-100 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY * 0.6}px, 0)`,
            opacity: opacity * 0.9,
          }}
        >
          Satellite intelligence for resilient cities
        </p>
        <a 
          href="/project"
          className="inline-flex items-center bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 hover:scale-105 transition-all duration-300 will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY * 0.2}px, 0)`,
            opacity: opacity,
          }}
        >
          View Demo →
        </a>
        
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.005),
          }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Interactive background particles */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-yellow-200 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-3/4 w-16 h-16 bg-orange-200 rounded-full animate-pulse animation-delay-2000"></div>
      </div>
    </section>
  )
}