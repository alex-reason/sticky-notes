import { initializeApp } from "firebase/app";

import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth, } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "finance-tracker-68266.firebaseapp.com",
  projectId: "finance-tracker-68266",
  storageBucket: "finance-tracker-68266.appspot.com",
  messagingSenderId: "529233377635",
  appId: "1:529233377635:web:6512b91374943bc59fbb56"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const timestamp = Timestamp;
// use with Timestamp.fromDate(new Date())

export { db, auth, timestamp };