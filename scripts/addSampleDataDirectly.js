// This script adds sample data directly to the Firestore database using the web SDK
// It can be run in the browser console to quickly populate the database

// Copy and paste this entire script into your browser console while on the website

// Function to add sample data
async function addSampleData() {
  // Check if Firebase is initialized
  if (!window.firebase || !window.firebase.firestore) {
    console.error('Firebase is not initialized on this page. Please run this script on a page where Firebase is loaded.');
    return;
  }
  
  const db = window.firebase.firestore();
  const websiteId = 'mylumierehotel';
  
  console.log('Starting to add sample data...');
  
  // Create parent documents
  const collections = ['rooms', 'bookings', 'contacts'];
  for (const collection of collections) {
    try {
      await db.collection(collection).doc(websiteId).set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        description: `Container for ${websiteId} ${collection}`
      });
      console.log(`Created parent document for ${collection}/${websiteId}`);
    } catch (error) {
      console.error(`Error creating parent document for ${collection}/${websiteId}:`, error);
    }
  }
  
  // Add sample rooms
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
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
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
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
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
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
      website: websiteId
    }
  ];
  
  // Add each room
  for (const room of rooms) {
    try {
      await db.collection(`rooms/${websiteId}/roomData`).doc(room.id).set(room);
      console.log(`Added room: ${room.name}`);
    } catch (error) {
      console.error(`Error adding room ${room.name}:`, error);
    }
  }
  
  // Add a sample booking
  const booking = {
    id: 'sample-booking-1',
    roomId: 'deluxe-king',
    roomName: 'Deluxe King Room',
    checkIn: firebase.firestore.Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    checkOut: firebase.firestore.Timestamp.fromDate(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)),
    guestName: 'John Doe',
    guestEmail: 'john.doe@example.com',
    guestPhone: '+1234567890',
    adults: 2,
    children: 0,
    totalPrice: 750,
    status: 'confirmed',
    paymentStatus: 'paid',
    specialRequests: 'Early check-in if possible',
    createdAt: firebase.firestore.Timestamp.now(),
    website: websiteId
  };
  
  try {
    await db.collection(`bookings/${websiteId}/bookingData`).doc(booking.id).set(booking);
    console.log('Added sample booking');
  } catch (error) {
    console.error('Error adding sample booking:', error);
  }
  
  // Add a sample contact
  const contact = {
    id: 'sample-contact-1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    subject: 'Inquiry about Executive Suite',
    message: 'I would like to know if the Executive Suite has a view of the ocean and if it includes breakfast.',
    read: false,
    createdAt: firebase.firestore.Timestamp.now(),
    website: websiteId
  };
  
  try {
    await db.collection(`contacts/${websiteId}/contactData`).doc(contact.id).set(contact);
    console.log('Added sample contact');
  } catch (error) {
    console.error('Error adding sample contact:', error);
  }
  
  console.log('Sample data added successfully!');
}

// Run the function
addSampleData().then(() => {
  console.log('Script completed. You can now refresh the admin panel to see the data.');
}).catch(error => {
  console.error('Error running script:', error);
});