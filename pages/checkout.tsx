import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import { Calendar, Users, CreditCard, MapPin, Phone, Mail, User, Edit3, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { getRooms, addBooking, Room as FirebaseRoom } from '../lib/firebaseServices';

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  specialRequests: string;
}

interface PaymentInfo {
  method: 'credit_card' | 'paypal' | 'bank_transfer' | 'digital_wallet' | 'pay_on_arrival' | 'apple_pay' | 'google_pay' | 'crypto';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  maxOccupancy: number;
  size: number | string;
  formattedSize?: string; // Optional formatted size for display
  description: string;
  amenities: string[];
  images: string[];
  available: boolean;
  rating?: number;
  reviewCount?: number;
  isPopular?: boolean;
}

// Room pricing interface
interface RoomPricing {
  single: number;
  double: number;
  triple: number;
  family?: number;
}

// Extended room interface with pricing
interface ExtendedRoom extends Room {
  pricing: RoomPricing;
  baseType: string;
}

// Static room data for fallback
const staticRooms: ExtendedRoom[] = [
  {
    id: '1',
    name: 'Deluxe Room',
    type: 'Deluxe',
    baseType: 'deluxe',
    price: 8999,
    pricing: {
      single: 8999,
      double: 10999,
      triple: 12999
    },
    maxOccupancy: 3,
    size: 35,
    description: 'Spacious deluxe room with modern amenities, attached bathroom, and complimentary breakfast.',
    images: ['/room1.png'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Breakfast Included', 'Private Bathroom', 'Mini Bar'],
    rating: 4.8,
    reviewCount: 124,
    available: true,
    isPopular: true
  },
  {
    id: '2',
    name: 'Executive Suite',
    type: 'Executive',
    baseType: 'executive',
    price: 12999,
    pricing: {
      single: 12999,
      double: 14999,
      triple: 16999
    },
    maxOccupancy: 4,
    size: 45,
    description: 'Luxurious executive suite with separate living area, premium amenities, and city views.',
    images: ['/room-blue.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Breakfast Included', 'Living Area', 'City View', 'Premium Toiletries'],
    rating: 4.9,
    reviewCount: 89,
    available: true,
    isPopular: true
  },
  {
    id: '3',
    name: 'Standard Room',
    type: 'Standard',
    baseType: 'standard',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 9999
    },
    maxOccupancy: 3,
    size: 25,
    description: 'Comfortable standard room with essential amenities and modern furnishings.',
    images: ['/room-green.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Private Bathroom', 'Daily Housekeeping'],
    rating: 4.5,
    reviewCount: 156,
    available: true
  },
  {
    id: '4',
    name: 'Premium Room',
    type: 'Premium',
    baseType: 'premium',
    price: 10999,
    pricing: {
      single: 10999,
      double: 12999,
      triple: 14999
    },
    maxOccupancy: 3,
    size: 40,
    description: 'Premium room with enhanced comfort, modern decor, and additional amenities.',
    images: ['/room-blue-2.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Breakfast Included', 'Balcony', 'Premium Bedding'],
    rating: 4.7,
    reviewCount: 98,
    available: true
  },
  {
    id: '5',
    name: 'Business Room',
    type: 'Business',
    baseType: 'business',
    price: 9999,
    pricing: {
      single: 9999,
      double: 11999,
      triple: 13999
    },
    maxOccupancy: 2,
    size: 30,
    description: 'Business-oriented room with work desk, high-speed internet, and business center access.',
    images: ['/room-green-2.jpg'],
    amenities: ['Free WiFi', 'Work Desk', 'Business Center Access', 'Air Conditioning', 'Coffee Maker'],
    rating: 4.6,
    reviewCount: 73,
    available: true
  },
  {
    id: '6',
    name: 'Luxury Suite',
    type: 'Luxury',
    baseType: 'luxury',
    price: 15999,
    pricing: {
      single: 15999,
      double: 17999,
      triple: 19999
    },
    maxOccupancy: 4,
    size: 60,
    description: 'Opulent luxury suite with premium furnishings, spacious layout, and exclusive amenities.',
    images: ['/room-blue-3.jpg'],
    amenities: ['Free WiFi', 'Air Conditioning', '24/7 Room Service', 'Breakfast Included', 'Jacuzzi', 'Premium View', 'Butler Service'],
    rating: 4.9,
    reviewCount: 45,
    available: true,
    isPopular: true
  },
  {
    id: '7',
    name: 'Family Suite Lower Ground',
    type: 'Family Suite Lower',
    baseType: 'family-suite-lower',
    price: 15999,
    pricing: {
      single: 15999,
      double: 15999,
      triple: 15999,
      family: 15999
    },
    maxOccupancy: 6,
    size: 60,
    description: 'Spacious family suite on the lower ground floor with premium amenities, separate living area, and accommodation for up to 6 guests.',
    images: ['/room1.png', '/room-blue.jpg'],
    amenities: ['Separate Living Area', 'Kitchenette', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom', 'Family Friendly'],
    rating: 4.9,
    reviewCount: 45,
    available: true,
    isPopular: true
  },
  {
    id: '8',
    name: 'Family Suite Upper Ground',
    type: 'Family Suite Upper',
    baseType: 'family-suite-upper',
    price: 16999,
    pricing: {
      single: 16999,
      double: 16999,
      triple: 16999,
      family: 16999
    },
    maxOccupancy: 6,
    size: 60,
    description: 'Spacious family suite on the upper ground floor with premium amenities, separate living area, and accommodation for up to 6 guests.',
    images: ['/room1.png', '/room-green.jpg'],
    amenities: ['Separate Living Area', 'Kitchenette', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom', 'Family Friendly'],
    rating: 4.8,
    reviewCount: 38,
    available: true,
    isPopular: true
  }
];

// Get pricing for a room based on occupancy
const getRoomPrice = (room: ExtendedRoom | Room, occupancy: 'single' | 'double' | 'triple' | 'family'): number => {
  if ('pricing' in room && room.pricing) {
    return room.pricing[occupancy] || room.price;
  }
  return room.price;
};

const CheckoutPage = () => {
  const router = useRouter();
  const { roomId, roomName, checkIn, checkOut, guests } = router.query;
  
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    specialRequests: ''
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditingDates, setIsEditingDates] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [isRoomSelectionOpen, setIsRoomSelectionOpen] = useState(false);
  const [tempCheckIn, setTempCheckIn] = useState('');
  const [tempCheckOut, setTempCheckOut] = useState('');
  const [tempGuests, setTempGuests] = useState(2);
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedOccupancy, setSelectedOccupancy] = useState<'single' | 'double' | 'triple' | 'family'>('single');
  const [dynamicPrice, setDynamicPrice] = useState<number>(6999);
  const [selectedRoom, setSelectedRoom] = useState<ExtendedRoom | null>(null);
  // Handle room selection
  const handleRoomSelection = (roomId: string) => {
    setSelectedRoomId(roomId);
    const selectedRoom = allRooms.find(r => r.id === roomId);
    if (selectedRoom) {
      setRoom(selectedRoom);
      // Update URL with new room ID
      router.replace({
        pathname: '/checkout',
        query: {
          ...router.query,
          roomId: roomId
        }
      }, undefined, { shallow: true });
    }
    setIsRoomSelectionOpen(false);
  };

  // Fetch all rooms for room selection modal
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
                let rooms = await getRooms();
        if (!rooms || rooms.length === 0) {
          console.log('Firebase returned empty rooms, using static fallback');
          rooms = staticRooms;
        }
        setAllRooms(rooms as Room[]);
      } catch (error) {
        console.error('Error fetching all rooms:', error);
        // Use the updated static room data
        setAllRooms(staticRooms as Room[]);
      }
    };
    fetchAllRooms();
  }, []);

  // Fetch room details
  useEffect(() => {
    if (router.isReady) {
      let currentRoomId = router.query.roomId as string;
      let currentCheckIn = router.query.checkIn as string;
      let currentCheckOut = router.query.checkOut as string;
      let currentGuests = router.query.guests as string;
      
      // If no URL params, try to get from localStorage (for rooms page booking)
      if (!currentRoomId) {
        const bookingDetails = localStorage.getItem('bookingDetails');
        if (bookingDetails) {
          try {
            const details = JSON.parse(bookingDetails);
            currentRoomId = details.roomId?.toString();
            currentCheckIn = details.checkInDate;
            currentCheckOut = details.checkOutDate;
            currentGuests = details.guests?.toString();
            console.log('Got room ID from localStorage:', currentRoomId);
          } catch (e) {
            console.error('Error parsing booking details from localStorage:', e);
          }
        }
      }
      
      // If only roomId is provided but no booking dates, use defaults
      if (currentRoomId && (!currentCheckIn || !currentCheckOut)) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        currentCheckIn = today.toISOString().split('T')[0];
        currentCheckOut = tomorrow.toISOString().split('T')[0];
        currentGuests = currentGuests || '2';
        
        // Update router query to include default dates
        router.replace({
          pathname: '/checkout',
          query: {
            roomId: currentRoomId,
            checkIn: currentCheckIn,
            checkOut: currentCheckOut,
            guests: currentGuests
          }
        }, undefined, { shallow: true });
      }
      
      if (currentRoomId) {
        const fetchRoomDetails = async () => {
          try {
            // First check if we have the room in static data
            const staticRoom = staticRooms.find(r => r.id.toString() === currentRoomId.toString());
            
            if (staticRoom) {
              console.log('Using static room data for ID:', currentRoomId);
              // Create a formatted size string for display
              const formattedSize = typeof staticRoom.size === 'number' ? 
                `${staticRoom.size} sqm` : (staticRoom.size ? String(staticRoom.size) : 'N/A');
              
              // Create a new room object with the formatted size for display
              const roomWithFormattedSize = {
                ...staticRoom,
                formattedSize: formattedSize
              };
              setRoom(roomWithFormattedSize as Room);
              setSelectedRoom(staticRoom);
              // Set initial price based on single occupancy
              setDynamicPrice(getRoomPrice(staticRoom, 'single'));
              setLoading(false);
              return;
            }
            
            // If not found in static data, try Firebase
            console.log('Trying to fetch room from Firebase with ID:', currentRoomId);
            const { getRoom } = await import('../lib/firebaseServices');
            const selectedRoom = await getRoom(currentRoomId);
            
            if (selectedRoom) {
              console.log('Room found in Firebase:', selectedRoom);
              // Create a formatted size string for display
              const formattedSize = typeof selectedRoom.size === 'number' ? 
                `${selectedRoom.size} sqm` : (selectedRoom.size ? String(selectedRoom.size) : 'N/A');
              
              // Create a new room object with the formatted size for display
              const roomWithFormattedSize = {
                ...selectedRoom,
                formattedSize: formattedSize
              };
              setRoom(roomWithFormattedSize as Room);
              setLoading(false);
            } else {
              console.error('Room not found with ID:', currentRoomId);
              toast.error('Room not found');
              // Don't redirect immediately to allow user to see the error
              setRoom(null);
              setLoading(false);
              
              // After a short delay, redirect to rooms page
              setTimeout(() => {
                router.push('/rooms');
              }, 2000);
            }
          } catch (error) {
            console.error('Error fetching room:', error);
            toast.error('Failed to load room details');
            setLoading(false);
          }
        };

        fetchRoomDetails();
      } else {
        // If no roomId, redirect to rooms page
        toast.error('Please select a room first');
        router.push('/rooms');
        setLoading(false);
      }
    }
  }, [router.isReady, router]);

  const paymentMethodLabels = {
    credit_card: 'Credit/Debit Card (Visa, MasterCard, American Express)',
    paypal: 'PayPal',
    bank_transfer: 'Bank Transfer (Chase, Bank of America, Wells Fargo)',
    digital_wallet: 'Digital Wallet (Apple Pay, Google Pay)',
    pay_on_arrival: 'Pay at Hotel (Cash, Card, or Bank Transfer at Front Desk)'
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn as string);
    const end = new Date(checkOut as string);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Handle occupancy selection
  const handleOccupancyChange = (occupancy: 'single' | 'double' | 'triple' | 'family') => {
    setSelectedOccupancy(occupancy);
    if (selectedRoom) {
      setDynamicPrice(getRoomPrice(selectedRoom, occupancy));
    } else if (room) {
      setDynamicPrice(getRoomPrice(room as ExtendedRoom, occupancy));
    }
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const basePrice = dynamicPrice; // Use dynamic price based on occupancy
    const subtotal = basePrice * nights;
    const tax = subtotal * 0.1; // 10% tax
    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const handleGuestInfoChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentInfoChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  // Room selection functionality removed as per requirements

  const handleEditDates = () => {
    setTempCheckIn(checkIn as string || '');
    setTempCheckOut(checkOut as string || '');
    setIsEditingDates(true);
  };

  const handleSaveDates = () => {
    if (tempCheckIn && tempCheckOut) {
      router.replace({
        pathname: '/checkout',
        query: {
          ...router.query,
          checkIn: tempCheckIn,
          checkOut: tempCheckOut
        }
      });
      setIsEditingDates(false);
    }
  };

  const handleEditGuests = () => {
    setTempGuests(parseInt(guests as string) || 2);
    setIsEditingGuests(true);
  };

  const handleSaveGuests = () => {
    router.replace({
      pathname: '/checkout',
      query: {
        ...router.query,
        guests: tempGuests.toString()
      }
    });
    setIsEditingGuests(false);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!guestInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!guestInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!guestInfo.email.trim()) newErrors.email = 'Email is required';
    if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (paymentInfo.method === 'credit_card') {
      if (!paymentInfo.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
      if (!paymentInfo.expiryDate?.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!paymentInfo.cvv?.trim()) newErrors.cvv = 'CVV is required';
      if (!paymentInfo.cardholderName?.trim()) newErrors.cardholderName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const bookingId = await addBooking({
        roomId: roomId as string,
        roomName: room?.name || '',
        roomType: room?.type || '',
        roomPrice: room?.price || 0,
        guestInfo: {
          firstName: guestInfo.firstName,
          lastName: guestInfo.lastName,
          email: guestInfo.email,
          phone: guestInfo.phone
        },
        checkIn: checkIn as string,
        checkOut: checkOut as string,
        guests: parseInt(guests as string),
        adults: parseInt(guests as string),
        children: 0,
        totalAmount: total,
        status: 'confirmed' as const,
        paymentStatus: 'paid' as const,
        specialRequests: guestInfo.specialRequests || ''
      });
      
      toast.success('Booking confirmed successfully!');
      router.push(`/booking-confirmation?bookingId=${bookingId}`);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { subtotal, tax, total } = calculateTotal();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!room) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Room not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600 mt-2">Just a few more details to confirm your reservation</p>
          </div>

          {/* Booking Details Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Room Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Selected Room</h3>
                  <button
                    onClick={() => setIsRoomSelectionOpen(true)}
                    className="flex items-center text-sm text-cyan-600 hover:text-cyan-800"
                  >
                    <Edit3 size={14} className="mr-1" />
                    Edit Room
                  </button>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{room?.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{room?.type} • {room?.formattedSize || `${room?.size} sqm`}</p>
                  <p className="text-sm text-gray-600">₹{dynamicPrice}/night</p>
                </div>
                
                {/* Occupancy Selection */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Select Occupancy</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOccupancyChange('single')}
                      className={`p-2 text-xs rounded border ${
                        selectedOccupancy === 'single'
                          ? 'bg-cyan-500 text-white border-cyan-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-300'
                      }`}
                    >
                      Single<br/>₹6,999 + tax
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOccupancyChange('double')}
                      className={`p-2 text-xs rounded border ${
                        selectedOccupancy === 'double'
                          ? 'bg-cyan-500 text-white border-cyan-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-300'
                      }`}
                    >
                      Double<br/>₹8,499 + tax
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOccupancyChange('triple')}
                      className={`p-2 text-xs rounded border ${
                        selectedOccupancy === 'triple'
                          ? 'bg-cyan-500 text-white border-cyan-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-300'
                      }`}
                    >
                      Triple<br/>₹10,499 + tax
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOccupancyChange('family')}
                      className={`p-2 text-xs rounded border ${
                        selectedOccupancy === 'family'
                          ? 'bg-cyan-500 text-white border-cyan-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-300'
                      }`}
                    >
                      Family<br/>₹17,999 + tax
                    </button>
                  </div>
                </div>
              </div>

              {/* Check-in/Check-out Dates */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Dates</h3>
                  <button
                    onClick={handleEditDates}
                    className="text-cyan-500 hover:text-cyan-600 text-sm flex items-center"
                  >
                    <Edit3 size={14} className="mr-1" />
                    Edit Dates
                  </button>
                </div>
                {isEditingDates ? (
                  <div className="space-y-2">
                    <input
                      type="date"
                      value={tempCheckIn}
                      onChange={(e) => setTempCheckIn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                      type="date"
                      value={tempCheckOut}
                      onChange={(e) => setTempCheckOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveDates}
                        className="flex-1 bg-cyan-500 text-white px-3 py-1 rounded text-sm hover:bg-cyan-600"
                      >
                        <Check size={14} className="inline mr-1" />Save
                      </button>
                      <button
                        onClick={() => setIsEditingDates(false)}
                        className="flex-1 bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                      >
                        <X size={14} className="inline mr-1" />Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar size={14} className="mr-2" />
                      Check-in: {checkIn}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      Check-out: {checkOut}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{calculateNights()} nights</p>
                  </div>
                )}
              </div>

              {/* Guests */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">Guests</h3>
                  <button
                    onClick={handleEditGuests}
                    className="text-cyan-500 hover:text-cyan-600 text-sm flex items-center"
                  >
                    <Edit3 size={14} className="mr-1" />
                    Edit Guests
                  </button>
                </div>
                {isEditingGuests ? (
                  <div className="space-y-2">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={tempGuests}
                      onChange={(e) => setTempGuests(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveGuests}
                        className="flex-1 bg-cyan-500 text-white px-3 py-1 rounded text-sm hover:bg-cyan-600"
                      >
                        <Check size={14} className="inline mr-1" />Save
                      </button>
                      <button
                        onClick={() => setIsEditingGuests(false)}
                        className="flex-1 bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                      >
                        <X size={14} className="inline mr-1" />Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={14} className="mr-2" />
                      Up to {room?.maxOccupancy} guests
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Max: {room?.maxOccupancy} guests</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Guest Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <User className="mr-2" size={20} />
                    Guest Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={guestInfo.firstName}
                        onChange={(e) => handleGuestInfoChange('firstName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={guestInfo.lastName}
                        onChange={(e) => handleGuestInfoChange('lastName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => handleGuestInfoChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => handleGuestInfoChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={guestInfo.address.street}
                        onChange={(e) => setGuestInfo(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter street address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={guestInfo.address.city}
                        onChange={(e) => setGuestInfo(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter city"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        value={guestInfo.address.state}
                        onChange={(e) => setGuestInfo(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter state/province"
                      />
                    </div>
                    

                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={guestInfo.address.country}
                        onChange={(e) => setGuestInfo(prev => ({ ...prev, address: { ...prev.address, country: e.target.value } }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter country"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Requests
                      </label>
                      <textarea
                        value={guestInfo.specialRequests}
                        onChange={(e) => handleGuestInfoChange('specialRequests', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Any special requests or preferences..."
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <CreditCard className="mr-2" size={20} />
                    Payment Information
                  </h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    
                    {/* Online Payment Options */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-3">Online Payment</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentInfo.method === 'credit_card' 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit_card"
                            checked={paymentInfo.method === 'credit_card'}
                            onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                            className="mr-3 text-cyan-500"
                          />
                          <div className="flex items-center">
                            <CreditCard size={20} className="mr-2 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Credit/Debit Card</span>
                          </div>
                        </label>
                        
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentInfo.method === 'paypal' 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentInfo.method === 'paypal'}
                            onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                            className="mr-3 text-cyan-500"
                          />
                          <div className="flex items-center">
                            <div className="w-5 h-5 mr-2 bg-green-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">J</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">JazzCash</span>
                          </div>
                        </label>
                        
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentInfo.method === 'apple_pay' 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="apple_pay"
                            checked={paymentInfo.method === 'apple_pay'}
                            onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                            className="mr-3 text-cyan-500"
                          />
                          <div className="flex items-center">
                            <div className="w-5 h-5 mr-2 bg-black rounded flex items-center justify-center">
                              <span className="text-white text-xs">🍎</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Apple Pay</span>
                          </div>
                        </label>
                        
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentInfo.method === 'google_pay' 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="google_pay"
                            checked={paymentInfo.method === 'google_pay'}
                            onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                            className="mr-3 text-cyan-500"
                          />
                          <div className="flex items-center">
                            <div className="w-5 h-5 mr-2 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">G</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Google Pay</span>
                          </div>
                        </label>
                        
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentInfo.method === 'bank_transfer' 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank_transfer"
                            checked={paymentInfo.method === 'bank_transfer'}
                            onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                            className="mr-3 text-cyan-500"
                          />
                          <div className="flex items-center">
                            <div className="w-5 h-5 mr-2 bg-gray-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs">🏦</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Bank Transfer</span>
                          </div>
                        </label>
                        
                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentInfo.method === 'crypto' 
                            ? 'border-cyan-500 bg-cyan-50' 
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="crypto"
                            checked={paymentInfo.method === 'crypto'}
                            onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                            className="mr-3 text-cyan-500"
                          />
                          <div className="flex items-center">
                            <div className="w-5 h-5 mr-2 bg-blue-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">E</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">Easypaisa</span>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {/* Payment on Arrival */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 mb-3">Payment on Arrival</h3>
                      <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentInfo.method === 'pay_on_arrival' 
                          ? 'border-cyan-500 bg-cyan-50' 
                          : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pay_on_arrival"
                          checked={paymentInfo.method === 'pay_on_arrival'}
                          onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                          className="mr-3 text-cyan-500"
                        />
                        <div className="flex items-center">
                          <div className="w-5 h-5 mr-2 bg-green-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs">💳</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Pay at Hotel</span>
                            <p className="text-xs text-gray-500">Cash or Card accepted at check-in</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Credit Card Details */}
                  {paymentInfo.method === 'credit_card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cardholderName || ''}
                          onChange={(e) => handlePaymentInfoChange('cardholderName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter cardholder name"
                        />
                        {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber || ''}
                          onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.expiryDate || ''}
                          onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cvv || ''}
                          onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2" size={20} />
                        Complete Booking
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2" size={16} />
                    <span className="text-sm text-black">
                      {checkIn} - {checkOut} ({calculateNights()} nights)
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="mr-2" size={16} />
                    <span className="text-sm text-black">{guests} guests</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    {room.images && room.images.length > 0 && (
                      <Image 
                        src={room.images[0]} 
                        alt={room.name}
                        width={300}
                        height={128}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                        unoptimized={true}
                      />
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2">{room.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{room.type}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium text-black">{checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium text-black">{checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium text-black">{guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nights:</span>
                        <span className="font-medium text-black">{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Occupancy:</span>
                        <span className="font-medium text-black">{room.maxOccupancy} guests</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium text-black">{room.formattedSize || `${room.size} sqm`}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Occupancy:</span>
                      <span className="font-medium text-black capitalize">{selectedOccupancy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Room Rate (₹{dynamicPrice}/night × {calculateNights()} nights)</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes & Fees (10%)</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Selection Modal */}
      {isRoomSelectionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Select a Room</h2>
                <button 
                  onClick={() => setIsRoomSelectionOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {allRooms.map((roomOption) => (
                <div 
                  key={roomOption.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${roomOption.id === selectedRoomId ? 'border-cyan-500 bg-cyan-50' : 'hover:border-gray-400'}`}
                  onClick={() => handleRoomSelection(roomOption.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                      <Image 
                        src={roomOption.images[0] || '/room-green.jpg'} 
                        alt={roomOption.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized={true}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{roomOption.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{roomOption.type}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-cyan-600">₹{roomOption.price}<span className="text-sm font-normal">/night</span></span>
                        <span className="text-sm text-gray-500">Max: {roomOption.maxOccupancy} guests</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => setIsRoomSelectionOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CheckoutPage;