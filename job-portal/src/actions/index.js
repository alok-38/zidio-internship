"use server";
import connectToDB from "@/database";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";
import stripe from "stripe";

// Create profile action
export async function createProfileAction(formData, pathToRevalidate) {
  try {
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
  } catch (error) {
    console.error("Error creating profile:", error.message);
    throw error; // Rethrow the error to handle it where createProfileAction is called
  }
}

// Fetch profile action
export async function fetchProfileAction(id) {
  try {
    await connectToDB(); // Establishes a database connection
    const result = await Profile.findOne({ userId: id }); // Finds a profile in the database by userId (id)
    return JSON.parse(JSON.stringify(result)); // Converts the result to JSON and returns it
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error; // Rethrows the error to handle it where fetchProfileAction is called
  }
}

// Update profile action
export async function updateProfileAction(id, updatedData) {
  try {
    await connectToDB(); // Establishes a database connection
    const result = await Profile.findOneAndUpdate({ userId: id }, updatedData, {
      new: true,
    });
    return JSON.parse(JSON.stringify(result)); // Converts the updated result to JSON and returns it
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error; // Rethrows the error to handle it where updateProfileAction is called
  }
}

// Function to create a price ID based on amount
export async function createPriceIdAction({ amount }) {
  try {
    const price = await stripe.prices.create({
      unit_amount: amount,
      currency: "usd", // Example currency (adjust as needed)
      recurring: { interval: "year" }, // Example recurring interval (adjust as needed)
    });
    return price.id; // Return the created price ID
  } catch (error) {
    console.error("Error creating price ID:", error.message);
    throw error;
  }
}
