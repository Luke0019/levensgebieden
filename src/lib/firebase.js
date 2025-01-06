import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let analytics;
let db;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  // Only initialize analytics in the browser
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics failed to initialize:', error);
  }
}

export { app, analytics, db }; 