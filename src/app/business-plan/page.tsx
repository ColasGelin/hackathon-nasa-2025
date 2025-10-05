import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InteractiveH2 from '@/components/InteractiveH2'

export default function BusinessPlan() {
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
            Business Plan
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100">
            Transforming urban climate planning into sustainable business opportunities
          </p>
        </div>
      </section>
      
      {/* Business Plan Content */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Strategic Vision & Market Opportunity</InteractiveH2>
          
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Executive Summary */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-lg border border-purple-600/50">
              <h3 className="text-3xl font-bold text-white mb-8">Executive Summary</h3>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
                  <h4 className="text-xl font-bold text-red-300 mb-4">Problem</h4>
                  <p className="text-slate-300">
                    Cities face increasingly severe heat waves and poor air quality. Urban planners lack precise, user-friendly tools to predict how new projects and green areas will affect temperature, pollution, and comfort.
                  </p>
                </div>
                
                <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
                  <h4 className="text-xl font-bold text-green-300 mb-4">Solution</h4>
                  <p className="text-slate-300">
                    A predictive web platform combining NASA and Copernicus satellite data with machine learning. It forecasts temperature, air pollution and comfort changes over the next decade, and allows users to simulate the impact of new constructions, green zones, and materials.
                  </p>
                </div>
                
                <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
                  <h4 className="text-xl font-bold text-blue-300 mb-4">Value</h4>
                  <ul className="text-slate-300 space-y-2 text-sm">
                    <li>• Supports municipalities in climate adaptation planning</li>
                    <li>• Helps engineers assess environmental performance</li>
                    <li>• Enables citizens to find "cool and clean" areas</li>
                    <li>• <strong className="text-white">SaaS + API + consulting</strong></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center bg-slate-800/50 p-4 rounded-lg">
                <p className="text-orange-300 font-semibold">
                  Current Stage: MVP under development for Málaga (hackathon prototype)
                </p>
              </div>
            </div>
            
            {/* Market Context */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/30 p-8 rounded-lg border border-orange-600/50">
                <h3 className="text-2xl font-bold text-orange-300 mb-6">Market Context & Opportunity</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Urban Climate Challenges</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• <strong className="text-red-400">+2 to +7°C</strong> in city centers vs rural zones</li>
                      <li>• Increased air pollution (NO₂, PM₂.₅, O₃) during heatwaves</li>
                      <li>• Higher health and energy costs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Market Growth</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• Climate-analytics sector: <strong className="text-green-400">+20% annually</strong></li>
                      <li>• <strong className="text-blue-400">500+ European cities</strong> (&gt;100k inhabitants)</li>
                      <li>• Billions in EU adaptation funds</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/30 p-8 rounded-lg border border-green-600/50">
                <h3 className="text-2xl font-bold text-green-300 mb-6">Value Proposition</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-red-300 mb-3">Pain Points</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• <strong>Municipalities:</strong> lack of predictive tools</li>
                      <li>• <strong>Private sector:</strong> need fast project evaluations</li>
                      <li>• <strong>Citizens:</strong> no access to real-time heat/air data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Our Solution</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• Predict 10-year evolution of temperature & pollution</li>
                      <li>• Simulate impacts of vegetation & materials</li>
                      <li>• Web map + API + mobile "Cool City" mode</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Market Segments */}
            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Market Segments</h3>
              
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 mb-2">Municipalities</h4>
                  <p className="text-slate-400 text-xs mb-3">Plan climate-resilient projects</p>
                  <p className="text-slate-300 text-sm">City councils, regions</p>
                </div>
                
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-300 mb-2">Engineering Firms</h4>
                  <p className="text-slate-400 text-xs mb-3">Assess project impact</p>
                  <p className="text-slate-300 text-sm">Environmental consultancies</p>
                </div>
                
                <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-300 mb-2">NGOs / Media</h4>
                  <p className="text-slate-400 text-xs mb-3">Awareness & visualization</p>
                  <p className="text-slate-300 text-sm">Climate journalists</p>
                </div>
                
                <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-300 mb-2">Citizens</h4>
                  <p className="text-slate-400 text-xs mb-3">Find fresh, low-pollution areas</p>
                  <p className="text-slate-300 text-sm">Urban dwellers</p>
                </div>
                
                <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-300 mb-2">Researchers</h4>
                  <p className="text-slate-400 text-xs mb-3">Risk modeling, forecasting</p>
                  <p className="text-slate-300 text-sm">Universities, utilities</p>
                </div>
              </div>
            </div>
            
            {/* Data Ecosystem */}
            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Data Ecosystem</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Temperature Sources</h4>
                    <p className="text-slate-300 text-sm">NASA Landsat LST, MODIS → Base heat signal</p>
                  </div>
                  
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-semibold text-green-300 mb-2">Vegetation Data</h4>
                    <p className="text-slate-300 text-sm">HLS NDVI/EVI → Cooling effect modeling</p>
                  </div>
                  
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                    <h4 className="font-semibold text-red-300 mb-2">Pollution Sources</h4>
                    <p className="text-slate-300 text-sm">Sentinel-5P (TROPOMI), CAMS → NO₂, PM₂.₅, O₃</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">Climate Data</h4>
                    <p className="text-slate-300 text-sm">MOD16A2, ERA5-Land → Humidity & energy balance</p>
                  </div>
                  
                  <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                    <h4 className="font-semibold text-orange-300 mb-2">Urban Features</h4>
                    <p className="text-slate-300 text-sm">Landsat SR, ESA WorldCover → Surface heat storage</p>
                  </div>
                  
                  <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                    <h4 className="font-semibold text-teal-300 mb-2">Mobility Data</h4>
                    <p className="text-slate-300 text-sm">OSM, TomTom Index → Heat & NO₂ hotspots</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Revenue Model */}
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-8 rounded-lg border border-green-600/50">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Product & Revenue Model</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-slate-800/50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-300 mb-3">Urban Climate Dashboard (SaaS)</h4>
                    <p className="text-slate-300 text-sm mb-2">Interactive map, reports → Municipalities</p>
                    <p className="text-green-400 font-bold">€2k–€10k / year</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-green-300 mb-3">Impact Simulation API</h4>
                    <p className="text-slate-300 text-sm mb-2">GeoJSON input → Δ°C + ΔNO₂ + ΔUTCI</p>
                    <p className="text-green-400 font-bold mb-4">€0.10–€1 / ha</p>
                    
                    {/* Legend */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start space-x-2">
                        <span className="text-red-400 font-mono">Δ°C:</span>
                        <span className="text-slate-300">Temperature change (delta degrees Celsius)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-orange-400 font-mono">ΔNO₂:</span>
                        <span className="text-slate-300">Nitrogen dioxide pollution change</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-purple-400 font-mono">ΔUTCI:</span>
                        <span className="text-slate-300">Universal Thermal Climate Index change (human comfort)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-slate-800/50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-purple-300 mb-3">Custom Reports</h4>
                    <p className="text-slate-300 text-sm mb-2">Detailed assessments → Developers</p>
                    <p className="text-green-400 font-bold">€3k–€20k / study</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-orange-300 mb-3">"Cool City" Portal</h4>
                    <p className="text-slate-300 text-sm mb-2">Citizen web/mobile access → Public</p>
                    <p className="text-blue-400 font-bold">Funded by grants/ads</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Go-to-Market Roadmap */}
            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Go-To-Market Roadmap</h3>
              
              <div className="grid lg:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-300 mb-2">Hackathon</h4>
                  <p className="text-slate-400 text-xs mb-3">Month 1</p>
                  <p className="text-slate-300 text-sm">Málaga MVP</p>
                </div>
                
                <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-300 mb-2">Pilot Cities</h4>
                  <p className="text-slate-400 text-xs mb-3">3–6 months</p>
                  <p className="text-slate-300 text-sm">Dashboards for 2 cities</p>
                </div>
                
                <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-300 mb-2">Beta SaaS</h4>
                  <p className="text-slate-400 text-xs mb-3">6–12 months</p>
                  <p className="text-slate-300 text-sm">Full map + API</p>
                </div>
                
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-300 mb-2">Scale</h4>
                  <p className="text-slate-400 text-xs mb-3">12–24 months</p>
                  <p className="text-slate-300 text-sm">Spain + France rollout</p>
                </div>
                
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-300 mb-2">EU Expansion</h4>
                  <p className="text-slate-400 text-xs mb-3">24–36 months</p>
                  <p className="text-slate-300 text-sm">Horizon Europe partnership</p>
                </div>
              </div>
            </div>
            
            {/* Competitive Landscape */}
            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Competitive Landscape</h3>
              
              <div className="grid lg:grid-cols-4 gap-6">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-300 mb-2">ClimateView</h4>
                  <p className="text-slate-400 text-xs mb-2">Focus: Emission dashboards</p>
                  <p className="text-slate-300 text-sm"><strong className="text-red-400">Limitation:</strong> No spatial prediction</p>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-300 mb-2">UrbClim</h4>
                  <p className="text-slate-400 text-xs mb-2">Focus: Physical urban model</p>
                  <p className="text-slate-300 text-sm"><strong className="text-red-400">Limitation:</strong> Static, hard to customize</p>
                </div>
                
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-300 mb-2">CRCTool</h4>
                  <p className="text-slate-400 text-xs mb-2">Focus: NBS planner</p>
                  <p className="text-slate-300 text-sm"><strong className="text-red-400">Limitation:</strong> Lacks pollution forecast</p>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-300 mb-2">ECOTEN</h4>
                  <p className="text-slate-400 text-xs mb-2">Focus: Consultancy</p>
                  <p className="text-slate-300 text-sm"><strong className="text-red-400">Limitation:</strong> No SaaS, no citizen mode</p>
                </div>
              </div>
            </div>
            
            {/* Scalability */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-lg border border-blue-600/50">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Scalability Potential</h3>
              
              <div className="grid lg:grid-cols-3 gap-6 text-center">
                <div className="bg-slate-800/50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-300 mb-4">Global Reach</h4>
                  <ul className="space-y-2 text-slate-300 text-sm text-left">
                    <li>• Cities worldwide</li>
                    <li>• Biomes adaptation</li>
                    <li>• Multiple data types</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-300 mb-4">Technical Evolution</h4>
                  <ul className="space-y-2 text-slate-300 text-sm text-left">
                    <li>• Infrastructure suggestions</li>
                    <li>• Available APIs</li>
                    <li>• Real-time processing</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-purple-300 mb-4">Advanced Features</h4>
                  <ul className="space-y-2 text-slate-300 text-sm text-left">
                    <li>• Digital twins projects</li>
                    <li>• AI-powered recommendations</li>
                    <li>• Integrated IoT sensors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}