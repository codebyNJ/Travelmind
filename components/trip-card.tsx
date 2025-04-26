interface TripCardProps {
  trip: {
    id: string
    title: string
    date: string
    category: string
    description: string
    aiSummary: string
  }
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-4 h-full flex flex-col">
      <div className="mb-3">
        <span className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 mb-2">{trip.category}</span>
        <h3 className="text-lg font-semibold text-gray-800">{trip.title}</h3>
        <p className="text-sm text-gray-500">{trip.date}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Your Notes</h4>
        <p className="text-sm text-gray-600">{trip.description}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-1">AI Insights</h4>
        <p className="text-sm text-gray-600">{trip.aiSummary}</p>
      </div>
    </div>
  )
}
