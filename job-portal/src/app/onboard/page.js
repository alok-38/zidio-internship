import { currentUser } from "@clerk/nextjs/server";
async function OnBoardPage() {
  //get the auth user from clerk
  const user = await currentUser();

  //fetch the profile info -> either user is candidate / user is recruiter
  return <div>This is our onboard page</div>;
}

export default OnBoardPage;
