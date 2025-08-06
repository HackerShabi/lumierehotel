import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import { motion } from 'framer-motion'
import { CheckCircleIcon, CalendarDaysIcon, UserGroupIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { getBookings, getRooms, Booking, Room } from '../lib/firebaseServices'

interface BookingWithRoom extends Booking {
  room?: Room
}

const BookingConfirmationPage = () => {
  const router = useRouter()
  const [booking, setBooking] = useState<BookingWithRoom | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!router.isReady) return
      
      const { bookingId } = router.query
      
      if (!bookingId) {
        toast.error('No booking ID provided')
        router.push('/rooms')
        return
      }
      
      try {
        const bookings = await getBookings()
        const foundBooking = bookings.find(b => b.id === bookingId)
        
        if (!foundBooking) {
          toast.error('Booking not found')
          router.push('/rooms')
          return
        }
        
        // Fetch room details
        const rooms = await getRooms()
        const room = rooms.find(r => r.id === foundBooking.roomId)
        
        setBooking({ ...foundBooking, room })
      } catch (error) {
        console.error('Error fetching booking details:', error)
        toast.error('Failed to load booking details')
        router.push('/rooms')
      } finally {
        setLoading(false)
      }
    }
    
    fetchBookingDetails()
  }, [router.isReady, router.query, router])

  if (loading || !booking) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }
  
  const calculateNights = () => {
    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }
  
  const nights = calculateNights()
  const pricePerNight = booking.roomPrice || 0
  const subtotal = pricePerNight * nights
  const taxes = subtotal * 0.1
  const total = subtotal + taxes

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-luxury-cream via-white to-luxury-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <CheckCircleIcon className="h-20 w-20 text-green-500" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-luxury-dark mb-4">
              Booking <span className="text-luxury-gold">Confirmed!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for choosing our luxury hotel
            </p>
            <p className="text-lg text-gray-500">
              Booking ID: <span className="font-bold text-blue-600">{booking.id}</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Booking <span className="text-blue-600">Details</span>
              </h2>
              
              {/* Room Image */}
              <div className="mb-6">
                {booking.room?.images && booking.room.images.length > 0 && (
                  <img
                    src={booking.room.images[0]}
                    alt={booking.room.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-900 mt-4">
                  {booking.room?.name || 'Room'}
                </h3>
              </div>

              {/* Stay Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                    <p className="font-medium">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <UserGroupIcon className="h-5 w-5" />
                  <span className="font-medium">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <span className="font-medium">{nights} Night{nights > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-6 mt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>${pricePerNight}/night × {nights} nights</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total Paid</span>
                  <span>${booking.totalAmount.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Payment Status: {booking.paymentStatus}
                </div>
              </div>
            </motion.div>

            {/* Guest Information & Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Guest Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Guest <span className="text-blue-600">Information</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Guest Name</p>
                    <p className="font-semibold text-gray-900">{booking.guestInfo?.firstName ? `${booking.guestInfo.firstName} ${booking.guestInfo.lastName || ''}` : booking.guestName || 'Guest'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{booking.guestInfo?.email || booking.email || 'No email provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">{booking.guestInfo?.phone || booking.phone || 'No phone provided'}</p>
                  </div>
                  {booking.specialRequests && (
                    <div>
                      <p className="text-sm text-gray-500">Special Requests</p>
                      <p className="font-semibold text-gray-900">{booking.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Contact <span className="text-blue-600">Information</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Hotel Address</p>
                      <p className="text-gray-600">123 Luxury Avenue, Paradise City, PC 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">reservations@luxuryhotel.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Check-in time: 3:00 PM</li>
                  <li>• Check-out time: 11:00 AM</li>
                  <li>• Please bring a valid ID for check-in</li>
                  <li>• Confirmation email has been sent to your email address</li>
                  <li>• For any changes or cancellations, please contact us at least 24 hours in advance</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Return to Home
            </button>
            <button
              onClick={() => router.push('/rooms')}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              Book Another Room
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default BookingConfirmationPage