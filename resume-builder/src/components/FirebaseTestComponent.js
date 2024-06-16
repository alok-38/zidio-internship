// FirebaseTestComponent.js

import React, { useEffect } from "react";
import { db } from "../config/firebase.config";

const FirebaseTestComponent = () => {
  useEffect(() => {
    // Check if db is initialized
    console.log("Firebase db:", db);

    // Example: Fetch some data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await db.collection("exampleCollection").get();
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function to test Firestore access
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>Testing Firebase Initialization</h2>
      {/* Your component content */}
    </div>
  );
};

export default FirebaseTestComponent;
