import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCP6ZLQwu9mtV5u586m0V6VVe4qISUGXpI",
    authDomain: "spark-841dc.firebaseapp.com",
    projectId: "spark-841dc",
    storageBucket: "spark-841dc.firebasestorage.app",
    messagingSenderId: "1019665988440",
    appId: "1:1019665988440:web:8e02384ce7681b4edc032d",
    measurementId: "G-W39K0GYCDK"
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