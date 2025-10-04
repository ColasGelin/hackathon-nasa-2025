'use client'

import { useState, useEffect, useRef } from 'react'

interface InteractiveH2Props {
  children: React.ReactNode
  className?: string
}

export default function InteractiveH2({ children, className = "" }: InteractiveH2Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up')
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: '100px'
      }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Determine the translation direction based on scroll direction
  const getTranslateY = () => {
    if (isVisible) return '0'
    return scrollDirection === 'down' ? '50px' : '-50px'
  }

  return (
    <h2
      ref={titleRef}
      className={`text-4xl font-bold text-center mb-12 transition-all duration-1000 ease-out text-white drop-shadow-lg ${className}`}
      style={{
        transform: `translateY(${getTranslateY()}) scale(${isVisible ? 1 : 0.9})`,
        opacity: isVisible ? 1 : 0,
        textShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(59, 130, 246, 0.3)',
      }}
    >
      {children}
    </h2>
  )
}