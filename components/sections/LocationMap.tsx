import React from 'react'
import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const LocationMap: React.FC = () => {
  const handleGetDirections = () => {
    const address = encodeURIComponent('1245 Street 3B, G-10/4, Islamabad, Pakistan')
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank')
  }

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
            Find Us & Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Located in the heart of Islamabad, our hotel offers easy access to all major attractions including Faisal Mosque, Pakistan Monument, and Margalla Hills. 
            Contact us for reservations or any inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-96 relative">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.8!2d73.0479!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b4!2sG-10%2F4%20G%2010%2F4%20G-10%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1635959542132!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lumière Hotel Location - Islamabad"
                  className="rounded-t-2xl"
                />
                
                {/* Custom Hotel Marker Overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="bg-cyan-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-luxury-dark mb-2">
                      Lumière Hotel Islamabad
                    </h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      1245 Street 3B, G-10/4, Islamabad
                    </p>
                  </div>
                  <button
                    onClick={handleGetDirections}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors duration-300 font-semibold"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-luxury-dark mb-8">
                Contact Information
              </h3>
              
              {/* Address */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-dark mb-2">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      1245 Street 3B, G-10/4<br />
                      Islamabad, Pakistan<br />
                      Google Plus Code: M2H9+2F Islamabad, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-dark mb-2">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+923250104555" className="hover:text-cyan-500 transition-colors duration-300">
                        +92 325 0104555
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:+923250104555" className="hover:text-cyan-500 transition-colors duration-300">
                        +92 325 0104555 (Emergency Contact)
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-dark mb-2">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:mylumierehotel@gmail.com" className="hover:text-cyan-500 transition-colors duration-300">
                        mylumierehotel@gmail.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="mailto:info@mylumiere.com" className="hover:text-cyan-500 transition-colors duration-300">
                        info@mylumiere.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-dark mb-2">Reception Hours</h4>
                    <p className="text-gray-600">
                      24/7 Front Desk Service<br />
                      Check-in: 3:00 PM<br />
                      Check-out: 11:00 AM
                    </p>
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <GlobeAltIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-luxury-dark mb-2">Website</h4>
                    <p className="text-gray-600">
                      <a href="https://www.mylumierehotel.com" className="hover:text-cyan-500 transition-colors duration-300">
                        www.mylumierehotel.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Emergency Contact
            </h3>
            <p className="text-red-600">
              For urgent matters outside business hours, please call: 
              <a href="tel:+923250104555" className="font-semibold hover:underline ml-1">
                +92 325 0104555
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LocationMap