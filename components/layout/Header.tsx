import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Bars3Icon, XMarkIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => router.pathname === path

  const handleHotelNameClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (clickTimer) {
      clearTimeout(clickTimer)
    }
    
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)
    
    if (newClickCount === 3) {
      // Triple click detected - redirect to admin
      router.push('/admin')
      setClickCount(0)
      setClickTimer(null)
    } else {
      // Set timer to reset click count after 4 seconds
      const timer = setTimeout(() => {
        setClickCount(0)
        setClickTimer(null)
      }, 4000)
      setClickTimer(timer)
      
      // If not triple click, navigate to home
      if (newClickCount === 1) {
        router.push('/')
      }
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-cyan-600 text-white py-2 hidden md:block">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-cyan-500" />
                <span>+92 325 0104555</span>
              </div>
              <div className="flex items-center space-x-2">
                <a href="https://wa.me/923250104555" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-cyan-500 transition-colors">
                  <svg className="h-4 w-4 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.127 17.114c-.301.42-.638.79-1.01 1.089-1.086.869-2.552 1.175-4.083.869-1.482-.297-2.973-.892-4.185-1.768-1.212-.876-2.097-2.05-2.647-3.376-.55-1.326-.772-2.865-.58-4.345.193-1.48.752-2.84 1.611-3.923.859-1.084 2.023-1.848 3.348-2.192 1.326-.344 2.792-.248 4.115.248.823.31 1.585.752 2.25 1.297.665.545 1.221 1.193 1.668 1.916.447.723.78 1.516.98 2.35.2.834.26 1.705.18 2.568-.08.863-.3 1.705-.65 2.484-.35.78-.82 1.473-1.397 2.057z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-cyan-500" />
                <span>1245 Street 3B, G-10/4, Islamabad, Pakistan</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow us:</span>
              <div className="flex space-x-2">
                <a href="https://www.facebook.com/mylumierehotel" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-cyan-500 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-cyan-500 hover:text-white transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cyan-50 shadow-lg' : 'bg-cyan-50/95 backdrop-blur-sm'
      } lg:block hidden`}>
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHotelNameClick}>
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <Image src="https://scontent.flyp9-1.fna.fbcdn.net/v/t39.30808-1/492591361_10171218307120634_3862115223766010856_n.jpg?stp=cp0_dst-jpg_s60x60_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeGDKn09pkgJSgrFA9iVCZc3ShYYmdxWFyVKFhiZ3FYXJYoKiTJY2IFl853kx8aCqiPA_jR0-EkP4QAI1bcD0fvx&_nc_ohc=Wlrk6IPp9y8Q7kNvwH6ar57&_nc_oc=AdkZtz5sjtdNJTKUE7QzGPMEOcRFTogp3UpVOL2Flxf2a1FdgAgF1HuFXa4dDwyUEWE&_nc_zt=24&_nc_ht=scontent.flyp9-1.fna&_nc_gid=Kcg1uYz0MkF1GRwhRvXvdQ&oh=00_AfUF_k3Fvp-qKFBMhZCFAOsdY5T2LiKlJy-ofZCX5hc_0g&oe=6896734C" alt="Lumière Hotel Logo" width={40} height={40} className="w-full h-full rounded-full" unoptimized={true} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-luxury-dark">Lumière Hotel</h1>
                <p className="text-xs text-gray-600 -mt-1">Experience Beyond Imagination</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-cyan-500 border-b-2 border-cyan-500'
                      : 'text-gray-700 hover:text-cyan-500'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Book Now Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href={`/checkout?roomId=1&checkIn=${new Date().toISOString().split('T')[0]}&checkOut=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}&guests=2`} className="btn-primary bg-cyan-500 hover:bg-cyan-600">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Header - Always visible at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-cyan-50 shadow-lg lg:hidden">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHotelNameClick}>
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <Image src="https://scontent.flyp9-1.fna.fbcdn.net/v/t39.30808-1/492591361_10171218307120634_3862115223766010856_n.jpg?stp=cp0_dst-jpg_s60x60_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeGDKn09pkgJSgrFA9iVCZc3ShYYmdxWFyVKFhiZ3FYXJYoKiTJY2IFl853kx8aCqiPA_jR0-EkP4QAI1bcD0fvx&_nc_ohc=Wlrk6IPp9y8Q7kNvwH6ar57&_nc_oc=AdkZtz5sjtdNJTKUE7QzGPMEOcRFTogp3UpVOL2Flxf2a1FdgAgF1HuFXa4dDwyUEWE&_nc_zt=24&_nc_ht=scontent.flyp9-1.fna&_nc_gid=Kcg1uYz0MkF1GRwhRvXvdQ&oh=00_AfUF_k3Fvp-qKFBMhZCFAOsdY5T2LiKlJy-ofZCX5hc_0g&oe=6896734C" alt="Lumière Hotel Logo" width={32} height={32} className="w-full h-full rounded-full" unoptimized={true} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-luxury-dark">Lumière Hotel</h1>
                <p className="text-xs text-gray-600 -mt-1">Experience Beyond Imagination</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-cyan-500 border-b-2 border-cyan-500'
                      : 'text-gray-700 hover:text-cyan-500'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Book Now Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href={`/checkout?roomId=1&checkIn=${new Date().toISOString().split('T')[0]}&checkOut=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}&guests=2`} className="btn-primary bg-cyan-500 hover:bg-cyan-600">
                Book Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-black" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-cyan-600 border-t">
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-bold transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-white'
                        : 'text-cyan-100 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <Link
                  href={`/checkout?roomId=1&checkIn=${new Date().toISOString().split('T')[0]}&checkOut=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}&guests=2`}
                  className="bg-white text-cyan-600 font-bold py-2 px-4 rounded inline-block text-center hover:bg-cyan-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
              </nav>
            </div>
          </div>
        )}
        
        {/* Fixed Bottom Mobile Navigation - Always at bottom regardless of scroll position */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-cyan-600 shadow-lg z-50 border-t border-cyan-700">
          <div className="grid grid-cols-5 py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center px-2 py-1 ${isActive(item.href) ? 'text-white' : 'text-cyan-100'}`}
              >
                <span className="text-xs font-bold">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Book Now Button - Right side, always visible */}
        <div className="lg:hidden fixed bottom-16 right-4 z-50">
          <Link
            href={`/checkout?roomId=1&checkIn=${new Date().toISOString().split('T')[0]}&checkOut=${new Date(Date.now() + 86400000).toISOString().split('T')[0]}&guests=2`}
            className="bg-cyan-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          >
            <span className="text-sm font-bold">Book Now</span>
          </Link>
        </div>
      </div>


    </>
  )
}

export default Header