import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatCard from '@/components/StatCard'
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import { stats, impacts, satellites, malagaSolutions, solutionPillars } from '@/lib/data'

export default function Home() {
  return (
    <div className="bg-slate-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Problem Section */}
      <section id="problem" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">The Urban Heat Island Problem</h2>
          
          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
          
          {/* Impacts Grid */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {impacts.map((impact, index) => (
              <div key={index} className="flex items-center p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                <span className="text-slate-300">{impact}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section id="solution" className="py-16 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our AI Solution</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {solutionPillars.map((pillar, index) => (
              <Card 
                key={index}
                title={pillar.title}
                description={pillar.description}
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
          <div className="flex items-center justify-center mt-12 space-x-8 text-center">
            <div className="p-4 bg-blue-500 rounded-lg">Satellite Data</div>
            <div className="text-blue-400">→</div>
            <div className="p-4 bg-green-500 rounded-lg">Predictive AI</div>
            <div className="text-blue-400">→</div>
            <div className="p-4 bg-purple-500 rounded-lg">Urban Decisions</div>
          </div>
        </div>
      </section>
      
      {/* Malaga Case Study */}
      <section id="malaga" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Case Study: Málaga</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 mb-4">
                <span className="text-slate-400">Málaga thermal map</span>
              </div>
              <p className="text-slate-300 text-center">Heat island mapping before intervention</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {malagaSolutions.map((solution, index) => (
                <div key={index} className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-400">{solution.title}</h4>
                  <p className="text-sm text-slate-300">{solution.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Satellite Technologies</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {satellites.map((satellite, index) => (
              <div key={index} className="p-6 bg-slate-900 border border-slate-600 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{satellite.name}</h3>
                <p className="text-blue-400 mb-2">{satellite.res} • {satellite.type}</p>
                <p className="text-slate-300 text-sm">{satellite.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-8 mb-8">
            <span className="text-slate-400">Partners:</span>
            <div className="flex space-x-6">
              <div className="text-blue-400 font-bold">NASA</div>
              <div className="text-blue-400 font-bold">ESA</div>
            </div>
          </div>
          
          <a 
            href="/project"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Access Demo →
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
