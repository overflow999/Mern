 
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_KEY,
  authDomain: "mern-overflow.firebaseapp.com",
  projectId: "mern-overflow",
  storageBucket: "mern-overflow.appspot.com",
  messagingSenderId: "698348761609",
  appId: "1:698348761609:web:f2547d0b758c9c312b3ed8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);