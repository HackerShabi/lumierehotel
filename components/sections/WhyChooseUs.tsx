import React from 'react'
import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  SparklesIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  HomeModernIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    icon: MapPinIcon,
    title: 'Prime Location',
    description: 'Located in the heart of the city center with easy access to major attractions, shopping districts, and business hubs.'
  },
  {
    icon: SparklesIcon,
    title: 'Luxury Amenities',
    description: 'World-class facilities including spa, fitness center, and fine dining restaurants for an unforgettable experience.'
  },
  {
    icon: ClockIcon,
    title: '24/7 Service',
    description: 'Round-the-clock concierge, room service, and customer support to ensure your comfort at any hour of the day.'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Best Rates',
    description: 'Competitive pricing with exclusive deals and packages. We guarantee the best value for luxury accommodation.'
  },
  {
    icon: HomeModernIcon,
    title: 'Modern Comfort',
    description: 'Contemporary rooms and suites equipped with smart technology, premium bedding, and stunning city views.'
  },
  {
    icon: UserGroupIcon,
    title: 'Exceptional Staff',
    description: 'Highly trained professionals dedicated to providing personalized service and creating memorable experiences for every guest.'
  }
]

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury-dark mb-6">
            Why Choose Our Hotel?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover what makes us the preferred choice for discerning travelers seeking 
            exceptional hospitality and unmatched luxury in the heart of the city.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-luxury-dark mb-4 group-hover:text-cyan-500 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-luxury-dark rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-gray-300">Happy Guests</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-gray-300">Luxury Rooms</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-gray-300">Premium Services</div>
              </div>
              <div className="text-white">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-300">Customer Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs