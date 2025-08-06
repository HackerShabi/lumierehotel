// Shared room data for the entire application

export interface RoomPricing {
  single: number;
  double: number;
  triple: number;
  family?: number;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  maxOccupancy: number;
  size: string;
  description: string;
  images: string[];
  amenities: string[];
  rating?: number;
  reviewCount?: number;
  available: boolean;
  isPopular?: boolean;
  discount?: number;
  pricing?: RoomPricing;
  baseType?: string;
}

export interface ExtendedRoom extends Room {
  pricing: RoomPricing;
  baseType: string;
}

// Main rooms data - this is the single source of truth
export const rooms: ExtendedRoom[] = [
  {
    id: '1',
    name: 'Deluxe Green Room',
    type: 'deluxe-green',
    baseType: 'deluxe-green',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    maxOccupancy: 4,
    size: '35 sqm',
    description: 'Elegant green-themed room with attached bath service, breakfast included, and modern amenities.',
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom'],
    rating: 4.8,
    reviewCount: 124,
    available: true,
    isPopular: true
  },
  {
    id: '2',
    name: 'Deluxe Green Room',
    type: 'deluxe-green',
    baseType: 'deluxe-green',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    maxOccupancy: 4,
    size: '35 sqm',
    description: 'Elegant green-themed room with attached bath service, breakfast included, and modern amenities.',
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom'],
    rating: 4.9,
    reviewCount: 89,
    available: true,
    isPopular: true
  },
  {
    id: '3',
    name: 'Deluxe Green Room',
    type: 'deluxe-green',
    baseType: 'deluxe-green',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    maxOccupancy: 4,
    size: '35 sqm',
    description: 'Elegant green-themed room with attached bath service, breakfast included, and modern amenities.',
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom'],
    rating: 4.7,
    reviewCount: 76,
    available: true
  },
  {
    id: '4',
    name: 'Deluxe Blue Room',
    type: 'deluxe-blue',
    baseType: 'deluxe-blue',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    maxOccupancy: 4,
    size: '35 sqm',
    description: 'Elegant blue-themed room with attached bath service, breakfast included, and modern amenities.',
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom'],
    rating: 4.8,
    reviewCount: 112,
    available: true,
    isPopular: true
  },
  {
    id: '5',
    name: 'Deluxe Blue Room',
    type: 'deluxe-blue',
    baseType: 'deluxe-blue',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    maxOccupancy: 4,
    size: '35 sqm',
    description: 'Elegant blue-themed room with attached bath service, breakfast included, and modern amenities.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom'],
    rating: 4.9,
    reviewCount: 95,
    available: true,
    isPopular: true
  },
  {
    id: '6',
    name: 'Deluxe Blue Room',
    type: 'deluxe-blue',
    baseType: 'deluxe-blue',
    price: 6999,
    pricing: {
      single: 6999,
      double: 8499,
      triple: 10499
    },
    maxOccupancy: 4,
    size: '35 sqm',
    description: 'Elegant blue-themed room with attached bath service, breakfast included, and modern amenities.',
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    amenities: ['Attached Bath', 'Breakfast Included', 'WiFi', 'Air Conditioning', 'Room Service', 'Private Bathroom'],
    rating: 4.7,
    reviewCount: 82,
    available: true
  }
];

// Helper function to get pricing for a room based on occupancy
export const getRoomPrice = (room: ExtendedRoom | Room, occupancy: 'single' | 'double' | 'triple' | 'family'): number => {
  if ('pricing' in room && room.pricing) {
    return room.pricing[occupancy] || room.price;
  }
  return room.price;
};

// Helper function to get room by ID
export const getRoomById = (id: string): ExtendedRoom | undefined => {
  return rooms.find(room => room.id === id);
};

// Helper function to get available rooms
export const getAvailableRooms = (): ExtendedRoom[] => {
  return rooms.filter(room => room.available);
};

// Helper function to get popular rooms
export const getPopularRooms = (): ExtendedRoom[] => {
  return rooms.filter(room => room.isPopular);
};