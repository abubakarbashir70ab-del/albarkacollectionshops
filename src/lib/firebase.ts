import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOYU80AltWe1Soj8j9V1-p4TPbvvagKgI",
  authDomain: "elliptical-collector-lf4nj.firebaseapp.com",
  projectId: "elliptical-collector-lf4nj",
  storageBucket: "elliptical-collector-lf4nj.firebasestorage.app",
  messagingSenderId: "119728114338",
  appId: "1:119728114338:web:8b81e8ec0e8307594a25fb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, "ai-studio-5189e3b9-e2ef-4e9d-a6c3-0f712d63ce88");
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
