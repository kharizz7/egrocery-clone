import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const AddMobile = () => {
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null); // To store user info fetched from backend

  const token = useSelector((state) => state.user.token); // Get token from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user info from backend using Axios
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.user) {
          setUserInfo(response.data.user); // Set user info in local state
        } else {
          setMessage("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setMessage("Failed to load user.");
      }
    };

    fetchUser();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo || !userInfo.email) {
      setMessage("User info not available.");
      return;
    }

    try {
      // Use Axios to send PUT request to update mobile number
      await axios.put(
        "http://localhost:3000/api/user/mobile", // Backend route for updating mobile
        { email: userInfo.email, mobile }, // Send email and mobile in request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update Redux user data with the new mobile
      dispatch(setUser({ user: { ...userInfo, mobile }, token }));

      setMessage("Mobile number added successfully!");
      setTimeout(() => navigate("/otpinput"), 1000);
    } catch (error) {
      console.error("Error updating mobile:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Add Mobile Number</h2>
        {message && (
          <div className="mb-4 p-2 text-center text-sm text-green-700 bg-green-100 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMobile;
