import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InteractiveH2 from '@/components/InteractiveH2'

export default function WhoAreWe() {
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
            Who are we
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100">
            Re-Fresh.Earth - Predictive climate platform for sustainable cities
          </p>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Re-Fresh.Earth</InteractiveH2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6">
              <p>
                <strong className="text-white">Re-Fresh.Earth</strong> is a predictive platform that helps cities understand and plan for the effects of climate change. Using satellite data and artificial intelligence, it shows how new buildings, roads, or green areas can change temperature, air quality, and comfort in the coming years.
              </p>
              
              <p>
                Through an interactive web map, users can test different urban scenarios and see how design choices influence the city's environment. It offers simple tools for planners and citizens to make informed, sustainable decisions.
              </p>
              
              <p>
                By making climate information visual and easy to use, <strong className="text-white">Re-Fresh.Earth</strong> encourages cities to grow in ways that stay cooler, cleaner, and healthier for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}