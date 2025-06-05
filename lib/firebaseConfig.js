import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOHRUjslm3UQWlrLz8KoVOvhT5MpAo53A",
  authDomain: "practiceapp-eccf0.firebaseapp.com",
  projectId: "practiceapp-eccf0",
  storageBucket: "practiceapp-eccf0.appspot.com", // fixed typo
  messagingSenderId: "316773125903",
  appId: "1:316773125903:web:f9f6449d53c4f1f3a4787a",
  measurementId: "G-0SQHJ6PDRE",
};

const app = initializeApp(firebaseConfig);

// ✅ Use AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
