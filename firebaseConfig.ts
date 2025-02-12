import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm8ndjg-DooptQ445qJAry9dCeK8RRBsE",
  authDomain: "financeflow-8f453.firebaseapp.com",
  projectId: "financeflow-8f453",
  storageBucket: "financeflow-8f453.firebasestorage.app",
  messagingSenderId: "519386886605",
  appId: "1:519386886605:web:7f05c3c9afb8160f0f9484",
  measurementId: "G-37Q6EBSSG3",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);