'use client'

import { useState, useEffect } from 'react'

interface Flight {
  airline: string
  price: number
  departure: string
  arrival: string
  duration: string
  stops: number
  bookingUrl: string
}

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price')

  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/flights')
      const data = await response.json()
      setFlights(data.flights)
    } catch (error) {
      console.error('Error fetching flights:', error)
    } finally {
      setLoading(false)
    }
  }

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    const durationA = parseInt(a.duration)
    const durationB = parseInt(b.duration)
    return durationA - durationB
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              ✈️ Flight Search
            </h1>
            <div className="text-lg text-gray-600 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-semibold">Manchester (MAN)</span>
                <span>→</span>
                <span className="font-semibold">Lisbon (LIS)</span>
              </div>
              <div className="text-sm mt-2">
                📅 December 18, 2025 - December 31, 2025 (13 nights)
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSortBy('price')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'price'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Sort by Price
              </button>
              <button
                onClick={() => setSortBy('duration')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'duration'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Sort by Duration
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Searching for flights...</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {sortedFlights.map((flight, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="text-xl font-bold text-gray-800 mb-1">
                        {flight.airline}
                      </div>
                      <div className="text-sm text-gray-500">
                        {flight.stops === 0 ? (
                          <span className="text-green-600 font-medium">Direct Flight</span>
                        ) : (
                          <span>{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="text-sm text-gray-500 mb-1">Departure</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {flight.departure}
                      </div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="text-sm text-gray-500 mb-1">Arrival</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {flight.arrival}
                      </div>
                    </div>

                    <div className="flex-1 min-w-[120px]">
                      <div className="text-sm text-gray-500 mb-1">Duration</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {flight.duration}
                      </div>
                    </div>

                    <div className="flex-1 min-w-[150px] text-right">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        £{flight.price}
                      </div>
                      <a
                        href={flight.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🔍 Search Tips
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Book in advance for better prices</li>
              <li>• Direct flights are typically more expensive but save time</li>
              <li>• Consider flying mid-week for cheaper fares</li>
              <li>• Check multiple booking sites before finalizing</li>
              <li>• Set up price alerts for your route</li>
            </ul>
          </div>

          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Prices shown are estimates. Click "Book Now" to check availability and current pricing.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
