interface CardProps {
  title: string
  description: string
  icon?: React.ReactNode
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition-colors">
      {icon && (
        <div className="mb-4 text-blue-400">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-300">
        {description}
      </p>
    </div>
  )
}