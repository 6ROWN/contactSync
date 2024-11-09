import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlBH8vSLRvJcuqA8Yvia0WdSv9ca5I_7I",
  authDomain: "fire-tuts-01-b7d03.firebaseapp.com",
  projectId: "fire-tuts-01-b7d03",
  storageBucket: "fire-tuts-01-b7d03.firebasestorage.app",
  messagingSenderId: "49938294825",
  appId: "1:49938294825:web:0b537555f4b95d88499438",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Init auth service
export const auth = getAuth(app);

//Initialize firestore service
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
