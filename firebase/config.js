import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXu0xyf37dExGXKSRn-kpENuPpZQOaoJo",
  authDomain: "rental-6612a.firebaseapp.com",
  projectId: "rental-6612a",
  storageBucket: "rental-6612a.appspot.com",
  messagingSenderId: "658841638617",
  appId: "1:658841638617:web:043b08d16e7aa0979dd0c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);