import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithRedirect,
  GithubAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase app
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Set persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence set to session");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Function to handle GitHub sign-in
const signInWithGitHub = () => {
  const provider = new GithubAuthProvider();
  signInWithRedirect(auth, provider);
};

export { app, db, auth, storage, signInWithGitHub };
