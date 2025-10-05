interface StatCardProps {
  value: string
  label: string
  variant?: 'danger' | 'info' | 'success' | 'default'
}

export default function StatCard({ value, label, variant = 'default' }: StatCardProps) {
  const variants = {
    danger: {
      container: "p-6 bg-red-900/30 border border-red-700/50 rounded-lg hover:border-red-400 hover:bg-red-900/40 transition-all duration-300 text-center group",
      value: "text-3xl md:text-4xl font-bold text-red-300 mb-2 group-hover:text-red-200 transition-colors",
      label: "text-red-100/80 text-sm group-hover:text-red-100 transition-colors"
    },
    info: {
      container: "p-6 bg-blue-900/30 border border-blue-700/50 rounded-lg hover:border-blue-400 hover:bg-blue-900/40 transition-all duration-300 text-center group",
      value: "text-3xl md:text-4xl font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors",
      label: "text-blue-100/80 text-sm group-hover:text-blue-100 transition-colors"
    },
    success: {
      container: "p-6 bg-green-900/30 border border-green-700/50 rounded-lg hover:border-green-400 hover:bg-green-900/40 transition-all duration-300 text-center group",
      value: "text-3xl md:text-4xl font-bold text-green-300 mb-2 group-hover:text-green-200 transition-colors",
      label: "text-green-100/80 text-sm group-hover:text-green-100 transition-colors"
    },
    default: {
      container: "p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-500 transition-all duration-300 text-center group",
      value: "text-3xl md:text-4xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors",
      label: "text-slate-300 text-sm group-hover:text-slate-200 transition-colors"
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className={currentVariant.container}>
      <div className={currentVariant.value}>
        {value}
      </div>
      <div className={currentVariant.label}>
        {label}
      </div>
    </div>
  )
}