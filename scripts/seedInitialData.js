// Script to seed initial data to the new subcollections
const admin = require('firebase-admin');
let serviceAccount;

try {
  serviceAccount = require('../serviceAccountKey.json');
} catch (error) {
  console.error('Error loading service account key:', error.message);
  console.log('\nPlease download your service account key from the Firebase console:');
  console.log('1. Go to https://console.firebase.google.com/project/hotelwebsite-bca40/settings/serviceaccounts/adminsdk');
  console.log('2. Click "Generate new private key"');
  console.log('3. Save the file as "serviceAccountKey.json" in the root directory of this project');
  process.exit(1);
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const websiteId = 'mylumierehotel'; // The identifier for this website

async function seedInitialData() {
  console.log('Starting to seed initial data...');
  
  // Create parent documents first
  const collections = ['rooms', 'bookings', 'contacts'];
  for (const collection of collections) {
    try {
      // Create the parent document
      await db.collection(collection).doc(websiteId).set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        description: `Container for ${websiteId} ${collection}`
      });
      console.log(`Created parent document for ${collection}/${websiteId}`);
    } catch (error) {
      console.error(`Error creating parent document for ${collection}/${websiteId}:`, error);
    }
  }
  
  // Seed rooms
  await seedRooms();
  
  // Seed a sample booking
  await seedSampleBooking();
  
  // Seed a sample contact
  await seedSampleContact();
  
  console.log('Initial data seeding completed successfully!');
  process.exit(0);
}

async function seedRooms() {
  console.log('Seeding rooms...');
  
  const rooms = [
    {
      id: 'deluxe-king',
      name: 'Deluxe King Room',
      description: 'Spacious room with king-sized bed and city view.',
      price: 250,
      capacity: 2,
      amenities: ['Free Wi-Fi', 'Minibar', 'Room Service', 'TV', 'Air Conditioning'],
      images: [
        '/images/rooms/deluxe-king-1.jpg',
        '/images/rooms/deluxe-king-2.jpg',
        '/images/rooms/deluxe-king-3.jpg'
      ],
      size: '40 m²',
      bedType: 'King',
      featured: true,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      website: websiteId
    },
    {
      id: 'executive-suite',
      name: 'Executive Suite',
      description: 'Luxury suite with separate living area and panoramic views.',
      price: 450,
      capacity: 2,
      amenities: ['Free Wi-Fi', 'Minibar', 'Room Service', 'TV', 'Air Conditioning', 'Jacuzzi', 'Lounge Access'],
      images: [
        '/images/rooms/executive-suite-1.jpg',
        '/images/rooms/executive-suite-2.jpg',
        '/images/rooms/executive-suite-3.jpg'
      ],
      size: '65 m²',
      bedType: 'King',
      featured: true,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      website: websiteId
    },
    {
      id: 'family-room',
      name: 'Family Room',
      description: 'Comfortable room for families with two queen beds.',
      price: 350,
      capacity: 4,
      amenities: ['Free Wi-Fi', 'Minibar', 'Room Service', 'TV', 'Air Conditioning', 'Connecting Rooms Available'],
      images: [
        '/images/rooms/family-room-1.jpg',
        '/images/rooms/family-room-2.jpg',
        '/images/rooms/family-room-3.jpg'
      ],
      size: '55 m²',
      bedType: 'Two Queens',
      featured: false,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
      website: websiteId
    }
  ];
  
  try {
    // Create batch for efficient writes
    const batch = db.batch();
    
    // Add each room to the batch
    for (const room of rooms) {
      const roomRef = db.collection(`rooms/${websiteId}/roomData`).doc(room.id);
      batch.set(roomRef, room);
    }
    
    // Commit the batch
    await batch.commit();
    console.log(`Seeded ${rooms.length} rooms`);
  } catch (error) {
    console.error('Error seeding rooms:', error);
  }
}

async function seedSampleBooking() {
  console.log('Seeding sample booking...');
  
  const booking = {
    roomId: 'deluxe-king',
    roomName: 'Deluxe King Room',
    guestName: 'John Doe',
    guestEmail: 'john.doe@example.com',
    guestPhone: '+1234567890',
    checkIn: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // 7 days from now
    checkOut: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)), // 10 days from now
    adults: 2,
    children: 0,
    totalPrice: 750, // 3 nights * $250
    status: 'confirmed',
    specialRequests: 'Early check-in if possible',
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
    website: websiteId
  };
  
  try {
    const bookingRef = db.collection(`bookings/${websiteId}/bookingData`).doc();
    await bookingRef.set(booking);
    console.log('Seeded sample booking');
  } catch (error) {
    console.error('Error seeding booking:', error);
  }
}

async function seedSampleContact() {
  console.log('Seeding sample contact...');
  
  const contact = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    subject: 'Question about room service',
    message: 'I would like to know what time room service is available until. Also, do you offer special dietary options?',
    read: false,
    createdAt: admin.firestore.Timestamp.now(),
    website: websiteId
  };
  
  try {
    const contactRef = db.collection(`contacts/${websiteId}/contactData`).doc();
    await contactRef.set(contact);
    console.log('Seeded sample contact');
  } catch (error) {
    console.error('Error seeding contact:', error);
  }
}

// Run the seeding
seedInitialData().catch(error => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

/*
Instructions for use:

1. Download your service account key from Firebase console:
   - Go to Project settings > Service accounts
   - Click "Generate new private key"
   - Save the file as "serviceAccountKey.json" in the root of your project

2. Install firebase-admin if not already installed:
   npm install firebase-admin

3. Run this script:
   node scripts/seedInitialData.js

This will add initial sample data to the new subcollections.
*/