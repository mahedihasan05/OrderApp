import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGbigBmKmOD7Xg3LJ3PrPRqasb2nL3yhE",
  authDomain: "orderapp-5ddf1.firebaseapp.com",
  projectId: "orderapp-5ddf1",
  storageBucket: "orderapp-5ddf1.firebasestorage.app",
  messagingSenderId: "393672420019",
  appId: "1:393672420019:web:0ed7365249723a6a195ec6"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
