// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu1TYm9u1p0YhmcEEcZhEzBh6kn7qFtFs",
  authDomain: "resume-builder-f6ba9.firebaseapp.com",
  projectId: "resume-builder-f6ba9",
  storageBucket: "resume-builder-f6ba9.appspot.com",
  messagingSenderId: "869210922083",
  appId: "1:869210922083:web:2df073c4334c3844f4ec56",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
