// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwFV0t0yB5hiMyy-K9OknBP50kqJf1Nlw",
  authDomain: "centro-cultural-kalunguinha.firebaseapp.com",
  projectId: "centro-cultural-kalunguinha",
  storageBucket: "centro-cultural-kalunguinha.firebasestorage.app",
  messagingSenderId: "992621071252",
  appId: "1:992621071252:web:0f0e8f930543272ab09d81",
  measurementId: "G-WWYDKCWQLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);