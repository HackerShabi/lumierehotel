import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDoc,
  Timestamp,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from './firebase';

// Types
export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  maxOccupancy: number;
  size: number | string;
  description: string;
  amenities: string[];
  images: string[];
  available: boolean;
  rating?: number;
  reviewCount?: number;
  isPopular?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  website?: string; // Identifier for which website this room belongs to
}

export interface Booking {
  id?: string;
  roomId: string;
  roomName: string;
  roomType: string;
  roomPrice: number;
  guestName?: string; // For backward compatibility
  email?: string; // For backward compatibility
  phone?: string; // For backward compatibility
  guestInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  children: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  specialRequests?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  website?: string; // Identifier for which website this booking belongs to
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  read: boolean;
  createdAt?: Timestamp;
  website?: string; // Identifier for which website this contact belongs to
}

export interface Stats {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  totalRooms: number;
  pendingBookings: number;
  unreadContacts: number;
}

// Authentication Services
export const adminLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Room Services
export const getRooms = async (): Promise<Room[]> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      console.log('Firebase not configured, skipping Firestore fetch');
      return [];
    }
    
    console.log('Fetching rooms from Firestore...');
    // Use subcollection for this specific website (mylumierehotel)
    const roomsRef = collection(db, 'rooms/mylumierehotel/roomData');
    console.log('Room collection path:', 'rooms/mylumierehotel/roomData');
    
    const q = query(roomsRef, orderBy('createdAt', 'desc'));
    console.log('Executing rooms query...');
    
    const querySnapshot = await getDocs(q);
    console.log('Rooms query completed, documents found:', querySnapshot.size);
    
    const rooms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
    
    console.log('Processed room data:', rooms.length, 'rooms');
    return rooms;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
};

export const getRoom = async (roomId: string): Promise<Room | null> => {
  try {
    // Handle string or number IDs
    const normalizedRoomId = roomId.toString();
    console.log('Looking for room with normalized ID:', normalizedRoomId);
    
    // First try to get from Firebase using subcollection for this specific website (mylumierehotel)
    if (db) {
      try {
        const roomRef = doc(db, 'rooms/mylumierehotel/roomData', normalizedRoomId);
        const roomSnapshot = await getDoc(roomRef);
        
        if (roomSnapshot.exists()) {
          const roomData = roomSnapshot.data();
          return {
            id: roomSnapshot.id,
            ...roomData,
            createdAt: roomData.createdAt?.toDate(),
            updatedAt: roomData.updatedAt?.toDate()
          } as Room;
        }
      } catch (firebaseError) {
        console.warn(`Firebase error getting room ${normalizedRoomId}:`, firebaseError);
        // Continue to fallback
      }
    } else {
      console.log('Firebase not configured, using static data only');
    }
    
    // Fallback to static data if Firebase fails or room not found
    const staticRooms = [
      {
        id: '1',
        name: 'Deluxe Suite',
        type: 'suite',
        price: 299,
        maxOccupancy: 2,
        size: 45,
        description: 'Luxurious suite with panoramic city views and premium amenities.',
        amenities: ['King Bed', 'City View', 'WiFi', 'Mini Bar', 'Air Conditioning', 'Room Service'],
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true
      },
      {
        id: '2',
        name: 'Executive Suite',
        type: 'suite',
        price: 599,
        maxOccupancy: 4,
        size: 65,
        description: 'Spacious suite for executives with work area.',
        amenities: ['King Bed', 'Work Desk', 'WiFi', 'Mini Bar', 'Air Conditioning', 'Room Service'],
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true
      },
      {
        id: '3',
        name: 'Standard Double Room',
        type: 'standard',
        price: 199,
        maxOccupancy: 2,
        size: 30,
        description: 'Comfortable double room for couples.',
        amenities: ['Double Bed', 'WiFi', 'Air Conditioning', 'Room Service'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true
      },
      {
        id: '4',
        name: 'Presidential Suite',
        type: 'presidential',
        price: 1299,
        maxOccupancy: 6,
        size: 120,
        description: 'Luxury suite with multiple rooms.',
        amenities: ['King Bed', 'Living Room', 'WiFi', 'Mini Bar', 'Air Conditioning', 'Butler Service'],
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true
      },
      {
        id: '5',
        name: 'Family Room',
        type: 'family',
        price: 399,
        maxOccupancy: 4,
        size: 50,
        description: 'Room suitable for families with children.',
        amenities: ['Two Double Beds', 'WiFi', 'Air Conditioning', 'Room Service', 'Mini Fridge'],
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true
      },
      {
        id: '6',
        name: 'Business Class Room',
        type: 'business',
        price: 349,
        maxOccupancy: 2,
        size: 40,
        description: 'Room designed for business travelers.',
        amenities: ['King Bed', 'Work Desk', 'WiFi', 'Mini Bar', 'Air Conditioning', 'Room Service'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        available: true
      }
    ];
    
    const staticRoom = staticRooms.find(room => room.id.toString() === normalizedRoomId);
    if (staticRoom) {
      console.log(`Using static data for room ${normalizedRoomId}`);
      return staticRoom as Room;
    }
    
    console.log(`Room with ID ${normalizedRoomId} not found in Firebase or static data`);
    return null;
  } catch (error) {
    console.error(`Error getting room with ID ${roomId}:`, error);
    return null; // Return null instead of throwing to prevent app crashes
  }
};

export const getAvailableRooms = async (checkInDate: string, checkOutDate: string, guests: number): Promise<Room[]> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      console.log('Firebase not configured, returning empty array');
      return [];
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const roomsRef = collection(db, 'rooms/mylumierehotel/roomData');
    // Query available rooms with guest capacity (now supported by composite index)
    const q = query(
      roomsRef,
      where('available', '==', true),
      where('maxOccupancy', '>=', guests)
    );
    const querySnapshot = await getDocs(q);
    
    const suitableRooms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];

    // Check for conflicting bookings
    const availableRooms = [];
    for (const room of suitableRooms) {
      const bookingsRef = collection(db, 'bookings/mylumierehotel/bookingData');
      const bookingQuery = query(
        bookingsRef,
        where('roomId', '==', room.id),
        where('status', 'in', ['confirmed', 'pending'])
      );
      const bookingSnapshot = await getDocs(bookingQuery);
      
      const hasConflict = bookingSnapshot.docs.some(doc => {
        const booking = doc.data();
        const bookingCheckIn = new Date(booking.checkIn);
        const bookingCheckOut = new Date(booking.checkOut);
        const requestCheckIn = new Date(checkInDate);
        const requestCheckOut = new Date(checkOutDate);
        
        return (
          (requestCheckIn >= bookingCheckIn && requestCheckIn < bookingCheckOut) ||
          (requestCheckOut > bookingCheckIn && requestCheckOut <= bookingCheckOut) ||
          (requestCheckIn <= bookingCheckIn && requestCheckOut >= bookingCheckOut)
        );
      });
      
      if (!hasConflict) {
        availableRooms.push(room);
      }
    }
    
    return availableRooms;
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    throw error;
  }
};

export const addRoom = async (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const roomsRef = collection(db, 'rooms/mylumierehotel/roomData');
    const docRef = await addDoc(roomsRef, {
      ...room,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      website: 'mylumierehotel' // Add website identifier
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding room:', error);
    throw error;
  }
};

export const updateRoom = async (roomId: string, updates: Partial<Room>): Promise<void> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const roomRef = doc(db, 'rooms/mylumierehotel/roomData', roomId);
    await updateDoc(roomRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
};

export const deleteRoom = async (roomId: string): Promise<void> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const roomRef = doc(db, 'rooms/mylumierehotel/roomData', roomId);
    await deleteDoc(roomRef);
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};

// Booking Services
export const getBookings = async (): Promise<Booking[]> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      console.log('Firebase not configured, returning empty bookings array');
      return [];
    }
    
    console.log('Fetching bookings from Firestore...');
    // Use subcollection for this specific website (mylumierehotel)
    const bookingsRef = collection(db, 'bookings/mylumierehotel/bookingData');
    console.log('Bookings collection path:', 'bookings/mylumierehotel/bookingData');
    
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));
    console.log('Executing bookings query...');
    
    const querySnapshot = await getDocs(q);
    console.log('Bookings query completed, documents found:', querySnapshot.size);
    
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
    
    console.log('Processed booking data:', bookings.length, 'bookings');
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
};

export const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const bookingsRef = collection(db, 'bookings/mylumierehotel/bookingData');
    const docRef = await addDoc(bookingsRef, {
      ...booking,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      website: 'mylumierehotel' // Add website identifier
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
};

export const updateBooking = async (bookingId: string, updates: Partial<Booking>): Promise<void> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const bookingRef = doc(db, 'bookings/mylumierehotel/bookingData', bookingId);
    await updateDoc(bookingRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const bookingRef = doc(db, 'bookings/mylumierehotel/bookingData', bookingId);
    await deleteDoc(bookingRef);
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};

// Contact Services
export const getContacts = async (): Promise<Contact[]> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      console.log('Firebase not configured, returning empty contacts array');
      return [];
    }
    
    console.log('Fetching contacts from Firestore...');
    // Use subcollection for this specific website (mylumierehotel)
    const contactsRef = collection(db, 'contacts/mylumierehotel/contactData');
    console.log('Contacts collection path:', 'contacts/mylumierehotel/contactData');
    
    const q = query(contactsRef, orderBy('createdAt', 'desc'));
    console.log('Executing contacts query...');
    
    const querySnapshot = await getDocs(q);
    console.log('Contacts query completed, documents found:', querySnapshot.size);
    
    const contacts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Contact[];
    
    console.log('Processed contact data:', contacts.length, 'contacts');
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
};

export const addContact = async (contact: Omit<Contact, 'id' | 'createdAt' | 'read'>): Promise<string> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const contactsRef = collection(db, 'contacts/mylumierehotel/contactData');
    const docRef = await addDoc(contactsRef, {
      ...contact,
      read: false, // Set default value for read status
      createdAt: Timestamp.now(),
      website: 'mylumierehotel' // Add website identifier
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const markContactAsRead = async (contactId: string): Promise<void> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const contactRef = doc(db, 'contacts/mylumierehotel/contactData', contactId);
    await updateDoc(contactRef, {
      read: true
    });
  } catch (error) {
    console.error('Error marking contact as read:', error);
    throw error;
  }
};

export const deleteContact = async (contactId: string): Promise<void> => {
  try {
    // Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Use subcollection for this specific website (mylumierehotel)
    const contactRef = doc(db, 'contacts/mylumierehotel/contactData', contactId);
    await deleteDoc(contactRef);
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

// Stats Services
export const getStats = async (): Promise<Stats> => {
  try {
    // Use subcollections for this specific website (mylumierehotel)
    const [bookings, rooms, contacts] = await Promise.all([
      getBookings(),
      getRooms(),
      getContacts()
    ]);

    const totalBookings = bookings.length;
    const totalRevenue = bookings
      .filter(booking => booking.paymentStatus === 'paid')
      .reduce((sum, booking) => sum + booking.totalAmount, 0);
    const totalRooms = rooms.length;
    const pendingBookings = bookings.filter(booking => booking.status === 'pending').length;
    const unreadContacts = contacts.filter(contact => !contact.read).length;
    
    // Calculate occupancy rate (simplified)
    const confirmedBookings = bookings.filter(booking => 
      booking.status === 'confirmed' || booking.status === 'completed'
    ).length;
    const occupancyRate = totalRooms > 0 ? Math.round((confirmedBookings / totalRooms) * 100) : 0;

    return {
      totalBookings,
      totalRevenue,
      occupancyRate,
      totalRooms,
      pendingBookings,
      unreadContacts
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return default stats instead of throwing to prevent app crashes
    return {
      totalBookings: 0,
      totalRevenue: 0,
      occupancyRate: 0,
      totalRooms: 0,
      pendingBookings: 0,
      unreadContacts: 0
    };
  }
};

// Image Upload Service
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    // Check if Firebase storage is configured
    if (!storage) {
      throw new Error('Firebase storage not configured');
    }
    
    const imageRef = ref(storage, path);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (path: string): Promise<void> => {
  try {
    // Check if Firebase storage is configured
    if (!storage) {
      throw new Error('Firebase storage not configured');
    }
    
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Real-time listeners
export const subscribeToBookings = (callback: (bookings: Booking[]) => void) => {
  // Check if Firebase is configured
  if (!db) {
    console.log('Firebase not configured, cannot set up real-time listener');
    return () => {}; // Return empty unsubscribe function
  }
  
  console.log('Setting up real-time listener for bookings...');
  // Use subcollection for this specific website (mylumierehotel)
  const bookingsRef = collection(db, 'bookings/mylumierehotel/bookingData');
  console.log('Bookings collection path:', 'bookings/mylumierehotel/bookingData');
  
  const q = query(bookingsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    console.log('Real-time bookings update received, documents:', querySnapshot.size);
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Booking[];
    console.log('Processed booking data:', bookings.length, 'bookings');
    callback(bookings);
  }, (error) => {
    console.error('Error in bookings listener:', error);
  });
};

export const subscribeToContacts = (callback: (contacts: Contact[]) => void) => {
  // Check if Firebase is configured
  if (!db) {
    console.log('Firebase not configured, cannot set up real-time listener');
    return () => {}; // Return empty unsubscribe function
  }
  
  console.log('Setting up real-time listener for contacts...');
  // Use subcollection for this specific website (mylumierehotel)
  const contactsRef = collection(db, 'contacts/mylumierehotel/contactData');
  console.log('Contacts collection path:', 'contacts/mylumierehotel/contactData');
  
  const q = query(contactsRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    console.log('Real-time contacts update received, documents:', querySnapshot.size);
    const contacts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Contact[];
    console.log('Processed contact data:', contacts.length, 'contacts');
    callback(contacts);
  }, (error) => {
    console.error('Error in contacts listener:', error);
  });
};