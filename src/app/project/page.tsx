export default function ProjectDemo() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Interactive Demo</h1>
        <p className="text-xl text-slate-300 mb-8">
          Urban heat island monitoring platform
        </p>
        <div className="p-8 bg-slate-800 border border-slate-700 rounded-lg">
          <div className="text-6xl mb-4">🛰️</div>
          <p className="text-slate-300">
            Demo interface under development...
          </p>
          <a 
            href="/" 
            className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}