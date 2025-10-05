import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InteractiveH2 from '@/components/InteractiveH2'

export default function ProblemAnalysis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 via-orange-800 via-slate-800 to-green-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Heat map overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-40 h-40 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-10 w-32 h-32 bg-orange-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-green-500/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-10 right-20 w-36 h-36 bg-blue-500/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        <div className="text-center text-white px-4 max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Problem and Needs Analysis
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100">
            Understanding urban challenges and innovative solutions
          </p>
        </div>
      </section>
      
      {/* Context Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Context</InteractiveH2>
          
          <div className="max-w-5xl mx-auto">
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6">
              <p>
                <strong className="text-white">Urban areas are heating up faster than their surroundings.</strong>
              </p>
              
              <p>
                Average urban heat island (UHI) effect: <strong className="text-white">+2°C to +7°C</strong> compared with nearby rural zones.
              </p>
              
              <p>
                Heatwaves are increasing in <strong className="text-white">frequency, intensity, and duration</strong>.
              </p>
              
              <p>
                Air pollution peaks (NO₂, PM₂.₅, O₃) often coincide with these heatwaves, worsening health risks.
              </p>
              
              <p>
                The combined effects lead to <strong className="text-white">public health crises, higher energy demand, and unequal exposure</strong> across neighborhoods.
              </p>
              
              <p>
                Climate change and rapid urbanization exacerbate this imbalance. As cities densify, sealed surfaces, lack of vegetation, and poor ventilation amplify heat and pollution concentration.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Problem Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">The Core Problem</InteractiveH2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6">
              <p className="text-xl text-white font-semibold">
                Urban planners and decision-makers lack integrated, predictive tools to assess how planned construction or green infrastructure will affect local temperature and air quality in the coming years.
              </p>
              
              <p className="text-white font-semibold text-lg mt-8">
                Current issues:
              </p>
            </div>
            
            {/* Issues Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-red-900/30 rounded-lg border border-red-700/50 hover:border-red-500/50 hover:bg-red-900/40 transition-all duration-300 min-h-[140px] flex flex-col">
                <h4 className="font-semibold mb-3 text-red-300">Fragmented Data</h4>
                <p className="text-slate-300 flex-1">Temperature, pollution, vegetation data sources without unified modeling.</p>
              </div>
              
              <div className="p-6 bg-orange-900/30 rounded-lg border border-orange-700/50 hover:border-orange-500/50 hover:bg-orange-900/40 transition-all duration-300 min-h-[140px] flex flex-col">
                <h4 className="font-semibold mb-3 text-orange-300">Descriptive vs Predictive</h4>
                <p className="text-slate-300 flex-1">Most tools show today's situation, not tomorrow's predictions.</p>
              </div>
              
              <div className="p-6 bg-yellow-900/30 rounded-lg border border-yellow-700/50 hover:border-yellow-500/50 hover:bg-yellow-900/40 transition-all duration-300 min-h-[140px] flex flex-col">
                <h4 className="font-semibold mb-3 text-yellow-300">Poor Resolution</h4>
                <p className="text-slate-300 flex-1">Climate models are often too coarse (1–10 km) for city-scale decisions.</p>
              </div>
              
              <div className="p-6 bg-purple-900/30 rounded-lg border border-purple-700/50 hover:border-purple-500/50 hover:bg-purple-900/40 transition-all duration-300 min-h-[140px] flex flex-col">
                <h4 className="font-semibold mb-3 text-purple-300">Siloed Analysis</h4>
                <p className="text-slate-300 flex-1">Air quality, heat, and comfort treated separately despite being connected.</p>
              </div>
            </div>
            
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6 mt-8">
              <p>
                Citizens have <strong className="text-white">no accessible way to understand</strong> where and when their city becomes unsafe or uncomfortable.
              </p>
              
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600/50 mt-8">
                <p className="text-white font-semibold text-lg mb-4">The result:</p>
                <ul className="space-y-3 text-slate-300">
                  <li>• Urban projects are designed without full awareness of their thermal or atmospheric impact</li>
                  <li>• Mitigation measures (trees, materials, ventilation corridors) are implemented reactively instead of proactively</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Needs Identified Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Needs Identified</InteractiveH2>
          
          <div className="max-w-6xl mx-auto">
            {/* Stakeholder Table */}
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse border border-slate-600/50 rounded-lg overflow-hidden">
                <thead className="bg-slate-800/80">
                  <tr>
                    <th className="border border-slate-600/50 p-4 text-left text-white font-semibold">Stakeholder</th>
                    <th className="border border-slate-600/50 p-4 text-left text-white font-semibold">Key Needs</th>
                    <th className="border border-slate-600/50 p-4 text-left text-white font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-blue-300">Municipalities</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Predictive planning</td>
                    <td className="border border-slate-600/50 p-4">Need decision tools to evaluate projects under climate change scenarios (10+ years).</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-green-300">Urban designers / engineers</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Fast impact simulations</td>
                    <td className="border border-slate-600/50 p-4">Need to test project alternatives and get measurable indicators.</td>
                  </tr>
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-purple-300">Citizens</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Awareness and accessibility</td>
                    <td className="border border-slate-600/50 p-4">Need maps to locate cooler, less polluted zones and plan mobility routes.</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-orange-300">Researchers / policy makers</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Consistent datasets</td>
                    <td className="border border-slate-600/50 p-4">Need harmonized multi-source data to study long-term adaptation.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Quantified Consequences */}
            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50">
              <h3 className="text-2xl font-bold text-white mb-6">Quantified Consequences</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400 font-bold">Health:</span>
                    <span className="text-slate-300">Heatwaves are responsible for thousands of excess deaths per year in Europe.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-400 font-bold">Energy:</span>
                    <span className="text-slate-300">Every +1°C increases cooling demand by 5–10%.</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-yellow-400 font-bold">Economy:</span>
                    <span className="text-slate-300">Productivity loss due to heat and pollution reaches billions of euros annually.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-400 font-bold">Equity:</span>
                    <span className="text-slate-300">Vulnerable populations are the most exposed.</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-lg border border-blue-600/50">
              <h4 className="text-xl font-bold text-white mb-3">Opportunity</h4>
              <p className="text-slate-200 text-lg">
                Cities urgently need a <strong className="text-white">unified, data-driven decision platform</strong> to model temperature, pollution, and comfort; simulate urban projects; and provide both expert insights and public access.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Solution and Innovation Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Solution and Innovation</InteractiveH2>
          
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Overview */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-6">Overview</h3>
              <p className="text-xl text-slate-200 max-w-4xl mx-auto leading-relaxed">
                <strong className="text-white">Re-Fresh</strong> provides an integrated, data-driven solution for cities to predict, simulate, and visualize the combined effects of heat, air pollution, and urban design choices.
              </p>
            </div>
            
            {/* Core Concept */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-8 rounded-lg border border-slate-600/50">
              <h4 className="text-2xl font-bold text-white mb-4">Core Concept</h4>
              <p className="text-lg text-slate-200 leading-relaxed">
                A web-based predictive map powered by <strong className="text-white">NASA and Copernicus datasets</strong>, enhanced by machine learning models that estimate how new buildings or green areas will influence temperature, pollution, and comfort over the next decade.
              </p>
            </div>
            
            {/* Key Innovations Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-600/50 rounded-lg overflow-hidden">
                <thead className="bg-slate-800/80">
                  <tr>
                    <th className="border border-slate-600/50 p-4 text-left text-white font-semibold">Area</th>
                    <th className="border border-slate-600/50 p-4 text-left text-white font-semibold">Innovation</th>
                    <th className="border border-slate-600/50 p-4 text-left text-white font-semibold">Added Value</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-blue-300">Multi-layer modeling</td>
                    <td className="border border-slate-600/50 p-4">Integrates thermal, air quality, and comfort data</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Unified view of urban health</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-green-300">Predictive AI</td>
                    <td className="border border-slate-600/50 p-4">ML models forecast changes 5–10 years ahead</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Predictive analysis</td>
                  </tr>
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-purple-300">Scalable architecture</td>
                    <td className="border border-slate-600/50 p-4">Modular data pipeline and API</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Adaptable to any city</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-orange-300">Citizen interface</td>
                    <td className="border border-slate-600/50 p-4">Map showing fresh, low-pollution areas</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Public engagement</td>
                  </tr>
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                    <td className="border border-slate-600/50 p-4 font-medium text-red-300">Decision dashboard</td>
                    <td className="border border-slate-600/50 p-4">Quantitative metrics for planning</td>
                    <td className="border border-slate-600/50 p-4 font-medium">Policy support</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Technical Architecture */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-900/30 rounded-lg border border-blue-700/50 hover:border-blue-500/50 hover:bg-blue-900/40 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-blue-300">Input</h4>
                <p className="text-slate-300">Satellite + GIS + demographics data</p>
              </div>
              
              <div className="p-6 bg-green-900/30 rounded-lg border border-green-700/50 hover:border-green-500/50 hover:bg-green-900/40 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-green-300">Processing</h4>
                <p className="text-slate-300">Feature extraction, ML prediction, scenario engine</p>
              </div>
              
              <div className="p-6 bg-purple-900/30 rounded-lg border border-purple-700/50 hover:border-purple-500/50 hover:bg-purple-900/40 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-purple-300">Output</h4>
                <p className="text-slate-300">Interactive map, API, citizen dashboard</p>
              </div>
            </div>
            
            {/* User Experience */}
            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50">
              <h4 className="text-2xl font-bold text-white mb-6">User Experience</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="text-blue-400 font-bold min-w-fit">Municipal view:</span>
                  <span className="text-slate-300">Upload or draw projects → predicted changes.</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-green-400 font-bold min-w-fit">Engineering view:</span>
                  <span className="text-slate-300">Modify variables → instant metrics.</span>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-purple-400 font-bold min-w-fit">Citizen view:</span>
                  <span className="text-slate-300">Find cool & clean places.</span>
                </div>
              </div>
            </div>
            
            {/* Impact */}
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-8 rounded-lg border border-green-600/50">
              <h4 className="text-2xl font-bold text-white mb-6">Impact of Innovation</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-slate-200">
                  <li>• Enables proactive, data-driven urban adaptation</li>
                  <li>• Connects climate science, planning, and public engagement</li>
                </ul>
                <ul className="space-y-3 text-slate-200">
                  <li>• Supports EU climate neutrality goals</li>
                  <li>• Scalable model for global urban resilience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}