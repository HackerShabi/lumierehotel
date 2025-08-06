const admin = require('firebase-admin');

// Initialize Firebase Admin with application default credentials
try {
  admin.initializeApp({
    projectId: 'hotelwebsite-bca40'
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  process.exit(1);
}

const db = admin.firestore();
const websiteId = 'mylumierehotel';

async function addSampleData() {
  console.log('Adding sample data to Firebase...');
  
  // Ensure parent documents exist
  const collections = ['rooms', 'bookings', 'contacts'];
  
  for (const collection of collections) {
    try {
      console.log(`Ensuring parent document: ${collection}/${websiteId}`);
      const docRef = db.collection(collection).doc(websiteId);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        await docRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          description: `Container for ${websiteId} ${collection}`
        });
        console.log(`Created parent document for ${collection}/${websiteId}`);
      }
    } catch (error) {
      console.error(`Error with parent document ${collection}/${websiteId}:`, error);
    }
  }
  
  // Add sample rooms
  const roomsData = [
    {
      id: 'deluxe-room',
      name: 'Deluxe Room',
      description: 'Spacious room with a king-size bed and city view.',
      price: 199,
      capacity: 2,
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar'],
      images: [
        '/images/rooms/deluxe-1.jpg',
        '/images/rooms/deluxe-2.jpg'
      ],
      available: true
    },
    {
      id: 'suite-room',
      name: 'Executive Suite',
      description: 'Luxury suite with separate living area and panoramic views.',
      price: 349,
      capacity: 4,
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Jacuzzi', 'Kitchenette'],
      images: [
        '/images/rooms/suite-1.jpg',
        '/images/rooms/suite-2.jpg'
      ],
      available: true
    },
    {
      id: 'family-room',
      name: 'Family Room',
      description: 'Perfect for families with two queen beds and extra space.',
      price: 279,
      capacity: 4,
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Child-friendly'],
      images: [
        '/images/rooms/family-1.jpg',
        '/images/rooms/family-2.jpg'
      ],
      available: true
    }
  ];
  
  // Add sample bookings
  const bookingsData = [
    {
      id: 'booking1',
      roomId: 'deluxe-room',
      roomName: 'Deluxe Room',
      guestName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1234567890',
      checkIn: admin.firestore.Timestamp.fromDate(new Date('2023-12-15')),
      checkOut: admin.firestore.Timestamp.fromDate(new Date('2023-12-18')),
      guests: 2,
      totalPrice: 597,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      specialRequests: 'Early check-in if possible'
    },
    {
      id: 'booking2',
      roomId: 'suite-room',
      roomName: 'Executive Suite',
      guestName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1987654321',
      checkIn: admin.firestore.Timestamp.fromDate(new Date('2023-12-20')),
      checkOut: admin.firestore.Timestamp.fromDate(new Date('2023-12-25')),
      guests: 3,
      totalPrice: 1745,
      status: 'pending',
      paymentStatus: 'awaiting',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      specialRequests: 'High floor room with view'
    }
  ];
  
  // Add sample contacts
  const contactsData = [
    {
      id: 'contact1',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1122334455',
      subject: 'Reservation Inquiry',
      message: 'I would like to know if you offer airport shuttle service for guests.',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    },
    {
      id: 'contact2',
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      phone: '+1567890123',
      subject: 'Special Event Booking',
      message: 'I am interested in booking your conference room for a corporate event next month. Can you provide details on availability and pricing?',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    }
  ];
  
  // Add rooms data
  console.log('\nAdding sample rooms data...');
  for (const room of roomsData) {
    try {
      const roomRef = db.collection(`rooms/${websiteId}/roomData`).doc(room.id);
      await roomRef.set(room);
      console.log(`✅ Added room: ${room.name}`);
    } catch (error) {
      console.error(`Error adding room ${room.name}:`, error);
    }
  }
  
  // Add bookings data
  console.log('\nAdding sample bookings data...');
  for (const booking of bookingsData) {
    try {
      const bookingRef = db.collection(`bookings/${websiteId}/bookingData`).doc(booking.id);
      await bookingRef.set(booking);
      console.log(`✅ Added booking for: ${booking.guestName}`);
    } catch (error) {
      console.error(`Error adding booking for ${booking.guestName}:`, error);
    }
  }
  
  // Add contacts data
  console.log('\nAdding sample contacts data...');
  for (const contact of contactsData) {
    try {
      const contactRef = db.collection(`contacts/${websiteId}/contactData`).doc(contact.id);
      await contactRef.set(contact);
      console.log(`✅ Added contact from: ${contact.name}`);
    } catch (error) {
      console.error(`Error adding contact from ${contact.name}:`, error);
    }
  }
}

// Run the function to add sample data
addSampleData()
  .then(() => {
    console.log('\nSample data added successfully!');
    console.log('You can now check the admin panel at: https://mylumierehotel.web.app/admin');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error adding sample data:', error);
    process.exit(1);
  });