import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import {
  UserGroupIcon,
  TruckIcon,
  SparklesIcon,
  CreditCardIcon,
  LightBulbIcon,
  WifiIcon,
  BoltIcon,
  BuildingOfficeIcon,
  VideoCameraIcon,
  
  FireIcon,
  PhoneIcon,
  HomeModernIcon,
  ArrowUpIcon,
  ShieldCheckIcon,
  SunIcon,
  BeakerIcon,
  CpuChipIcon,
  ClockIcon,
  MapPinIcon,
  HeartIcon,
  StarIcon,
  CakeIcon
} from '@heroicons/react/24/outline'

interface Service {
  id: number
  name: string
  description: string
  icon: React.ComponentType<any>
  category: 'professional' | 'amenities' | 'facilities' | 'technology'
  isPopular?: boolean
  available24h?: boolean
}

const services: Service[] = [
  // Professional Services
  {
    id: 1,
    name: 'Doctor on Call',
    description: '24/7 medical assistance available with qualified healthcare professionals ready to assist you.',
    icon: HeartIcon,
    category: 'professional',
    available24h: true,
    isPopular: true
  },
  {
    id: 2,
    name: 'Rent a Car & Tours',
    description: 'Vehicle rental services and guided tour packages to explore the city and surrounding areas.',
    icon: TruckIcon,
    category: 'professional',
    isPopular: true
  },
  {
    id: 3,
    name: 'Laundry Wash & Press Services',
    description: 'Professional garment care with same-day service for washing, dry cleaning, and pressing.',
    icon: SparklesIcon,
    category: 'professional',
    available24h: true
  },
  {
    id: 4,
    name: 'Debit Card Facility',
    description: 'Secure payment processing with multiple payment options including contactless transactions.',
    icon: CreditCardIcon,
    category: 'professional'
  },

  // Room Amenities & Technology
  {
    id: 5,
    name: 'Smart LED Lighting',
    description: 'Energy-efficient LED lighting systems with smart controls for optimal ambiance.',
    icon: LightBulbIcon,
    category: 'technology',
    isPopular: true
  },
  {
    id: 6,
    name: 'High-Speed WiFi',
    description: 'Complimentary high-speed internet access throughout the property with fiber optic connectivity.',
    icon: WifiIcon,
    category: 'technology',
    isPopular: true
  },
  {
    id: 7,
    name: 'Stand by Generator',
    description: 'Uninterrupted power supply with backup generators ensuring continuous electricity.',
    icon: BoltIcon,
    category: 'facilities'
  },
  {
    id: 8,
    name: 'Fast Food & Restaurant',
    description: 'On-site dining options with 24/7 room service, international cuisine, and quick bites.',
    icon: BuildingOfficeIcon,
    category: 'amenities',
    available24h: true,
    isPopular: true
  },
  {
    id: 9,
    name: 'CCTV Security System',
    description: '24/7 security surveillance with advanced CCTV monitoring for guest safety and security.',
    icon: VideoCameraIcon,
    category: 'facilities',
    available24h: true
  },
  {
    id: 10,
    name: 'Electric Power Bank Stations',
    description: 'Convenient device charging stations located throughout the hotel for all your electronic needs.',
    icon: BoltIcon,
    category: 'technology'
  },
  {
    id: 11,
    name: 'Hot and Cold Water',
    description: 'Temperature-controlled water supply available 24/7 in all rooms and common areas.',
    icon: FireIcon,
    category: 'amenities',
    available24h: true
  },
  {
    id: 12,
    name: 'Direct Dial Telephone',
    description: 'In-room telephone service with international calling capabilities and concierge connection.',
    icon: PhoneIcon,
    category: 'amenities'
  },
  {
    id: 13,
    name: 'Daily Housekeeping',
    description: 'Professional room cleaning service with eco-friendly products and attention to detail.',
    icon: HomeModernIcon,
    category: 'amenities',
    isPopular: true
  },
  {
    id: 14,
    name: 'High-Speed Elevators',
    description: 'Modern elevator systems providing easy and quick access to all floors with safety features.',
    icon: ArrowUpIcon,
    category: 'facilities'
  },
  {
    id: 15,
    name: 'Covered Car Parking',
    description: 'Secure covered parking facility with 24/7 security monitoring and valet service available.',
    icon: ShieldCheckIcon,
    category: 'facilities',
    available24h: true
  },
  {
    id: 16,
    name: '24 Hr Reception Desk',
    description: 'Round-the-clock front desk service with multilingual staff ready to assist with any requests.',
    icon: ClockIcon,
    category: 'professional',
    available24h: true,
    isPopular: true
  },
  {
    id: 17,
    name: '24 Hr Room Service',
    description: 'Anytime in-room dining service with extensive menu options and prompt delivery.',
    icon: TruckIcon,
    category: 'amenities',
    available24h: true,
    isPopular: true
  },
  {
    id: 18,
    name: 'Solar Energy System',
    description: 'Eco-friendly solar power solutions contributing to sustainable and green hospitality.',
    icon: SunIcon,
    category: 'technology'
  },
  {
    id: 19,
    name: 'Fridge and Mini Bar',
    description: 'In-room refrigeration and mini bar facilities stocked with premium beverages and snacks.',
    icon: BeakerIcon,
    category: 'amenities',
    isPopular: true
  },
  {
    id: 20,
    name: 'DC Inverter System',
    description: 'Advanced backup power systems for essential appliances ensuring uninterrupted comfort.',
    icon: CpuChipIcon,
    category: 'technology'
  },
  {
    id: 21,
    name: 'Breakfast Service',
    description: 'Complimentary continental breakfast with local and international cuisine, fresh fruits, and premium beverages served daily.',
    icon: CakeIcon,
    category: 'amenities',
    isPopular: true,
    available24h: false
  }
]

const categoryColors = {
  professional: 'bg-blue-100 text-blue-800',
  amenities: 'bg-green-100 text-green-800',
  facilities: 'bg-purple-100 text-purple-800',
  technology: 'bg-orange-100 text-orange-800'
}

const categoryNames = {
  professional: 'Professional Services',
  amenities: 'Room Amenities',
  facilities: 'Hotel Facilities',
  technology: 'Technology & Innovation'
}

const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [filteredServices, setFilteredServices] = React.useState<Service[]>(services)

  React.useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services)
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory))
    }
  }, [selectedCategory])

  const categories = ['all', 'professional', 'amenities', 'facilities', 'technology']

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-cyan-600 text-white py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/90 to-luxury-dark/70" />
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Hotel Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                Premium <span className="text-cyan-500">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Experience unparalleled luxury with our comprehensive range of world-class services and amenities
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Overview Stats */}
        <section className="py-16 bg-cyan-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              <div className="p-6">
                <div className="text-4xl font-bold text-cyan-500 mb-2">21+</div>
                <div className="text-gray-600">Premium Services</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-cyan-500 mb-2">24/7</div>
                <div className="text-gray-600">Available Services</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-cyan-500 mb-2">100%</div>
                <div className="text-gray-600">Guest Satisfaction</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-cyan-500 mb-2">5★</div>
                <div className="text-gray-600">Service Rating</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {category === 'all' ? 'All Services' : categoryNames[category as keyof typeof categoryNames]}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-cyan-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredServices.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group"
                  >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.isPopular && (
                        <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <StarIcon className="h-3 w-3" />
                          <span>Popular</span>
                        </span>
                      )}
                      {service.available24h && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>24/7</span>
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[service.category]}`}>
                        {categoryNames[service.category]}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-cyan-500" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-luxury-dark mb-3 group-hover:text-cyan-500 transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white text-gray-800">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold mb-6">
                Experience <span className="text-cyan-500">Exceptional Service</span>
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Our dedicated team is committed to providing you with unparalleled service and ensuring your stay exceeds all expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-600 transition-colors duration-300"
                >
                  Book Your Stay
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-luxury-dark transition-all duration-300"
                >
                  Contact Concierge
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Guarantee */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-serif font-bold text-luxury-dark mb-8">
                Our Service <span className="text-cyan-500">Guarantee</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheckIcon className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-luxury-dark mb-3">Quality Assurance</h3>
                  <p className="text-gray-600">
                    Every service is delivered with the highest standards of quality and professionalism.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClockIcon className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-luxury-dark mb-3">Timely Service</h3>
                  <p className="text-gray-600">
                    Prompt and efficient service delivery ensuring your time is valued and respected.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-luxury-dark mb-3">Guest Satisfaction</h3>
                  <p className="text-gray-600">
                    Your satisfaction is our priority, and we go above and beyond to exceed expectations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ServicesPage