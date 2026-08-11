import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "dibora-s-memory.firebaseapp.com",
  projectId: "dibora-s-memory",
  storageBucket: "dibora-s-memory.appspot.com",
  messagingSenderId: "288719141896",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Automatically connect to Emulators if on localhost
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}

// Inside admin.js or app.js
import { db, auth, storage } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

// You can use 'db' immediately to save memories or wishes!
