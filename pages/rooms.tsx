import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import {
  UserGroupIcon,
  StarIcon,
  WifiIcon,
  TvIcon,
  HomeIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Head from 'next/head';
import { rooms, Room, ExtendedRoom, RoomPricing } from '../data/rooms';

// Room data is now imported from ../data/rooms

const RoomsPage: React.FC = () => {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const displayRooms = rooms.slice(0, 6);

  const pageTitle = 'Our Rooms - Lumière Hotel';
  const pageDescription = 'Explore our luxurious and comfortable rooms. We offer Deluxe Green and Deluxe Blue rooms to cater to all your needs. Book your stay at Lumière Hotel today!';
  const pageKeywords = 'Lumière Hotel, hotel rooms, deluxe rooms, hotel booking, luxury accommodation';

  const openModal = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/room-green.jpg" />
        <meta property="og:url" content="https://www.lumierehotel.com/rooms" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.lumierehotel.com/rooms" />
      </Head>
      
      <div className="bg-cyan-50"> 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight sm:text-5xl">Explore Our Rooms</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">Find the perfect space for your stay, from cozy rooms to spacious suites.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div>
            <p className="text-gray-600 mb-4">{displayRooms.length} room(s) available.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => openModal(room)}
                >
                  <div className="relative">
                    <Image 
                      src={room.images[0]} 
                      alt={room.name} 
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={true}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/room-green.jpg'; }}
                    />
                    <div className="absolute top-0 right-0 bg-cyan-500 text-white px-2 py-1 rounded-bl-lg font-bold text-sm">
                      From {room.pricing?.single?.toLocaleString() || room.price.toLocaleString()} PKR
                    </div>
                    {room.isPopular && <div className="absolute top-0 left-0 bg-rose-500 text-white px-3 py-1 rounded-br-lg font-bold text-sm">Popular</div>}
                    {room.discount && <div className="absolute bottom-0 left-0 bg-amber-500 text-white px-3 py-1 font-bold">{room.discount}% OFF</div>}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{room.name}</h3>
                    <div className="mb-3">
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Single: <span className="font-semibold text-cyan-600">{room.pricing?.single?.toLocaleString() || room.price.toLocaleString()} PKR</span></div>
                        <div>Double: <span className="font-semibold text-cyan-600">{room.pricing?.double?.toLocaleString() || (room.price * 1.2).toLocaleString()} PKR</span></div>
                        <div>Triple: <span className="font-semibold text-cyan-600">{room.pricing?.triple?.toLocaleString() || (room.price * 1.5).toLocaleString()} PKR</span></div>
                        {room.pricing?.family && <div>Family: <span className="font-semibold text-cyan-600">{room.pricing?.family?.toLocaleString()} PKR</span></div>}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 h-16 overflow-hidden text-sm">{room.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 mr-2 text-cyan-500" />
                        <span>Up to {room.maxOccupancy} guests</span>
                      </div>
                      <div className="flex items-center">
                        <HomeIcon className="h-5 w-5 mr-2 text-cyan-500" />
                        <span>{room.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid key={i} className={`h-5 w-5 ${i < (room.rating || 0) ? 'text-amber-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-gray-600">{room.rating} ({room.reviewCount} reviews)</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <motion.div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative" 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10">
              <XMarkIcon className="h-8 w-8" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative md:h-full">
                <Image src={selectedRoom.images[0]} alt={selectedRoom.name} width={600} height={400} className="w-full h-64 md:h-full object-cover rounded-l-lg" unoptimized={true} />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                  <h2 className="text-3xl font-bold text-white">{selectedRoom.name}</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing per night (+tax):</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Single Occupancy:</span>
                      <span className="font-bold text-cyan-600">{selectedRoom.pricing?.single?.toLocaleString() || selectedRoom.price.toLocaleString()} PKR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Double Occupancy:</span>
                      <span className="font-bold text-cyan-600">{selectedRoom.pricing?.double?.toLocaleString() || (selectedRoom.price * 1.2).toLocaleString()} PKR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Triple Occupancy:</span>
                      <span className="font-bold text-cyan-600">{selectedRoom.pricing?.triple?.toLocaleString() || (selectedRoom.price * 1.5).toLocaleString()} PKR</span>
                    </div>
                    {selectedRoom.pricing?.family && (
                      <div className="flex justify-between">
                        <span>Family Suite:</span>
                        <span className="font-bold text-cyan-600">{selectedRoom.pricing?.family?.toLocaleString()} PKR</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mb-6">{selectedRoom.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
                  <div className="flex items-center"><UserGroupIcon className="h-5 w-5 mr-2 text-cyan-500" /> Max {selectedRoom.maxOccupancy} guests</div>
                  <div className="flex items-center"><HomeIcon className="h-5 w-5 mr-2 text-cyan-500" /> {selectedRoom.size}</div>
                  <div className="flex items-center"><WifiIcon className="h-5 w-5 mr-2 text-cyan-500" /> Free high-speed WiFi</div>
                  <div className="flex items-center"><TvIcon className="h-5 w-5 mr-2 text-cyan-500" /> Flat-screen TV</div>
                </div>

                <h4 className="font-bold text-lg text-gray-800 mb-3">Amenities</h4>
                <ul className="grid grid-cols-2 gap-2 text-gray-700 mb-6">
                  {selectedRoom.amenities.map(amenity => (
                    <li key={amenity} className="flex items-center">
                      <SparklesIcon className="h-4 w-4 mr-2 text-cyan-500 flex-shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid key={i} className={`h-6 w-6 ${i < (selectedRoom.rating || 0) ? 'text-amber-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="ml-3 text-gray-700">{selectedRoom.rating} stars ({selectedRoom.reviewCount} reviews)</span>
                </div>

                <Link href={`/checkout?roomId=${selectedRoom.id}`} legacyBehavior>
                  <a className="w-full bg-cyan-600 text-white text-center font-bold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors duration-300 block">Book Now</a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default RoomsPage;