// src/firebase.js

// Import the functions you need from the SDKs you want to use
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Importing the Auth module
import { getFirestore } from "firebase/firestore"; // Importing Firestore
import { getAnalytics } from "firebase/analytics"; // Importing Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDajtGp5jMQRF9PhDPl69KQiVc1NkKV9-E",
  authDomain: "homecareconnect-b4d3b.firebaseapp.com",
  projectId: "homecareconnect-b4d3b",
  storageBucket: "homecareconnect-b4d3b.appspot.com",
  messagingSenderId: "387429902243",
  appId: "1:387429902243:web:198c73636d08a7d25bdc16",
  measurementId: "G-6W575KV4MM" // Measurement ID for Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Initialize Firestore
const analytics = getAnalytics(app); // Initialize Analytics

// Export auth and db for use in other files
export { auth, db, analytics };
