// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 🔐 Configuração do Firebase do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyDwFV0t0yB5hiMyy-K9OknBP50kqJf1Nlw",
  authDomain: "centro-cultural-kalunguinha.firebaseapp.com",
  projectId: "centro-cultural-kalunguinha",
  storageBucket: "centro-cultural-kalunguinha.firebasestorage.app",
  messagingSenderId: "992621071252",
  appId: "1:992621071252:web:0f0e8f930543272ab09d81",
  measurementId: "G-WWYDKCWQLM"
};

// 🚀 Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Inicializa o Firestore
export const db = getFirestore(app);

// 📊 (Opcional) Inicializa o Analytics
getAnalytics(app);
