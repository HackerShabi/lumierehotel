import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import {
  HeartIcon,
  StarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  TrophyIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  description: string
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ComponentType<any>
  year: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'General Manager',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'With over 15 years in luxury hospitality, Sarah leads our team with passion and dedication to excellence.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Head Concierge',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Michael ensures every guest experience is personalized and memorable with his extensive local knowledge.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Emily brings culinary artistry to our restaurants with her innovative approach to international cuisine.'
  },
  {
    id: 4,
    name: 'David Thompson',
    position: 'Guest Relations Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'David specializes in creating exceptional guest experiences and maintaining our high service standards.'
  }
]

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'World Luxury Hotel Awards',
    description: 'Recognized as Best Luxury Hotel in the region for exceptional service and amenities.',
    icon: TrophyIcon,
    year: '2023'
  },
  {
    id: 2,
    title: 'TripAdvisor Travelers Choice',
    description: 'Ranked in the top 1% of hotels worldwide based on guest reviews and ratings.',
    icon: StarIcon,
    year: '2023'
  },
  {
    id: 3,
    title: 'Green Hotel Certification',
    description: 'Certified for our commitment to sustainable practices and environmental responsibility.',
    icon: GlobeAltIcon,
    year: '2022'
  },
  {
    id: 4,
    title: 'Excellence in Hospitality',
    description: 'Awarded for outstanding customer service and innovative hospitality solutions.',
    icon: HeartIcon,
    year: '2022'
  }
]

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-luxury-dark text-white py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/90 to-luxury-dark/70" />
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="About Us"
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
                About <span className="text-luxury-gold">Our Hotel</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Discover the story behind our commitment to luxury, excellence, and unforgettable experiences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-6">
                  Our <span className="text-luxury-gold">Story</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Founded in 1995, our hotel has been a beacon of luxury and hospitality for over two decades. 
                  What started as a vision to create an extraordinary guest experience has evolved into a 
                  world-class destination that combines timeless elegance with modern sophistication.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Located in the heart of the city, we have welcomed guests from around the globe, each leaving 
                  with memories that last a lifetime. Our commitment to excellence has earned us numerous awards 
                  and recognition in the hospitality industry.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Today, we continue to set new standards in luxury hospitality, blending traditional service 
                  values with innovative amenities and sustainable practices.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Hotel History"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-luxury-gold text-white p-6 rounded-lg shadow-lg">
                  <div className="text-3xl font-bold">28+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-100">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-6">
                Our <span className="text-luxury-gold">Mission & Vision</span>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <HeartIcon className="h-8 w-8 text-luxury-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-luxury-dark mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide exceptional hospitality experiences that exceed our guests' expectations through 
                  personalized service, luxurious accommodations, and attention to every detail. We strive to 
                  create lasting memories and build meaningful relationships with every guest who walks through our doors.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <StarIcon className="h-8 w-8 text-luxury-gold" />
                </div>
                <h3 className="text-2xl font-semibold text-luxury-dark mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be recognized as the premier luxury hotel destination, setting the standard for excellence 
                  in hospitality. We envision a future where our commitment to sustainability, innovation, and 
                  guest satisfaction makes us the preferred choice for discerning travelers worldwide.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-6">
                Our <span className="text-luxury-gold">Core Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These fundamental principles guide everything we do and shape the exceptional experiences we create
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: SparklesIcon,
                  title: 'Excellence',
                  description: 'We pursue perfection in every aspect of our service and continuously strive to exceed expectations.'
                },
                {
                  icon: HeartIcon,
                  title: 'Hospitality',
                  description: 'Genuine care and warmth are at the heart of every interaction with our guests.'
                },
                {
                  icon: ShieldCheckIcon,
                  title: 'Integrity',
                  description: 'We operate with honesty, transparency, and ethical practices in all our business dealings.'
                },
                {
                  icon: GlobeAltIcon,
                  title: 'Sustainability',
                  description: 'We are committed to environmental responsibility and sustainable tourism practices.'
                }
              ].map((value, index) => {
                const IconComponent = value.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="w-16 h-16 bg-luxury-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-luxury-gold" />
                    </div>
                    <h3 className="text-xl font-semibold text-luxury-dark mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-100">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-6">
                Meet Our <span className="text-luxury-gold">Leadership Team</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our experienced team of hospitality professionals is dedicated to ensuring your stay is nothing short of extraordinary
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-luxury-dark mb-2">{member.name}</h3>
                    <p className="text-luxury-gold font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-6">
                Awards & <span className="text-luxury-gold">Recognition</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our commitment to excellence has been recognized by industry leaders and guests worldwide
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-luxury-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-luxury-gold" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-luxury-dark">{achievement.title}</h3>
                          <span className="bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                            {achievement.year}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-luxury-dark text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold mb-6">
                Our <span className="text-luxury-gold">Impact</span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence and guest satisfaction
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '50,000+', label: 'Happy Guests', icon: UserGroupIcon },
                { number: '28+', label: 'Years of Service', icon: ClockIcon },
                { number: '150+', label: 'Team Members', icon: BuildingOfficeIcon },
                { number: '4.9/5', label: 'Guest Rating', icon: StarIcon }
              ].map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-luxury-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-luxury-gold" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-luxury-gold mb-2">{stat.number}</div>
                    <div className="text-gray-200">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-100">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-luxury-dark mb-6">
                Experience Our <span className="text-luxury-gold">Hospitality</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied guests who have made our hotel their home away from home. 
                Book your stay today and discover what makes us special.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-luxury-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-600 transition-colors duration-300"
                >
                  Book Your Stay
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-luxury-gold text-luxury-gold px-8 py-4 rounded-lg font-semibold hover:bg-luxury-gold hover:text-white transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage