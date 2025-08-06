const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin with application default credentials
try {
  admin.initializeApp({
    projectId: 'hotelwebsite-bca40'
  });
  console.log('Firebase Admin initialized successfully with application default credentials');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  process.exit(1);
}

// Create parent documents for each collection
async function createParentDocuments() {
  const db = admin.firestore();
  const websiteId = 'mylumierehotel';
  const collections = ['rooms', 'bookings', 'contacts'];
  
  console.log('Creating parent documents for website ID:', websiteId);
  
  for (const collection of collections) {
    try {
      const docRef = db.collection(collection).doc(websiteId);
      await docRef.set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        description: `Container for ${websiteId} ${collection}`
      }, { merge: true });
      
      console.log(`✅ Created/updated parent document for ${collection}/${websiteId}`);
    } catch (error) {
      console.error(`Error creating parent document for ${collection}/${websiteId}:`, error);
    }
  }
}

// Add sample data to each subcollection
async function addSampleData() {
  const db = admin.firestore();
  const websiteId = 'mylumierehotel';
  
  // Sample room data
  const rooms = [
    {
      name: 'Deluxe Room',
      description: 'A spacious room with a king-sized bed and city view.',
      price: 150,
      maxOccupancy: 2,
      images: ['https://source.unsplash.com/random/800x600/?hotel,room,1'],
      amenities: ['Wi-Fi', 'TV', 'Mini Bar', 'Air Conditioning'],
      available: true,
      website: 'mylumierehotel'
    },
    {
      name: 'Suite',
      description: 'Luxurious suite with separate living area and ocean view.',
      price: 300,
      maxOccupancy: 4,
      images: ['https://source.unsplash.com/random/800x600/?hotel,suite,1'],
      amenities: ['Wi-Fi', 'TV', 'Mini Bar', 'Air Conditioning', 'Jacuzzi'],
      available: true,
      website: 'mylumierehotel'
    }
  ];
  
  // Sample booking data
  const bookings = [
    {
      roomId: 'will-be-replaced',
      roomName: 'Deluxe Room',
      guestName: 'John Doe',
      guestEmail: 'john@example.com',
      guestPhone: '+1234567890',
      checkInDate: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 86400000)),
      checkOutDate: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 86400000 * 3)),
      totalPrice: 450,
      status: 'confirmed',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      website: 'mylumierehotel'
    }
  ];
  
  // Sample contact data
  const contacts = [
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1987654321',
      message: 'I would like to inquire about your conference facilities.',
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      website: 'mylumierehotel'
    }
  ];
  
  // Add rooms
  console.log('Adding sample rooms...');
  for (const room of rooms) {
    try {
      const roomRef = await db.collection(`rooms/${websiteId}/roomData`).add(room);
      console.log(`✅ Added room: ${room.name} with ID: ${roomRef.id}`);
      
      // Update the roomId in the booking data with the first room's ID
      if (room.name === 'Deluxe Room') {
        bookings[0].roomId = roomRef.id;
      }
    } catch (error) {
      console.error(`Error adding room ${room.name}:`, error);
    }
  }
  
  // Add bookings
  console.log('\nAdding sample bookings...');
  for (const booking of bookings) {
    try {
      const bookingRef = await db.collection(`bookings/${websiteId}/bookingData`).add(booking);
      console.log(`✅ Added booking for ${booking.guestName} with ID: ${bookingRef.id}`);
    } catch (error) {
      console.error(`Error adding booking for ${booking.guestName}:`, error);
    }
  }
  
  // Add contacts
  console.log('\nAdding sample contacts...');
  for (const contact of contacts) {
    try {
      const contactRef = await db.collection(`contacts/${websiteId}/contactData`).add(contact);
      console.log(`✅ Added contact from ${contact.name} with ID: ${contactRef.id}`);
    } catch (error) {
      console.error(`Error adding contact from ${contact.name}:`, error);
    }
  }
}

// Run the functions
async function main() {
  try {
    await createParentDocuments();
    console.log('\n-----------------------------------\n');
    await addSampleData();
    console.log('\n-----------------------------------\n');
    console.log('✅ All sample data has been added successfully!');
    console.log('You can now check the admin panel at: https://mylumierehotel.web.app/admin');
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    process.exit(0);
  }
}

main();