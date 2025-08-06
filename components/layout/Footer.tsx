import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-dark text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hotel Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
                  <Image src="https://scontent.flyp9-1.fna.fbcdn.net/v/t39.30808-1/492591361_10171218307120634_3862115223766010856_n.jpg?stp=cp0_dst-jpg_s60x60_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeGDKn09pkgJSgrFA9iVCZc3ShYYmdxWFyVKFhiZ3FYXJYoKiTJY2IFl853kx8aCqiPA_jR0-EkP4QAI1bcD0fvx&_nc_ohc=Wlrk6IPp9y8Q7kNvwH6ar57&_nc_oc=AdkZtz5sjtdNJTKUE7QzGPMEOcRFTogp3UpVOL2Flxf2a1FdgAgF1HuFXa4dDwyUEWE&_nc_zt=24&_nc_ht=scontent.flyp9-1.fna&_nc_gid=Kcg1uYz0MkF1GRwhRvXvdQ&oh=00_AfUF_k3Fvp-qKFBMhZCFAOsdY5T2LiKlJy-ofZCX5hc_0g&oe=6896734C" alt="Lumière Hotel Logo" width={48} height={48} className="w-full h-full object-cover" unoptimized={true} />
                </div>
                <h3 className="text-xl font-serif font-bold">Lumière Hotel</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Experience luxury beyond imagination at our premium hotel. We offer world-class amenities, 
                exceptional service, and unforgettable memories.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/mylumierehotel" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-cyan-500 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-cyan-500 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-cyan-500 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.007 0C5.373 0 0 5.373 0 12.007s5.373 12.007 12.007 12.007 12.007-5.373 12.007-12.007S18.641.001 12.007.001zM8.442 18.654H5.595V8.868h2.847v9.786zM7.018 7.526c-.914 0-1.654-.74-1.654-1.654s.74-1.654 1.654-1.654 1.654.74 1.654 1.654-.74 1.654-1.654 1.654zm11.636 11.128h-2.847v-4.764c0-1.063-.019-2.433-1.482-2.433-1.482 0-1.71 1.158-1.71 2.355v4.842H9.768V8.868h2.734v1.338h.039c.381-.722 1.312-1.482 2.7-1.482 2.886 0 3.419 1.9 3.419 4.369v5.561z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-500">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-cyan-500 transition-colors">Home</Link></li>
                <li><Link href="/rooms" className="text-gray-300 hover:text-cyan-500 transition-colors">Rooms & Suites</Link></li>
                <li><Link href="/services" className="text-gray-300 hover:text-cyan-500 transition-colors">Services</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-cyan-500 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-cyan-500 transition-colors">Contact</Link></li>
                <li><Link href="/checkout" className="text-gray-300 hover:text-cyan-500 transition-colors">Book Now</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-500">Our Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">24/7 Room Service</li>
                <li className="text-gray-300">Concierge Service</li>
                <li className="text-gray-300">Spa & Wellness</li>
                <li className="text-gray-300">Business Center</li>
                <li className="text-gray-300">Airport Transfer</li>
                <li className="text-gray-300">Laundry Service</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-500">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 text-cyan-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">Lumière Hotel</p>
                    <p className="text-gray-300">1245 Street 3B, G-10/4, Islamabad, Pakistan</p>
                    <p className="text-gray-300">Google Plus Code: M2H9+2F Islamabad, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <p className="text-gray-300">+92 325 0104555</p>
                </div>
                <div className="flex items-center space-x-3">
                  <a href="https://wa.me/923250104555" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-500 transition-colors">
                    <svg className="h-5 w-5 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.127 17.114c-.301.42-.638.79-1.01 1.089-1.086.869-2.552 1.175-4.083.869-1.482-.297-2.973-.892-4.185-1.768-1.212-.876-2.097-2.05-2.647-3.376-.55-1.326-.772-2.865-.58-4.345.193-1.48.752-2.84 1.611-3.923.859-1.084 2.023-1.848 3.348-2.192 1.326-.344 2.792-.248 4.115.248.823.31 1.585.752 2.25 1.297.665.545 1.221 1.193 1.668 1.916.447.723.78 1.516.98 2.35.2.834.26 1.705.18 2.568-.08.863-.3 1.705-.65 2.484-.35.78-.82 1.473-1.397 2.057z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                  <p className="text-gray-300">mylumierehotel@gmail.com</p>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-cyan-500 mb-2">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-cyan-500"
                  />
                  <button className="px-4 py-2 bg-cyan-500 text-white rounded-r-lg hover:bg-cyan-600 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-2">
              <div className="text-gray-400 text-sm">
                © 2024 Lumiere Hotel. All rights reserved.
              </div>
              <div className="text-gray-500 text-xs">
                WEBSITE DEVELOPED BY{' '}
                <a 
                  href="https://wa.me/923290091255" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-500 hover:text-cyan-400 transition-colors font-medium"
                >
                  DALIWEB
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-cyan-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-cyan-500 text-sm transition-colors">
                Terms of Service
              </Link>
              {/* Admin Access - Less prominent */}
              <Link 
                href="/admin" 
                className="text-gray-700 hover:text-gray-500 text-xs transition-colors opacity-50"
                title="Admin Panel"
              >
                •
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer