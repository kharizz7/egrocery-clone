import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");  
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isSignUp, setIsSignUp] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isSignUp 
      ? "http://localhost:3000/api/signup" 
      : "http://localhost:3000/api/signin";
  
    const requestData = isSignUp 
      ? { email, password, username, confirmPassword }  
      : { email, password }; 
  
    try {
      const response = await axios.post(url, requestData);
      console.log("Submitted Data:", requestData);
      console.log(response.data);
      

  
      // Set success message
      setSuccessMessage(isSignUp ? "User created successfully!" : "Sign-in successful!");
  
      // Store token and user data
      if (response.data.token) {
        console.log("Backend Response:", response.data); // Debugging

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);

        console.log("Stored username:", localStorage.getItem("username"));
        console.log("Stored email:", localStorage.getItem("email"));

       

      }
  
      // Navigate to profile page after signup or signin
      setTimeout(() => {
        navigate("/profile");
      }, 1500);  // Short delay to show success message
  
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert(`Error: ${error.response.data.message || error.response.statusText}`);
      } else {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{isSignUp ? "Sign Up" : "Sign In"}</h1>

        {/* Display success message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Show 'Go to Home' button after success */}
        {successMessage && (
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Go to Home
          </button>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setSuccessMessage(""); // Clear message on toggle
              }}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
