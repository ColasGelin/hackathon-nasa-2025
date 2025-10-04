export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-6 mb-4">
          <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
          </svg>
          <span className="text-slate-400">×</span>
          <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1"/>
          </svg>
        </div>
        <p className="text-slate-400">
          © 2025 | NASA Space Apps Challenge
        </p>
      </div>
    </footer>
  )
}