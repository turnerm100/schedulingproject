// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Make sure you fill these in
const firebaseConfig = {
 apiKey: "AIzaSyDKHUpt1DPGOCnHz96dmOVh60KnA0HS6Fg",
  authDomain: "patient-staff-scheduler.firebaseapp.com",
  projectId: "patient-staff-scheduler",
  storageBucket: "patient-staff-scheduler.appspot.com",
  messagingSenderId: "866598073147",
  appId: "1:866598073147:web:9f4baadd7f0c7e768f3d1e",
  measurementId: "G-HERB0SCD70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Analytics
const db = getFirestore(app);
const analytics = getAnalytics(app);

// ✅ Export db so it can be used elsewhere in your app
export { db };
