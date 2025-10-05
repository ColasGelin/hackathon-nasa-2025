import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InteractiveH2 from '@/components/InteractiveH2'

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center text-white px-4 max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Case Studies
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100">
            Real-world examples of urban climate solutions
          </p>
        </div>
      </section>
      
      {/* Local Case - Repsol Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Local Case - Repsol / Urban Forest</InteractiveH2>
          
          <div className="max-w-5xl mx-auto">
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6">
              <p>
                The <strong className="text-white">Repsol site in Málaga</strong> was once an oil storage area, later abandoned in the early 2000s.
              </p>
              
              <p>
                A citizen movement, <strong className="text-white">Bosque Urbano Málaga</strong>, has since pushed to turn the land into a large public forest.
              </p>
              
              <p>
                The city, however, plans a mixed-use redevelopment with several towers and a reduced green park.
              </p>
              
              <p>
                This disagreement has sparked years of protests and legal disputes.
              </p>
              
              <p>
                As of 2025, the project remains stalled — symbolizing the wider debate between urban growth and green recovery in Mediterranean cities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Medellín Case Study Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Medellín's Green Corridors</InteractiveH2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6">
              <p>
                <strong className="text-white">Medellín</strong>, once one of Colombia's most polluted and heat-stressed cities, has become an international example of how green infrastructure can transform the urban climate. Beginning in 2016, the city launched the <strong className="text-white">"Green Corridors"</strong> program, a large-scale initiative connecting 18 major roads, 12 riverbanks, and over 120 parks with continuous vegetation and shade networks.
              </p>
              
              <p>
                The goal was to reduce urban heat, improve air quality, and enhance quality of life by increasing vegetation cover across the city. With an investment of about <strong className="text-white">16 million USD</strong>, Medellín converted asphalt and concrete strips into tree-lined routes, planted tens of thousands of shrubs and trees, and created microhabitats that connect the urban fabric.
              </p>
              
              <p className="text-white font-semibold text-xl">
                The impact was rapid and measurable:
              </p>
            </div>
            
            {/* Impact Statistics Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-green-900/30 rounded-lg border border-green-700/50 hover:border-green-500/50 hover:bg-green-900/40 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-green-300">Temperature Reduction</h4>
                <p className="text-slate-300">Air temperature dropped by up to <strong className="text-white">4°C</strong> in the most vegetated areas and around <strong className="text-white">2°C</strong> citywide.</p>
              </div>
              
              <div className="p-6 bg-blue-900/30 rounded-lg border border-blue-700/50 hover:border-blue-500/50 hover:bg-blue-900/40 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-blue-300">Surface Temperature</h4>
                <p className="text-slate-300">Surface temperature (from satellite data) fell from around <strong className="text-white">40°C to 30°C</strong> in targeted zones between 2016 and 2019.</p>
              </div>
              
              <div>
                <div className="p-6 bg-purple-900/30 rounded-lg border border-purple-700/50 hover:border-purple-500/50 hover:bg-purple-900/40 transition-all duration-300">
                  <h4 className="font-semibold mb-3 text-purple-300">Air Quality Improvement</h4>
                  <p className="text-slate-300">PM₂.₅ decreased from <strong className="text-white">21.8 to 20.2 µg/m³</strong>, PM₁₀ from <strong className="text-white">46.0 to 40.4 µg/m³</strong>, and ozone from <strong className="text-white">30.1 to 26.3 µg/m³</strong>.</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">PM₂.₅/PM₁₀: particulate matter ≤ 2.5/10 micrometers • µg/m³: micrograms per cubic meter</p>
              </div>
              
              <div className="p-6 bg-red-900/30 rounded-lg border border-red-700/50 hover:border-red-500/50 hover:bg-red-900/40 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-red-300">Health Benefits</h4>
                <p className="text-slate-300">Respiratory infection rates fell from <strong className="text-white">159 to 95</strong> per thousand inhabitants.</p>
              </div>
            </div>
            
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6 mt-8">
              <p>
                Beyond environmental gains, the project created over <strong className="text-white">2,600 jobs</strong>, including training programs for local residents as urban gardeners. It encouraged cycling (+35%) and walking (+4%), while biodiversity indicators (birds and small fauna) increased.
              </p>
              
              <p>
                The <strong className="text-white">"Green Corridors"</strong> of Medellín are now considered a reference model for climate adaptation and inclusive urban planning: combining data-driven design, ecological restoration, and social inclusion.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Singapore Case Study Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Singapore's Urban Greening Strategy</InteractiveH2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-6">
              <p>
                <strong className="text-white">Singapore</strong> has become a world leader in integrating nature into a dense urban environment. Since the 1960s, the government has pursued a long-term vision known as <strong className="text-white">"City in a Garden"</strong>, later evolved into <strong className="text-white">"City in Nature"</strong>, aiming to weave greenery into every part of the city.
              </p>
              
              <p>
                Through the <strong className="text-white">National Parks Board (NParks)</strong>, the country manages more than <strong className="text-white">7 million trees</strong> across streets, parks, buildings, and nature reserves. Trees are treated as climate infrastructure — essential for lowering heat, filtering air, capturing stormwater, and enhancing biodiversity.
              </p>
              
              <p>
                Urban vegetation has been strategically planned through green corridors connecting major parks and water systems. Studies show that areas with dense canopy cover are on average <strong className="text-white">2–4°C cooler</strong>, helping to mitigate the urban heat island effect and improve thermal comfort.
              </p>
              
              <p>
                Singapore has also pioneered digital monitoring of its urban forest through systems like <strong className="text-white">TreeSG</strong>, which tracks tree health, species, and maintenance schedules. Innovative landmarks such as <strong className="text-white">Gardens by the Bay</strong> and the iconic <strong className="text-white">Supertrees</strong> combine technology, renewable energy, and vegetation, symbolizing the fusion of ecology and design.
              </p>
              
              <p>
                In parallel, the <strong className="text-white">OneMillionTrees campaign</strong> aims to add one million new trees by 2030, expanding the national green network even further.
              </p>
              
              <p>
                Singapore's approach demonstrates that systematic, data-driven greening can make even a compact, tropical metropolis more livable, resilient, and sustainable — turning heat into habitability.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-green-300">7 Million Trees</h4>
                <p className="text-slate-300">Comprehensive urban forest management across the entire city-state</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-blue-300">2-4°C Cooling</h4>
                <p className="text-slate-300">Measurable temperature reduction in areas with dense canopy cover</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300">
                <h4 className="font-semibold mb-3 text-purple-300">TreeSG System</h4>
                <p className="text-slate-300">Digital monitoring and management of urban forest health and biodiversity</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}