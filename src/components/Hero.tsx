export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-orange-500 to-blue-500">
      <div className="text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Fighting Urban Heat Islands
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-slate-100">
          Satellite intelligence for resilient cities
        </p>
        <a 
          href="/project"
          className="inline-flex items-center bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors"
        >
          View Demo →
        </a>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}