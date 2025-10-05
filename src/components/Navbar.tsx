'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/20 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className={`text-xl font-bold transition-colors ${
            pathname === '/' 
              ? 'text-white border-b-2 border-blue-400 pb-1' 
              : 'text-white hover:text-slate-200'
          }`}
        >
          Urban Heat Monitor
        </Link>
        
                <div className="hidden md:flex space-x-8">
          <Link 
            href="/who-are-we" 
            className={`transition-colors ${
              pathname === '/who-are-we' 
                ? 'text-white font-semibold border-b-2 border-blue-400 pb-1' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Who are we
          </Link>
          <Link 
            href="/problem-analysis" 
            className={`transition-colors ${
              pathname === '/problem-analysis' 
                ? 'text-white font-semibold border-b-2 border-blue-400 pb-1' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Problem Analysis
          </Link>
          <Link 
            href="/case-studies" 
            className={`transition-colors ${
              pathname === '/case-studies' 
                ? 'text-white font-semibold border-b-2 border-blue-400 pb-1' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Case Studies
          </Link>
          <Link 
            href="/technical-documentation" 
            className={`transition-colors ${
              pathname === '/technical-documentation' 
                ? 'text-white font-semibold border-b-2 border-blue-400 pb-1' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Technical Documentation
          </Link>
          <Link 
            href="/business-plan" 
            className={`transition-colors ${
              pathname === '/business-plan' 
                ? 'text-white font-semibold border-b-2 border-blue-400 pb-1' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Business Plan
          </Link>
        </div>
        
        <Link 
          href="/theproject" 
          className={`px-4 py-2 rounded-lg transition-colors ${
            pathname === '/theproject' 
              ? 'bg-blue-600 text-white border-2 border-blue-300' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Demo
        </Link>
      </div>
    </nav>
  )
}