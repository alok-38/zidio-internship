"use client";
import { useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";

function Home() {
  const { user, isLoading } = useClerk();
  const profileInfo = null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>{user ? `Welcome, ${user.id}!` : "Guest"}</h1>
      <p>Main Content</p>
    </section>
  );
}

export default Home;
