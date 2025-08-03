import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCROpJl7HqlGFG3J7t3fqy3TKmPAH3K60U",
  authDomain: "notepadzone-8950b.firebaseapp.com",
  projectId: "notepadzone-8950b",
  storageBucket: "notepadzone-8950b.firebasestorage.app",
  messagingSenderId: "650108827473",
  appId: "1:650108827473:web:119020831ec53883bcc570",
  measurementId: "G-5T4JPVTQN5"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getFirestore(app)
