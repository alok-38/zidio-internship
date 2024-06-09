import { signInWithRedirect } from "firebase/auth";
import { FaChevronRight } from "react-icons/fa";
import { auth } from "../config/firebase.config";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const AuthButtonWithProvider = ({ Icon, label, provider }) => {
  const handleClick = async () => {
    try {
      switch (provider) {
        case "GitHubAuthProvider":
          const githubProvider = new GithubAuthProvider();
          githubProvider.addScope("repo"); // Add any necessary scopes
          await signInWithRedirect(auth, githubProvider);
          break;
        default:
          // For Google authentication or any other provider
          await signInWithRedirect(auth, new GoogleAuthProvider());
          break;
      }
    } catch (error) {
      console.error("Error signing in with provider:", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md"
    >
      <Icon className="text-txtPrimary text-xl group-hover:text-white" />
      <p className="text-txtPrimary text-lg group-hover:text-white">{label}</p>
      <FaChevronRight className="text-txtPrimary text-base group-hover:text-white" />
    </div>
  );
};

export default AuthButtonWithProvider;
