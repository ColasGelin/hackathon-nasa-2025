'use client'

import { useState, useEffect, useRef } from 'react'

interface InteractiveH2Props {
  children: React.ReactNode
  className?: string
}

export default function InteractiveH2({ children, className = "" }: InteractiveH2Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!titleRef.current) return
    
    const rect = titleRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    
    setMousePosition({ x, y })
  }

  return (
    <h2
      ref={titleRef}
      className={`text-4xl font-bold text-center mb-12 transition-all duration-500 ease-out cursor-pointer ${className}`}
      style={{
        transform: `
          translateY(${isVisible ? '0' : '20px'}) 
          rotateX(${isHovered ? mousePosition.y * 0.5 : 0}deg) 
          rotateY(${isHovered ? mousePosition.x * 0.5 : 0}deg)
          scale(${isHovered ? 1.05 : 1})
        `,
        opacity: isVisible ? 1 : 0,
        textShadow: isHovered ? `${mousePosition.x}px ${mousePosition.y}px 20px rgba(59, 130, 246, 0.3)` : 'none',
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
    >
      {children}
    </h2>
  )
}