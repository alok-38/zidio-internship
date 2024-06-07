import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID, // Fixed to REACT_APP_PROJECT_ID
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID, // Fixed to REACT_APP_APP_ID
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig); // Fixed getApps() to getApps
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };