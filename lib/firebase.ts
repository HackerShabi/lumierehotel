// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx19xB8ETNTZhtFILY4khQZFP-Gx1ahY4",
  authDomain: "hotelwebsite-bca40.firebaseapp.com",
  projectId: "hotelwebsite-bca40",
  storageBucket: "hotelwebsite-bca40.firebasestorage.app",
  messagingSenderId: "800577983751",
  appId: "1:800577983751:web:0bd2f3ef1492c47ddca1a2",
  measurementId: "G-X1TXRMFXML"
};

// Check if Firebase config is complete
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

// Initialize Firebase only if properly configured
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let analytics: any = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Initialize Analytics (only in browser)
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.log('Firebase initialization failed:', error);
  }
}

export { auth, db, storage, analytics };
export default app;