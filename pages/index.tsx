import React from 'react'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import HeroSection from '../components/sections/HeroSection'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import FeaturedRooms from '../components/sections/FeaturedRooms'
import Gallery from '../components/sections/Gallery'
import ServicesHighlight from '../components/sections/ServicesHighlight'
import Testimonials from '../components/sections/Testimonials'
import NearbyAttractions from '../components/sections/NearbyAttractions'
import LocationMap from '../components/sections/LocationMap'
import NewsletterSignup from '../components/sections/NewsletterSignup'

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Lumiere Hotel Islamabad | Luxury Hotel Near G-10</title>
        <meta name="description" content="Book your stay at Lumiere Hotel, Islamabad – a luxurious boutique hotel in G-10/4 offering Deluxe Green & Blue Rooms, Family Suites, breakfast, and easy access to top tourist spots in Islamabad." />
        <meta name="keywords" content="Lumiere Hotel Islamabad, hotels in Islamabad, book hotel in Islamabad, G10 hotels, luxury rooms Islamabad, family suite hotel, Islamabad stay, guest house in G-10, best hotels Islamabad, Pakistan tourism hotels" />
        <meta name="author" content="Lumiere Hotel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.mylumierehotel.com/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Lumiere Hotel Islamabad | Affordable Luxury Stay in G-10" />
        <meta property="og:description" content="Experience comfort and elegance at Lumiere Hotel Islamabad – spacious Deluxe rooms, free breakfast, top service, and great location near Faisal Mosque and Centaurus." />
        <meta property="og:image" content="https://cf.bstatic.com/xdata/images/hotel/square600/674164543.jpg?k=293259b10e954ad0ee56429432b84589f617ba754c43f4771c1b710ab1f1cb57&o=" />
        <meta property="og:url" content="https://www.mylumierehotel.com/" />
        <meta property="og:type" content="website" />
        
        {/* Schema Markup for Hotels */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "Lumiere Hotel Islamabad",
              "image": "https://cf.bstatic.com/xdata/images/hotel/square600/674164543.jpg?k=293259b10e954ad0ee56429432b84589f617ba754c43f4771c1b710ab1f1cb57&o=",
              "description": "Book your stay at Lumiere Hotel, a boutique hotel in G-10/4 Islamabad, featuring Deluxe Green & Blue Rooms, Family Suites, and breakfast service.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1245 Street 3B, G-10/4",
                "addressLocality": "Islamabad",
                "addressRegion": "Islamabad Capital Territory",
                "postalCode": "44000",
                "addressCountry": "PK"
              },
              "telephone": "+923250104555",
              "email": "mylumierehotel@gmail.com",
              "url": "https://mylumierehotel.com",
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free Breakfast",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Wi-Fi",
                  "value": true
                }
              ],
              "sameAs": [
                "https://wa.me/923250104555"
              ]
            })
          }}
        />
      </Head>
      <HeroSection />
      <div className="bg-cyan-50 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-500 font-semibold rounded-full text-sm mb-4">
              ✨ Premium Hospitality Since 1995
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to Our
              <span className="block text-cyan-500">Lumiere Hotel Islamabad</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Discover unparalleled luxury and comfort in the heart of Islamabad, Pakistan's beautiful capital. Our hotel offers world-class amenities, 
              exceptional service, and unforgettable experiences for both business and leisure travelers visiting Pakistan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/30 transition-colors">
              <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Luxury Amenities</h3>
              <p className="text-gray-600">World-class facilities and premium services</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/30 transition-colors">
              <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Prime Location</h3>
              <p className="text-gray-600">Located in G-10/4 Islamabad, near major attractions</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/30 transition-colors">
              <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Exceptional Service</h3>
              <p className="text-gray-600">24/7 personalized guest experience</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <WhyChooseUs />
      </div>
      <div className="bg-cyan-50">
        <FeaturedRooms />
      </div>
      <div className="bg-white">
        <Gallery />
      </div>
      <div className="bg-cyan-50">
        <ServicesHighlight />
      </div>
      <div className="bg-white">
        <Testimonials />
      </div>
      <div className="bg-cyan-50">
        <NearbyAttractions />
      </div>
      <div className="bg-white">
        <LocationMap />
      </div>
      <div className="bg-cyan-50">
        <NewsletterSignup />
      </div>
    </Layout>
  )
}

export default HomePage