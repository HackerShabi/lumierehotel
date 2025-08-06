import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('why-choose-us')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Hotel Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-2"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full mb-6">
            <span className="text-luxury-gold text-sm font-semibold">★★★★★</span>
            <span className="ml-2 text-sm text-black">5-Star Luxury Hotel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight bg-white/70 p-4 rounded-lg text-black">
            Experience Luxury
            <span className="block gradient-text bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent">Beyond Imagination</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-black bg-white/70 p-4 rounded-lg leading-relaxed"
        >
          Indulge in unparalleled comfort and sophistication at our premium hotel.
          <br className="hidden md:block" />
          Where every moment becomes an extraordinary memory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={`/checkout?roomId=1&checkIn=${new Date().toISOString().split('T')[0]}&checkOut=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}&guests=2`}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Book Now
          </Link>
          <Link
            href="/about"
            className="border-2 border-white text-black bg-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-transparent hover:text-white transition-all duration-300 min-w-[200px]"
          >
            Discover More
          </Link>
        </motion.div>


      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-black bg-white/70 px-4 py-2 rounded-full hover:text-luxury-gold transition-colors duration-300"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDownIcon className="h-6 w-6 animate-bounce" />
        </div>
      </motion.button>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 border border-white/30 rounded-full hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-16 h-16 border border-luxury-gold/50 rounded-full hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-luxury-gold rounded-full hidden lg:block" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white/50 rounded-full hidden lg:block" />
    </section>
  )
}

export default HeroSection