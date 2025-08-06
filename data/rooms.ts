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
    images: ['https://cf.bstatic.com/xdata/images/hotel/max300/674164664.jpg?k=4811444de2293573fe8fa0021a2a5cf062a988fc3cf7c78c8025216246175cb1&o='],
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
    images: ['https://cf.bstatic.com/xdata/images/hotel/max300/674164664.jpg?k=4811444de2293573fe8fa0021a2a5cf062a988fc3cf7c78c8025216246175cb1&o='],
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
    images: ['https://cf.bstatic.com/xdata/images/hotel/max300/674164664.jpg?k=4811444de2293573fe8fa0021a2a5cf062a988fc3cf7c78c8025216246175cb1&o='],
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
    images: ['https://cf.bstatic.com/xdata/images/hotel/max300/674164675.jpg?k=6425b05acb24c18a43b5af10beef94ff39e5a3ab3565c7f021f42b0820df39e6&o='],
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
    images: ['https://cf.bstatic.com/xdata/images/hotel/max300/674164675.jpg?k=6425b05acb24c18a43b5af10beef94ff39e5a3ab3565c7f021f42b0820df39e6&o='],
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
    images: ['https://cf.bstatic.com/xdata/images/hotel/max300/674164675.jpg?k=6425b05acb24c18a43b5af10beef94ff39e5a3ab3565c7f021f42b0820df39e6&o='],
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