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
        <a href="/" className="text-xl font-bold text-white hover:text-slate-200 transition-colors">
          Urban Heat Monitor
        </a>
        
                <div className="hidden md:flex space-x-8">
          <a href="/who-are-we" className="text-slate-300 hover:text-white transition-colors">
            Who are we
          </a>
          <a href="/case-studies" className="text-slate-300 hover:text-white transition-colors">
            Case Studies
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