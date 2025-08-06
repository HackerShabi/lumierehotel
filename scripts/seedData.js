// Script to seed Firebase with sample hotel data
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx19xB8ETNTZhtFILY4khQZFP-Gx1ahY4",
  authDomain: "hotelwebsite-bca40.firebaseapp.com",
  projectId: "hotelwebsite-bca40",
  storageBucket: "hotelwebsite-bca40.firebasestorage.app",
  messagingSenderId: "800577983751",
  appId: "1:800577983751:web:dafdedaf19301bc8dca1a2",
  measurementId: "G-LJF2VK5T3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample rooms data
const sampleRooms = [
  {
    name: "Deluxe Ocean View Suite",
    type: "Suite",
    price: 450,
    size: 65,
    maxOccupancy: 4,
    available: true,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    amenities: [
      "Ocean View",
      "King Bed",
      "Private Balcony",
      "Mini Bar",
      "Room Service",
      "WiFi",
      "Air Conditioning",
      "Flat Screen TV"
    ],
    description: "Experience luxury with breathtaking ocean views from your private balcony. This spacious suite features a king-size bed, elegant furnishings, and premium amenities."
  },
  {
    name: "Executive Business Room",
    type: "Business",
    price: 320,
    size: 45,
    maxOccupancy: 2,
    available: true,
    rating: 4.6,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    amenities: [
      "Work Desk",
      "Queen Bed",
      "Business Center Access",
      "High-Speed WiFi",
      "Coffee Machine",
      "Room Service",
      "Air Conditioning",
      "Flat Screen TV"
    ],
    description: "Perfect for business travelers, featuring a dedicated workspace, high-speed internet, and modern amenities for productivity and comfort."
  },
  {
    name: "Luxury Presidential Suite",
    type: "Presidential",
    price: 850,
    size: 120,
    maxOccupancy: 6,
    available: true,
    rating: 4.9,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"
    ],
    amenities: [
      "Panoramic City View",
      "Master Bedroom",
      "Living Room",
      "Dining Area",
      "Private Terrace",
      "Jacuzzi",
      "Butler Service",
      "Premium Mini Bar",
      "WiFi",
      "Smart TV"
    ],
    description: "The epitome of luxury living with panoramic city views, separate living and dining areas, and exclusive butler service."
  },
  {
    name: "Standard Double Room",
    type: "Standard",
    price: 180,
    size: 30,
    maxOccupancy: 2,
    available: true,
    rating: 4.3,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
    ],
    amenities: [
      "Double Bed",
      "City View",
      "WiFi",
      "Air Conditioning",
      "Flat Screen TV",
      "Mini Fridge",
      "Room Service",
      "Daily Housekeeping"
    ],
    description: "Comfortable and affordable accommodation with modern amenities and city views, perfect for leisure travelers."
  },
  {
    name: "Family Garden Suite",
    type: "Family",
    price: 380,
    size: 55,
    maxOccupancy: 5,
    available: true,
    rating: 4.7,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
    ],
    amenities: [
      "Garden View",
      "Separate Kids Area",
      "Queen Bed + Sofa Bed",
      "Kitchenette",
      "Family Games",
      "WiFi",
      "Air Conditioning",
      "Large Bathroom"
    ],
    description: "Spacious family-friendly suite with garden views, separate children's area, and kitchenette for extended stays."
  },
  {
    name: "Romantic Honeymoon Suite",
    type: "Honeymoon",
    price: 520,
    size: 50,
    maxOccupancy: 2,
    available: true,
    rating: 4.9,
    reviewCount: 73,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    amenities: [
      "King Bed",
      "Private Jacuzzi",
      "Rose Petals",
      "Champagne Service",
      "Romantic Lighting",
      "Private Balcony",
      "Room Service",
      "WiFi"
    ],
    description: "Intimate and romantic suite perfect for couples, featuring a private jacuzzi, champagne service, and romantic ambiance."
  }
];

async function seedRooms() {
  try {
    console.log('Starting to seed rooms data...');
    
    for (const room of sampleRooms) {
      const docRef = await addDoc(collection(db, 'rooms'), room);
      console.log(`Added room: ${room.name} with ID: ${docRef.id}`);
    }
    
    console.log('Successfully seeded all rooms!');
  } catch (error) {
    console.error('Error seeding rooms:', error);
  }
}

// Run the seeding function
seedRooms().then(() => {
  console.log('Seeding completed!');
  process.exit(0);
}).catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});