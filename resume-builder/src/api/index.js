import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";

export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const userData = userCred.providerData[0];
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", userData?.uid),
          (_doc) => {
            if (_doc.exists()) {
              // Corrected method name from exist() to exists()
              resolve(_doc.data());
            } else {
              setDoc(doc(db, "users", userData?.uid), userData)
                .then(() => {
                  resolve(userData);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          },
          (error) => {
            reject(error);
          }
        );
        // Return the unsubscribe function for cleanup
        return () => {
          unsubscribeSnapshot();
        };
      } else {
        reject(new Error("User is not authenticated"));
      }
      // Unsubscribe from the auth state listener (to prevent memory leaks)
      unsubscribe();
    });
  });
};
