import { fetchAllFeedPostsAction, fetchProfileAction } from "@/actions";
import Feed from "@/components/feed";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";

async function FeedPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  if (!profileInfo) redirect("/onboard");

  try {
    const allFeedPosts = await fetchAllFeedPostsAction();

    return (
      <Feed
        allFeedPosts={allFeedPosts}
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
      />
    );
  } catch (error) {
    console.error("Error fetching feed posts:", error);
    // Handle error or fallback logic
    return null; // or return an error component
  }
}

export default FeedPage;
