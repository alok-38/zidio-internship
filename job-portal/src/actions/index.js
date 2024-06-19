"use server";
import connectToDB from "@/database";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

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
    await connectToDB();
    const result = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error; // Rethrow the error to handle it where fetchProfileAction is called
  }
}
