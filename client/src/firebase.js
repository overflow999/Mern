// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY ,
  authDomain: "new-p-f854b.firebaseapp.com",
  projectId: "new-p-f854b",
  storageBucket: "new-p-f854b.appspot.com",
  messagingSenderId: "912650594138",
  appId: "1:912650594138:web:3379d0f9660e190ab17563"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);