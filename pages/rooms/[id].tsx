import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {
  StarIcon,
  UserGroupIcon,
  HomeIcon,
  WifiIcon,
  TvIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

interface Room {
  _id?: string
  id?: number
  name: string
  type: string
  price: number
  originalPrice?: number
  maxOccupancy: number
  size: string | number
  description: string
  longDescription?: string
  images: string[]
  amenities: string[]
  rating?: number
  reviewCount?: number
  available?: boolean
  isPopular?: boolean
  discount?: number
  features?: {
    bedType: string
    view: string
    bathroom: string
    area: string
  }
  policies?: {
    checkIn: string
    checkOut: string
    cancellation: string
    smoking: boolean
    pets: boolean
  }
}



const RoomDetailPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [room, setRoom] = useState<Room | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    const fetchRoom = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/rooms/${id}`)
          if (response.ok) {
            const roomData = await response.json()
            setRoom(roomData)
          } else {
            toast.error('Room not found')
            router.push('/rooms')
          }
        } catch (error) {
          console.error('Error fetching room:', error)
          toast.error('Failed to load room details')
          router.push('/rooms')
        }
      }
    }

    fetchRoom()
  }, [id, router])

  const nextImage = () => {
    if (room) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length)
    }
  }

  const prevImage = () => {
    if (room) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
    }
  }

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates')
      return
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      toast.error('Check-out date must be after check-in date')
      return
    }

    // Directly navigate to checkout without delay
    router.push({
      pathname: '/checkout',
      query: {
        roomId: room?._id || room?.id,
        roomName: room?.name,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests
      }
    })
  }

  if (!room) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading room details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-cyan-500 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/rooms" className="hover:text-cyan-500 transition-colors">Rooms</Link>
              <span>/</span>
              <span className="text-luxury-dark font-medium">{room.name}</span>
            </nav>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src={room.images[currentImageIndex]}
                    alt={room.name}
                    width={800}
                    height={384}
                    className="w-full h-96 object-cover cursor-pointer"
                    onClick={() => setShowImageModal(true)}
                    unoptimized={true}
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {room.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {room.isPopular && (
                      <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popular Choice
                      </span>
                    )}
                    {room.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {room.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {room.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${room.name} ${index + 1}`}
                      className={`h-20 object-cover rounded-lg cursor-pointer transition-all ${
                        index === currentImageIndex
                          ? 'ring-2 ring-cyan-500'
                          : 'hover:opacity-80'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Room Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-cyan-700 mb-2">
                      {room.name}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="h-5 w-5" />
                        <span>Up to {room.maxOccupancy} guests</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <HomeIcon className="h-5 w-5" />
                        <span>{typeof room.size === 'number' ? `${room.size} sqm` : room.size}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarIconSolid className="h-5 w-5 text-cyan-500" />
                        <span>{room.rating || 4.5} ({room.reviewCount || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {room.originalPrice && (
                      <p className="text-lg text-gray-500 line-through">${room.originalPrice}</p>
                    )}
                    <p className="text-3xl font-bold text-cyan-500">{room.price.toLocaleString()} PKR</p>
                    <p className="text-gray-600">per night</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {room.longDescription || room.description}
                </p>

                {/* Room Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-luxury-dark mb-1">Bed Type</h4>
                    <p className="text-gray-600 text-sm">{room.features?.bedType || 'King Bed'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-luxury-dark mb-1">View</h4>
                    <p className="text-gray-600 text-sm">{room.features?.view || 'City View'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-luxury-dark mb-1">Bathroom</h4>
                    <p className="text-gray-600 text-sm">{room.features?.bathroom || 'Private'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-luxury-dark mb-1">Area</h4>
                    <p className="text-gray-600 text-sm">{room.features?.area || '35 sqm'}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-xl font-semibold text-cyan-700 mb-4">Room Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Policies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="text-xl font-semibold text-cyan-700 mb-6">Hotel Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-luxury-dark mb-2">Check-in / Check-out</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>Check-in: {room.policies?.checkIn || '3:00 PM'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4" />
                        <span>Check-out: {room.policies?.checkOut || '12:00 PM'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-dark mb-2">Cancellation</h4>
                    <p className="text-gray-600">{room.policies?.cancellation || 'Free cancellation up to 24 hours before check-in'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-dark mb-2">Smoking Policy</h4>
                    <div className="flex items-center space-x-2">
                      {room.policies?.smoking ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <XMarkIcon className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-gray-600">
                        {room.policies?.smoking ? 'Smoking allowed' : 'Non-smoking room'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-luxury-dark mb-2">Pet Policy</h4>
                    <div className="flex items-center space-x-2">
                      {room.policies?.pets ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <XMarkIcon className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-gray-600">
                        {room.policies?.pets ? 'Pets allowed' : 'No pets allowed'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {room.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${room.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-cyan-500">{room.price.toLocaleString()} PKR</span>
                  </div>
                  <p className="text-gray-600">per night</p>
                  {room.discount && (
                    <p className="text-green-600 font-semibold">Save {room.discount}%!</p>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      {Array.from({ length: room.maxOccupancy }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {checkInDate && checkOutDate && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total nights:</span>
                      <span className="font-semibold">
                        {Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Room rate:</span>
                      <span className="font-semibold">${room.price} / night</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-cyan-500">
                        {(room.price * Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))).toLocaleString()} PKR
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBookNow}
                  disabled={!room.available || isBooking}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    room.available && !isBooking
                      ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isBooking ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : room.available ? (
                    'Book Now'
                  ) : (
                    'Unavailable'
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help with booking?</p>
                  <div className="flex items-center justify-center space-x-1 text-cyan-500">
                    <PhoneIcon className="h-4 w-4" />
                     <span className="text-sm font-semibold">+92 325 0104555</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              <Image
                src={room.images[currentImageIndex]}
                alt={room.name}
                width={1024}
                height={768}
                className="max-w-full max-h-full object-contain"
                unoptimized={true}
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronLeftIcon className="h-8 w-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
              >
                <ChevronRightIcon className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default RoomDetailPage