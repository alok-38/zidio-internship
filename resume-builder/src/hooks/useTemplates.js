import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useQuery } from "react-query";

const useTemplates = () => {
  return useQuery("templates", async () => {
    const templateRef = collection(db, "templates");

    // Create a query with orderBy for 'timestamp'
    const querySnapshot = await onSnapshot(
      query(templateRef, orderBy("timestamp", "asc")),
      (querySnapshot) => {
        const templates = querySnapshot.docs.map((doc) => doc.data());
        // Resolve the templates array
        return templates;
      },
      (error) => {
        // Handle any error that occurs during onSnapshot
        throw error;
      }
    );

    // Initial check for querySnapshot.docs
    if (!querySnapshot || !querySnapshot.docs) {
      throw new Error("No documents found");
    }

    // Return the templates array
    return querySnapshot.docs.map((doc) => doc.data());
  });
};

export default useTemplates;
