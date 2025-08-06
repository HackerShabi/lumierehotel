// Script to check if the service account key exists and guide the user
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');

console.log('Checking for Firebase service account key...');

if (fs.existsSync(serviceAccountPath)) {
  console.log('✅ Service account key found at:', serviceAccountPath);
  console.log('\nYou can now run the migration or seed scripts:');
  console.log('- To migrate existing data: node scripts/migrateData.js');
  console.log('- To seed new data: node scripts/seedInitialData.js');
} else {
  console.log('❌ Service account key not found at:', serviceAccountPath);
  console.log('\nPlease download your service account key from the Firebase console:');
  console.log('1. Go to https://console.firebase.google.com/project/hotelwebsite-bca40/settings/serviceaccounts/adminsdk');
  console.log('2. Click "Generate new private key"');
  console.log('3. Save the file as "serviceAccountKey.json" in the root directory of this project');
  console.log('\nAfter downloading the key, you can run the migration or seed scripts.');
}