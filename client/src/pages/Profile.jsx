import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import ProfileNav from "./ProfileNav";

export default function Profile() {
  const [logoutRedirect, setLogoutRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // For Logout
  async function handleLogOut() {
    await axios.post("logout");
    setLogoutRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <Spinner />;
  }

  if (ready && !user && !logoutRedirect) {
    return <Navigate to={"/login"} />;
  }

  if (logoutRedirect) {
    return <Navigate to={logoutRedirect} />;
  }

  return (
    <div>
      <ProfileNav />

      {/* For Profile Subheading */}
      {subpage === "profile" && (
        <div className="border-2 flex flex-col border-violet-100 p-5 rounded-md text-center max-w-md mx-auto mt-12">
          <h1 className="text-2xl my-3">Profile Details</h1>
          <hr className="mx-5" />
          <p className="details text-start ms-4 text-xl mt-4">
            Name : <span>{user.name}</span>
            <br />
            Email : <span>{user.email}</span>
          </p>
          <button
            className=" bg-violet-500 py-1 px-2 rounded-full ms-auto text-white "
            onClick={handleLogOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-4 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
              />
            </svg>
          </button>
        </div>
      )}
      {/* For Places Subheading */}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
