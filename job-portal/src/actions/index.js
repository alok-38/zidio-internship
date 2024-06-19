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
    throw error;
  }
}

// Fetch profile action
export async function fetchProfileAction(id) {
  try {
    await connectToDB();
    const result = await Profile.findOne({ userId: id });
    return result; // No need to JSON.parse since Mongoose returns plain JavaScript objects
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}

// Update profile action
export async function updateProfileAction(id, updatedData) {
  try {
    await connectToDB();
    const result = await Profile.findOneAndUpdate({ userId: id }, updatedData, {
      new: true,
    });
    return result; // No need to JSON.parse since Mongoose returns plain JavaScript objects
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
}

// Function to create a price ID based on amount
export async function createPriceIdAction({ amount }) {
  try {
    const price = await stripeInstance.prices.create({
      unit_amount: amount,
      currency: "usd", // Example currency (adjust as needed)
      recurring: { interval: "year" }, // Example recurring interval (adjust as needed)
    });
    return price.id;
  } catch (error) {
    console.error("Error creating price ID:", error.message);
    throw error;
  }
}
