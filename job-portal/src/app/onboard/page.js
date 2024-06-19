import { currentUser } from "@clerk/nextjs/server";
import OnBoard from "@/components/on-board";
async function OnBoardPage() {
  //get the auth user from clerk
  const user = await currentUser();

  //fetch the profile info -> either user is candidate / user is recruiter
  return <OnBoard />;
}

export default OnBoardPage;
