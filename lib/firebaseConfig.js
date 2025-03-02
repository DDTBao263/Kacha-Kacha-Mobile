// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5zBfw9d38SgxKYRuUhu-A4YlnPWcoiII",
  authDomain: "kacha-kacha-e5652.firebaseapp.com",
  projectId: "kacha-kacha-e5652",
  storageBucket: "kacha-kacha-e5652.firebasestorage.app",
  messagingSenderId: "801323199719",
  appId: "1:801323199719:web:db9820ae4e11b170bb4642",
  measurementId: "G-484VHCJN5J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
const analytics = getAnalytics(app);