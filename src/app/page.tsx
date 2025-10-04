import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatCard from '@/components/StatCard'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import InteractiveH2 from '@/components/InteractiveH2'
import { stats, impacts, malagaSolutions, solutionPillars } from '@/lib/data'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Gradient Container for main sections */}
      <div className="bg-gradient-to-b from-red-300 via-green-300 to-blue-300 relative">
        {/* Lighter overlay to make gradient more visible */}
        <div className="absolute inset-0 bg-slate-900/40 z-0"></div>
        <div className="relative z-10">
          
          {/* Problem Section */}
          <section id="problem" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <InteractiveH2 className="text-white drop-shadow-lg">The Urban Heat Island Problem</InteractiveH2>
              
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                  <StatCard key={index} value={stat.value} label={stat.label} variant="danger" />
                ))}
              </div>
              
              {/* Impacts Grid */}
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {impacts.map((impact, index) => (
                  <div key={index} className="flex items-center p-3 bg-red-900/40 rounded-lg border border-red-700/50 hover:border-red-500/50 hover:bg-red-900/50 transition-all duration-300 group backdrop-blur-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3 group-hover:bg-red-300 transition-colors"></div>
                    <span className="text-white/90 group-hover:text-white transition-colors">{impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Solution Section */}
          <section id="solution" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <InteractiveH2 className="text-white drop-shadow-lg">Our AI Solution</InteractiveH2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {solutionPillars.map((pillar, index) => (
                  <Card 
                    key={index}
                    title={pillar.title}
                    description={pillar.description}
                    variant="info"
                    icon={
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        {pillar.icon === 'satellite' && <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>}
                        {pillar.icon === 'brain' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>}
                        {pillar.icon === 'dashboard' && <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>}
                      </svg>
                    }
                  />
                ))}
              </div>
              
              {/* Data Flow Diagram */}
              <div className="flex items-center justify-center mt-12 space-x-8 text-center flex-wrap">
                <div className="p-4 bg-blue-600/80 rounded-lg hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">Satellite Data</div>
                <div className="text-blue-200 animate-pulse">→</div>
                <div className="p-4 bg-blue-500/80 rounded-lg hover:bg-blue-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">Predictive AI</div>
                <div className="text-blue-200 animate-pulse">→</div>
                <div className="p-4 bg-blue-400/80 rounded-lg hover:bg-blue-300 transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">Urban Decisions</div>
              </div>
            </div>
          </section>
          
          {/* Malaga Case Study */}
          <section id="malaga" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <InteractiveH2 className="text-white drop-shadow-lg">Case Study: Málaga</InteractiveH2>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="group">
                  <div className="aspect-video bg-green-900/50 rounded-lg flex items-center justify-center border border-green-700/50 mb-4 hover:border-green-500/50 transition-all duration-300 group-hover:scale-105 backdrop-blur-sm">
                    <span className="text-white/90 group-hover:text-white transition-colors">Málaga thermal map</span>
                  </div>
                  <p className="text-white/80 text-center group-hover:text-white transition-colors">Heat island mapping before intervention</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {malagaSolutions.map((solution, index) => (
                    <div key={index} className="p-4 bg-green-900/50 border border-green-700/50 rounded-lg hover:border-green-400 hover:bg-green-900/60 transition-all duration-300 group hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
                      <h4 className="font-semibold mb-2 text-green-200 group-hover:text-green-100 transition-colors">{solution.title}</h4>
                      <p className="text-sm text-white/80 group-hover:text-white transition-colors">{solution.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
