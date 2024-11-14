import { useAuth } from "../hooks/useAuth";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Handle loading state
  if (loading) {
    return <LoadingIndicator />;
  }

  // If no user is authenticated, show a message
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
        <div className="text-xl text-white">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl relative">
        <div
          onClick={() => navigate(-1)}
          className="absolute right-5 top-5 text-white text-xl bg-red-400 hover:bg-red-600 px-2 py-1 rounded-md cursor-pointer"
        >
          {" "}
          X
        </div>
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            User Profile
          </h2>
        </div>
        <div className="flex flex-col items-center mb-6 space-y-4">
          {/* Profile Picture with Hover Effect */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-md transform transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-white text-5xl font-semibold border-4 border-blue-200 shadow-md">
              {user?.email?.charAt(0).toUpperCase() || "?"}
            </div>
          )}

          {/* User Info */}
          <h3 className="text-2xl font-semibold text-gray-800">
            {user.displayName || "Anonymous User"}
          </h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs mt-2">UID: {user.uid}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() =>
              toast.error(
                "Sorry, you cannot edit your profile at this time. Try again later!"
              )
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transform transition duration-300"
          >
            Edit Profile
          </button>
          <button
            onClick={() => signOut(auth)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transform transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
