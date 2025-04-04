// components/Profile.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access user data from Redux store
  const user = useSelector((state) => state.user.user);

  // Redirect to login if user is not found
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Logout function to clear user data
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-center font-bold mb-4">Profile</h1>
        {user ? (
          <>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white p-2 px-4 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
