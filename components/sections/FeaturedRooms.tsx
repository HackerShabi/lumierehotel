import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { UserIcon, WifiIcon, TvIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const featuredRooms = [
  {
    id: '1',
    name: 'Deluxe Green Room 1',
    type: 'Deluxe Green',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    image: 'https://cf.bstatic.com/xdata/images/hotel/max300/674164664.jpg?k=4811444de2293573fe8fa0021a2a5cf062a988fc3cf7c78c8025216246175cb1&o=',
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Flexible Occupancy'],
    description: 'Elegant green-themed room with attached bath service, breakfast included, and modern amenities. Supports single, double, and triple occupancy with flexible pricing.',
    maxOccupancy: 3,
    isPopular: true
  },
  {
    id: '4',
    name: 'Deluxe Blue Room 1',
    type: 'Deluxe Blue',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    image: 'https://cf.bstatic.com/xdata/images/hotel/max300/674164675.jpg?k=6425b05acb24c18a43b5af10beef94ff39e5a3ab3565c7f021f42b0820df39e6&o=',
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Flexible Occupancy'],
    description: 'Elegant blue-themed room with attached bath service, breakfast included, and modern amenities. Supports single, double, and triple occupancy with flexible pricing.',
    maxOccupancy: 3,
    isPopular: true
  }
]

const FeaturedRooms: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark mb-6">
            Featured Rooms & Suites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of rooms and suites, each designed to provide 
            the perfect blend of comfort, luxury, and modern amenities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {featuredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {room.price.toLocaleString()} PKR/night
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 flex gap-2">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="bg-white text-luxury-dark px-4 py-2 rounded-lg font-semibold hover:bg-cyan-500 hover:text-white transition-colors duration-300 inline-flex items-center space-x-2 flex-1"
                    >
                      <span>View Details</span>
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/checkout?roomId=${room.id}&checkIn=${new Date().toISOString().split('T')[0]}&checkOut=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}&guests=2`}
                      className="bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-600 transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Store booking details in localStorage as backup
                        const bookingDetails = {
                          roomId: room.id,
                          checkInDate: new Date().toISOString().split('T')[0],
                          checkOutDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                          guests: 2,
                          roomName: room.name,
                          roomPrice: room.price
                        };
                        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-semibold text-luxury-dark group-hover:text-cyan-500 transition-colors duration-300">
                      {room.name}
                    </h3>
                    {room.isPopular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((amenity, amenityIndex) => (
                      <span
                        key={amenityIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <div className="flex items-center space-x-1">
                        <UserIcon className="h-4 w-4" />
                        <span className="text-sm">Max {room.maxOccupancy} Guests</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <WifiIcon className="h-4 w-4" />
                        <span className="text-sm">Free WiFi</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-500">
                        From {room.pricing?.single?.toLocaleString() || room.price.toLocaleString()} PKR
                      </div>
                      <div className="text-sm text-gray-500">per night + Tax</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/rooms"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span>Explore All Rooms</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedRooms