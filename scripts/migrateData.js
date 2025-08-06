// Script to migrate data from old collections to new subcollections
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

async function migrateData() {
  console.log('Starting data migration...');
  
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
  
  // Migrate rooms
  await migrateCollection('rooms', `rooms/${websiteId}/roomData`);
  
  // Migrate bookings
  await migrateCollection('bookings', `bookings/${websiteId}/bookingData`);
  
  // Migrate contacts
  await migrateCollection('contacts', `contacts/${websiteId}/contactData`);
  
  console.log('Migration completed successfully!');
  process.exit(0);
}

async function migrateCollection(sourceCollection, targetCollection) {
  console.log(`Migrating from ${sourceCollection} to ${targetCollection}...`);
  
  try {
    // Get all documents from source collection
    const snapshot = await db.collection(sourceCollection).get();
    
    if (snapshot.empty) {
      console.log(`No documents found in ${sourceCollection}`);
      return;
    }
    
    // Create batch for efficient writes
    const batch = db.batch();
    let count = 0;
    
    // Process each document
    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Add website identifier
      data.website = websiteId;
      
      // Create reference to new document with same ID
      const newDocRef = db.collection(targetCollection).doc(doc.id);
      
      // Add to batch
      batch.set(newDocRef, data);
      count++;
    });
    
    // Commit the batch
    await batch.commit();
    console.log(`Migrated ${count} documents from ${sourceCollection} to ${targetCollection}`);
  } catch (error) {
    console.error(`Error migrating ${sourceCollection}:`, error);
  }
}

// Run the migration
migrateData().catch(error => {
  console.error('Migration failed:', error);
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
   node scripts/migrateData.js

This will copy all data from the old collections to the new subcollections
with the website identifier added to each document.
*/