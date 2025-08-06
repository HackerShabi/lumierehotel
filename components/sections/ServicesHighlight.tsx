import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  TruckIcon,
  SparklesIcon,
  CreditCardIcon,
  WifiIcon,
  ShieldCheckIcon,
  FireIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    icon: HeartIcon,
    title: 'Doctor on Call',
    description: '24/7 medical assistance available for your peace of mind and health security.'
  },
  {
    icon: TruckIcon,
    title: 'Rent a Car & Tours',
    description: 'Vehicle rental and guided tour packages to explore the city and surroundings.'
  },
  {
    icon: SparklesIcon,
    title: 'Laundry & Press Services',
    description: 'Professional garment care with same-day service for your convenience.'
  },
  {
    icon: CreditCardIcon,
    title: 'Debit Card Facility',
    description: 'Secure payment processing with multiple payment options available.'
  },
  {
    icon: WifiIcon,
    title: 'High-Speed WiFi',
    description: 'Complimentary high-speed internet throughout the property for all guests.'
  },
  {
    icon: ShieldCheckIcon,
    title: '24/7 Security',
    description: 'CCTV surveillance and round-the-clock security for your safety and peace of mind.'
  },
  {
    icon: FireIcon,
    title: 'Restaurant & Fast Food',
    description: 'On-site dining options with diverse cuisine and quick service available.'
  },
  {
    icon: PhoneIcon,
    title: '24 Hr Room Service',
    description: 'Anytime in-room dining and assistance whenever you need it, day or night.'
  }
]

const ServicesHighlight: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark mb-6">
            Premium Services & Amenities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience our comprehensive range of services designed to make your stay 
            comfortable, convenient, and truly memorable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-luxury-gold to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-luxury-dark mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-semibold text-luxury-dark mb-8 text-center">
            Additional Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Smart LED Lighting',
              'Standby Generator',
              'Electric Power Bank',
              'Hot & Cold Water',
              'Daily Housekeeping',
              'Elevator Access',
              'Covered Parking',
              '24 Hr Reception',
              'Solar System',
              'Fridge & Mini Bar',
              'DC Inverter',
              'Telephone Service'
            ].map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                <div className="w-2 h-2 bg-luxury-gold rounded-full flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{amenity}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-luxury-gold to-gold-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span>View All Services</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesHighlight