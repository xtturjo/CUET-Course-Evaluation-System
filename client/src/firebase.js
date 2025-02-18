// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "review-app-78408.firebaseapp.com",
  projectId: "review-app-78408",
  storageBucket: "review-app-78408.appspot.com",
  messagingSenderId: "965994063964",
  appId: "1:965994063964:web:fef92c75f472301cd21e99"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);