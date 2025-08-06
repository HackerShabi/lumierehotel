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

async function verifyFirebaseStructure() {
  console.log('Verifying Firebase database structure...');
  
  // 1. Check if parent documents exist
  const collections = ['rooms', 'bookings', 'contacts'];
  let missingParents = [];
  
  for (const collection of collections) {
    try {
      console.log(`Checking parent document: ${collection}/${websiteId}`);
      const docRef = db.collection(collection).doc(websiteId);
      const doc = await docRef.get();
      
      if (doc.exists) {
        console.log(`✅ Parent document ${collection}/${websiteId} exists`);
      } else {
        console.log(`❌ Parent document ${collection}/${websiteId} does NOT exist`);
        missingParents.push(collection);
      }
    } catch (error) {
      console.error(`Error checking ${collection}/${websiteId}:`, error);
    }
  }
  
  // 2. Create missing parent documents
  if (missingParents.length > 0) {
    console.log('\nCreating missing parent documents...');
    
    for (const collection of missingParents) {
      try {
        const docRef = db.collection(collection).doc(websiteId);
        await docRef.set({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          description: `Container for ${websiteId} ${collection}`
        });
        console.log(`✅ Created parent document for ${collection}/${websiteId}`);
      } catch (error) {
        console.error(`Error creating parent document for ${collection}/${websiteId}:`, error);
      }
    }
  }
  
  // 3. Check if subcollections have data
  console.log('\nChecking subcollections for data...');
  
  for (const collection of collections) {
    try {
      const subcollectionPath = `${collection}/${websiteId}/${collection}Data`;
      console.log(`Checking subcollection: ${subcollectionPath}`);
      
      const subcollectionRef = db.collection(subcollectionPath);
      const snapshot = await subcollectionRef.limit(10).get();
      
      if (snapshot.empty) {
        console.log(`❌ No data found in ${subcollectionPath}`);
      } else {
        console.log(`✅ Found ${snapshot.size} documents in ${subcollectionPath}:`);
        snapshot.forEach(doc => {
          console.log(`   - Document ID: ${doc.id}`);
          console.log(`     Data: ${JSON.stringify(doc.data())}`);
        });
      }
    } catch (error) {
      console.error(`Error checking subcollection ${collection}Data:`, error);
    }
  }
}

// Run the verification
verifyFirebaseStructure()
  .then(() => {
    console.log('\nVerification complete!');
    console.log('If parent documents were missing, they have been created.');
    console.log('If subcollections are empty, use the add-data.html page to add sample data.');
    console.log('URL: https://mylumierehotel.web.app/add-data.html');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error during verification:', error);
    process.exit(1);
  });