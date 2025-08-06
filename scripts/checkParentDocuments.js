const admin = require('firebase-admin');
const fs = require('fs');

// Try to load the service account key
let serviceAccount;
try {
  serviceAccount = require('../serviceAccountKey.json');
} catch (error) {
  console.error('Error loading serviceAccountKey.json:', error.message);
  console.log('\nThis script will check if parent documents exist in Firestore.');
  console.log('Using application default credentials instead.');
  
  // Initialize without service account
  admin.initializeApp({
    projectId: 'hotelwebsite-bca40'
  });
}

// If service account was loaded successfully, initialize with it
if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const websiteId = 'mylumierehotel';

async function checkParentDocuments() {
  console.log('Checking parent documents for website ID:', websiteId);
  
  const collections = ['rooms', 'bookings', 'contacts'];
  
  for (const collection of collections) {
    try {
      const docRef = db.collection(collection).doc(websiteId);
      const doc = await docRef.get();
      
      if (doc.exists) {
        console.log(`✅ Parent document ${collection}/${websiteId} exists`);
        console.log(`   Data: ${JSON.stringify(doc.data())}`);
      } else {
        console.log(`❌ Parent document ${collection}/${websiteId} does NOT exist`);
        console.log(`   Creating parent document for ${collection}/${websiteId}...`);
        
        await docRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          description: `Container for ${websiteId} ${collection}`
        });
        
        console.log(`   ✅ Created parent document for ${collection}/${websiteId}`);
      }
      
      // Check if subcollection has data
      const subcollectionRef = db.collection(`${collection}/${websiteId}/${collection}Data`);
      const snapshot = await subcollectionRef.limit(5).get();
      
      if (snapshot.empty) {
        console.log(`❌ No data found in ${collection}/${websiteId}/${collection}Data subcollection`);
      } else {
        console.log(`✅ Found ${snapshot.size} documents in ${collection}/${websiteId}/${collection}Data subcollection`);
        snapshot.forEach(doc => {
          console.log(`   - Document ID: ${doc.id}`);
        });
      }
      
      console.log('-----------------------------------');
    } catch (error) {
      console.error(`Error checking ${collection}/${websiteId}:`, error);
    }
  }
}

checkParentDocuments()
  .then(() => {
    console.log('\nCheck complete. If parent documents were missing, they have been created.');
    console.log('If subcollections are empty, use the add-data.html page to add sample data.');
    console.log('URL: https://mylumierehotel.web.app/add-data.html');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });