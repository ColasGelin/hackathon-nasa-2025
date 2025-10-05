import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InteractiveH2 from '@/components/InteractiveH2'

export default function TechnicalDocumentation() {
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
            Technical Documentation
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100">
            NASA data sources and machine learning implementation
          </p>
        </div>
      </section>
      
      {/* NASA Data Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Used NASA Data</InteractiveH2>
          
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Data Sources Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Landsat Collection 2 */}
              <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-blue-300">Landsat Collection 2</h3>
                </div>
                <h4 className="text-lg font-semibold text-white mb-4">Surface Temperature</h4>
                <ul className="space-y-3 text-slate-300">
                  <li>• <strong className="text-white">30-meter resolution</strong> thermal data - perfect for neighborhood-level analysis</li>
                  <li>• Directly measures <strong className="text-white">Land Surface Temperature (LST)</strong> in Kelvin</li>
                  <li>• Long historical record <strong className="text-white">(1982-present)</strong> for training robust models</li>
                  <li>• Same spatial resolution as vegetation data = <strong className="text-white">perfect alignment</strong></li>
                </ul>
              </div>
              
              {/* HLS Vegetation */}
              <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-green-300">Harmonized Landsat Sentinel-2 (HLS)</h3>
                </div>
                <h4 className="text-lg font-semibold text-white mb-4">Vegetation Indices</h4>
                <ul className="space-y-3 text-slate-300">
                  <li>• <strong className="text-white">30-meter resolution</strong> NDVI and other vegetation indices</li>
                  <li>• Updates every <strong className="text-white">2-3 days</strong> (vs Landsat&apos;s 16 days)</li>
                  <li>• <strong className="text-white">Harmonized</strong> between Landsat and Sentinel-2 = consistent measurements</li>
                  <li>• Direct measure of <strong className="text-white">vegetation health and density</strong></li>
                </ul>
              </div>
              
              {/* MODIS */}
              <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50 hover:border-orange-500/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-orange-300">MODIS Land Surface Temperature</h3>
                </div>
                <h4 className="text-lg font-semibold text-white mb-4">MOD11/MYD11</h4>
                <ul className="space-y-3 text-slate-300">
                  <li>• <strong className="text-white">Daily global coverage</strong> at 1km resolution</li>
                  <li>• Perfect for <strong className="text-white">validating</strong> our higher-resolution Landsat results</li>
                  <li>• <strong className="text-white">Long-term baseline</strong> data for trend analysis</li>
                  <li>• Captures <strong className="text-white">city-wide temperature patterns</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Machine Learning Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Machine Learning Approach</InteractiveH2>
          
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Best Algorithm */}
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-lg border border-purple-600/50">
              <h3 className="text-2xl font-bold text-white mb-6">Best Algorithm: Random Forest or XGBoost</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-4">Why these work best:</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Handle non-linear vegetation-temperature relationships</li>
                    <li>• Excellent performance <strong className="text-white">(R² {'>'} 0.90)</strong> in urban heat island studies</li>
                    <li>• Robust to outliers and missing data</li>
                    <li>• Provide feature importance analysis</li>
                    <li>• Fast training and prediction</li>
                  </ul>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">R² Score:</span>
                      <span className="text-green-400 font-bold">{'>'} 0.90</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Training Speed:</span>
                      <span className="text-blue-400 font-bold">Fast</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Robustness:</span>
                      <span className="text-purple-400 font-bold">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Model Architecture */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white text-center">Model Architecture</h3>
              
              {/* Input Features */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/30 p-8 rounded-lg border border-green-600/50">
                  <h4 className="text-xl font-bold text-green-300 mb-6">Input Features</h4>
                  <ul className="space-y-3 text-slate-300">
                    <li>• <strong className="text-white">NDVI</strong> (primary vegetation indicator)</li>
                    <li>• <strong className="text-white">Land cover type</strong> (urban, park, water, etc.)</li>
                    <li>• <strong className="text-white">Distance to coastline</strong> (important for Málaga)</li>
                    <li>• <strong className="text-white">Elevation/topography</strong></li>
                    <li>• <strong className="text-white">Building density</strong> metrics</li>
                    <li>• <strong className="text-white">Time of year</strong> (seasonal effects)</li>
                  </ul>
                </div>
                
                <div className="bg-slate-800/30 p-8 rounded-lg border border-red-600/50">
                  <h4 className="text-xl font-bold text-red-300 mb-6">Target Variable</h4>
                  <div className="text-center p-6 bg-red-900/20 rounded-lg border border-red-500/30">
                    <h5 className="text-2xl font-bold text-white mb-2">Land Surface Temperature (LST)</h5>
                    <p className="text-slate-300">from Landsat thermal data</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Training Process */}
            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-600/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Training Process</h3>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Data Preparation */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-blue-300 border-b border-blue-500/30 pb-2">1. Data Preparation</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Align Landsat thermal and HLS vegetation data to same 30m grid</li>
                    <li>• Create training dataset linking NDVI values to temperature</li>
                    <li>• Remove cloudy pixels using quality assessment bands</li>
                  </ul>
                </div>
                
                {/* Feature Engineering */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-300 border-b border-green-500/30 pb-2">2. Feature Engineering</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Calculate vegetation indices (NDVI, EVI, SAVI)</li>
                    <li>• Derive spatial metrics (distance to green spaces, urban density)</li>
                    <li>• Add temporal features (day of year, seasonal indicators)</li>
                  </ul>
                </div>
                
                {/* Model Training */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-300 border-b border-purple-500/30 pb-2">3. Model Training</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Split data using spatial cross-validation (prevent overfitting)</li>
                    <li>• Train Random Forest with hyperparameter tuning</li>
                    <li>• Validate performance using held-out spatial areas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Implementation Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <InteractiveH2 className="text-white drop-shadow-lg mb-16">Current PoC Implementation</InteractiveH2>
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-8 rounded-lg border border-slate-600/50">
              <div className="text-lg leading-relaxed text-slate-300 space-y-6">
                <p>
                  For this <strong className="text-white">Proof of Concept</strong>, we&apos;re using data from <strong className="text-blue-400">Landsat Collection 2 (100m resolution)</strong>, mapping it to a <strong className="text-green-400">3D model of the city of Málaga</strong>.
                </p>
                
                <p>
                  This 3D model leverages <strong className="text-white">OpenStreetMap&apos;s open-source geographic data</strong>, enabling us to generate accurate 3D representations of any city worldwide and seamlessly import them into <strong className="text-purple-400">Blender</strong> for visualization and further development.
                </p>
                
                <p>
                  <strong className="text-orange-400">Temperature deltas are calculated approximately</strong>, short of being connected to the trained machine learning models. This demonstrates the potential of our integrated approach for urban heat island analysis and green infrastructure planning.
                </p>
              </div>
              
              {/* Technical Stack */}
              <div className="mt-8 pt-8 border-t border-slate-600/50">
                <h4 className="text-xl font-bold text-white mb-6">Technical Stack</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <h5 className="font-semibold text-blue-300 mb-2">Data Source</h5>
                    <p className="text-slate-300 text-sm">Landsat Collection 2</p>
                  </div>
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h5 className="font-semibold text-green-300 mb-2">3D Modeling</h5>
                    <p className="text-slate-300 text-sm">OpenStreetMap + Blender</p>
                  </div>
                  <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h5 className="font-semibold text-purple-300 mb-2">Visualization</h5>
                    <p className="text-slate-300 text-sm">Three.js + React</p>
                  </div>
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