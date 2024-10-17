import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN_KEY,
  projectId: import.meta.env.VITE_PROJECT_ID_KEY,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_KEY,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_KEY,
  appId: import.meta.env.VITE_APP_ID_KEY,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID_KEY,
};

export const app = initializeApp(firebaseConfig);
