interface StatCardProps {
  value: string
  label: string
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-red-500 transition-colors text-center">
      <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
        {value}
      </div>
      <div className="text-slate-300 text-sm">
        {label}
      </div>
    </div>
  )
}