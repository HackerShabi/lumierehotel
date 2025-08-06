import React from 'react'
import { motion } from 'framer-motion'
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

const attractions = [
  {
    id: 1,
    name: 'Faisal Mosque',
    category: 'Culture',
    distance: '8.5 km',
    walkTime: '15 min drive',
    image: '/faisal-mosque.jpg',
    description: 'Iconic mosque and one of the largest in the world, a must-visit landmark of Islamabad.'
  },
  {
    id: 2,
    name: 'Daman-e-Koh',
    category: 'Recreation',
    distance: '12 km',
    walkTime: '20 min drive',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Scenic viewpoint in Margalla Hills offering panoramic views of Islamabad city.'
  },
  {
    id: 3,
    name: 'Pakistan Monument',
    category: 'Culture',
    distance: '6 km',
    walkTime: '12 min drive',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'National monument representing the four provinces and three territories of Pakistan.'
  },
  {
    id: 4,
    name: 'Rawal Lake',
    category: 'Recreation',
    distance: '15 km',
    walkTime: '25 min drive',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Beautiful artificial lake perfect for boating, picnics, and water sports activities.'
  },
  {
    id: 5,
    name: 'Shakarparian Park',
    category: 'Recreation',
    distance: '7 km',
    walkTime: '14 min drive',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Large recreational park with gardens, walking trails, and family-friendly activities.'
  },
  {
    id: 6,
    name: 'Centaurus Mall',
    category: 'Shopping',
    distance: '3 km',
    walkTime: '8 min drive',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Premier shopping destination with international brands, dining, and entertainment.'
  }
]

const categoryColors = {
  Shopping: 'bg-blue-500',
  Business: 'bg-gray-600',
  Culture: 'bg-purple-500',
  Dining: 'bg-red-500',
  Recreation: 'bg-green-500',
  Entertainment: 'bg-cyan-500'
}

const NearbyAttractions: React.FC = () => {
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
            Explore <span className="text-cyan-500">Islamabad</span> Attractions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the beauty and culture of Pakistan's capital city. From iconic landmarks and 
            scenic viewpoints to modern shopping centers, Islamabad offers unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`${categoryColors[attraction.category as keyof typeof categoryColors]} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {attraction.category}
                    </span>
                  </div>
                  
                  {/* Distance Info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-500 transition-colors duration-300">
                      {attraction.name}
                    </h3>
                    <div className="flex items-center justify-between text-white/90 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{attraction.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{attraction.walkTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {attraction.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transportation Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-luxury-dark to-gray-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Transportation & Accessibility
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Located in G-10/4 Islamabad, our hotel offers excellent connectivity to all major attractions and transportation hubs in the capital.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Metro Bus</h4>
                <p className="text-gray-300">5 minutes walk to Metro Bus Station</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Airport</h4>
                <p className="text-gray-300">30 minutes drive to Islamabad International Airport</p>
              </div>
              
              <div>
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Blue Area</h4>
                <p className="text-gray-300">15 minutes drive to Blue Area business district</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NearbyAttractions