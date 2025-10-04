'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors ${
      scrolled ? 'bg-slate-900/80 backdrop-blur' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-white">
          Urban Heat Monitor
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#problem" className="text-slate-300 hover:text-white transition-colors">
            Problem
          </a>
          <a href="#solution" className="text-slate-300 hover:text-white transition-colors">
            Solution
          </a>
          <a href="#malaga" className="text-slate-300 hover:text-white transition-colors">
            Málaga
          </a>
        </div>
        
        <a 
          href="/theproject" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Demo
        </a>
      </div>
    </nav>
  )
}