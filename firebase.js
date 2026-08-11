import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY", // Copy from Firebase Project Settings
  authDomain: "dibora-s-memory.firebaseapp.com",
  projectId: "dibora-s-memory",
  storageBucket: "dibora-s-memory.appspot.com",
  messagingSenderId: "288719141896",
  appId: "YOUR_ACTUAL_APP_ID" // Copy from Firebase Project Settings
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}
