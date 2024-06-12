import { auth, db } from "../config/firebase.config";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { collection, orderBy, query } from "firebase/firestore";

export const getUserDetail = () => {
  return new Promise((resolve, reject) => {
    const authUnsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const userData = userCred.providerData[0];
        const userDocRef = doc(db, "users", userData?.uid);

        const userDocUnsubscribe = onSnapshot(userDocRef, (_doc) => {
          if (_doc.exists()) {
            resolve(_doc.data());
          } else {
            setDoc(userDocRef, userData)
              .then(() => {
                resolve(userData);
              })
              .catch((error) => {
                reject(error);
              });
          }
        });

        return () => {
          authUnsubscribe();
          userDocUnsubscribe();
        };
      } else {
        reject(new Error("User is not authenticated"));
      }
    });
  });
};

export const getTemplates = () => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "templates"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
      const templates = querySnap.docs.map((doc) => doc.data());
      resolve(templates);
    });

    return unsubscribe;
  });
};

export const getTemplateDetail = (id) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(doc(db, "templates", id), (doc) => {
      resolve(doc.data());
    });

    return unsubscribe;
  });
};

export const getTemplateDetailEditByUser = (uid, id) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      doc(db, "users", uid, "resumes", id),
      (doc) => {
        resolve(doc.data());
      }
    );

    return unsubscribe;
  });
};

export const getSavedResumes = (uid) => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "users", uid, "resumes"),
      orderBy("timeStamp", "asc")
    );

    const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
      const templates = querySnap.docs.map((doc) => doc.data());
      resolve(templates);
    });

    return unsubscribe;
  });
};
