import { NextResponse } from 'next/server'

export async function GET() {
  // Simulate flight data with realistic prices for Manchester to Lisbon
  const flights = [
    {
      airline: 'Ryanair',
      price: 89,
      departure: '06:30',
      arrival: '09:15',
      duration: '2h 45m',
      stops: 0,
      bookingUrl: 'https://www.ryanair.com/gb/en/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2025-12-18&dateIn=2025-12-31&isConnectedFlight=false&isReturn=true&discount=0&promoCode=&originIata=MAN&destinationIata=LIS'
    },
    {
      airline: 'easyJet',
      price: 125,
      departure: '11:45',
      arrival: '14:30',
      duration: '2h 45m',
      stops: 0,
      bookingUrl: 'https://www.easyjet.com/en/book-flights'
    },
    {
      airline: 'TAP Air Portugal',
      price: 156,
      departure: '13:20',
      arrival: '16:05',
      duration: '2h 45m',
      stops: 0,
      bookingUrl: 'https://www.flytap.com/en-gb/book-a-flight'
    },
    {
      airline: 'British Airways',
      price: 189,
      departure: '09:15',
      arrival: '12:00',
      duration: '2h 45m',
      stops: 0,
      bookingUrl: 'https://www.britishairways.com/travel/home/public/en_gb'
    },
    {
      airline: 'Lufthansa',
      price: 245,
      departure: '07:00',
      arrival: '13:45',
      duration: '6h 45m',
      stops: 1,
      bookingUrl: 'https://www.lufthansa.com/gb/en/homepage'
    },
    {
      airline: 'KLM',
      price: 198,
      departure: '15:30',
      arrival: '21:40',
      duration: '6h 10m',
      stops: 1,
      bookingUrl: 'https://www.klm.com/home/gb/en'
    },
    {
      airline: 'Air France',
      price: 215,
      departure: '08:45',
      arrival: '15:20',
      duration: '6h 35m',
      stops: 1,
      bookingUrl: 'https://www.airfrance.co.uk/'
    },
    {
      airline: 'Vueling',
      price: 142,
      departure: '14:25',
      arrival: '19:50',
      duration: '5h 25m',
      stops: 1,
      bookingUrl: 'https://www.vueling.com/en'
    },
    {
      airline: 'Iberia',
      price: 178,
      departure: '10:30',
      arrival: '16:15',
      duration: '5h 45m',
      stops: 1,
      bookingUrl: 'https://www.iberia.com/gb/'
    },
    {
      airline: 'Wizz Air',
      price: 95,
      departure: '17:50',
      arrival: '20:35',
      duration: '2h 45m',
      stops: 0,
      bookingUrl: 'https://wizzair.com/en-gb'
    }
  ]

  // Sort by price
  const sortedFlights = flights.sort((a, b) => a.price - b.price)

  return NextResponse.json({ flights: sortedFlights })
}
