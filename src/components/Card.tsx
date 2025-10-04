interface CardProps {
  title: string
  description: string
  icon?: React.ReactNode
  variant?: 'danger' | 'info' | 'success' | 'default'
}

export default function Card({ title, description, icon, variant = 'default' }: CardProps) {
  const variants = {
    danger: {
      container: "p-6 bg-red-900/30 border border-red-700/50 rounded-lg hover:border-red-400 hover:bg-red-900/40 transition-all duration-300 group",
      icon: "mb-4 text-red-300 group-hover:text-red-200 transition-colors",
      title: "text-xl font-semibold text-red-100 mb-3 group-hover:text-white transition-colors",
      description: "text-red-200/80 group-hover:text-red-100 transition-colors"
    },
    info: {
      container: "p-6 bg-blue-900/30 border border-blue-700/50 rounded-lg hover:border-blue-400 hover:bg-blue-900/40 transition-all duration-300 group",
      icon: "mb-4 text-blue-300 group-hover:text-blue-200 transition-colors",
      title: "text-xl font-semibold text-blue-100 mb-3 group-hover:text-white transition-colors",
      description: "text-blue-200/80 group-hover:text-blue-100 transition-colors"
    },
    success: {
      container: "p-6 bg-green-900/30 border border-green-700/50 rounded-lg hover:border-green-400 hover:bg-green-900/40 transition-all duration-300 group",
      icon: "mb-4 text-green-300 group-hover:text-green-200 transition-colors",
      title: "text-xl font-semibold text-green-100 mb-3 group-hover:text-white transition-colors",
      description: "text-green-200/80 group-hover:text-green-100 transition-colors"
    },
    default: {
      container: "p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-500 transition-all duration-300 group",
      icon: "mb-4 text-slate-400 group-hover:text-slate-300 transition-colors",
      title: "text-xl font-semibold text-white mb-3 group-hover:text-slate-100 transition-colors",
      description: "text-slate-300 group-hover:text-slate-200 transition-colors"
    }
  }

  const currentVariant = variants[variant]

  return (
    <div className={currentVariant.container}>
      {icon && (
        <div className={currentVariant.icon}>
          {icon}
        </div>
      )}
      <h3 className={currentVariant.title}>
        {title}
      </h3>
      <p className={currentVariant.description}>
        {description}
      </p>
    </div>
  )
}