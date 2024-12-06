import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  //***Need to handle when a user uses username or email*** (Handled in back-end)
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          userInput: userInput,
          password: password,
        }),
      });
  
      if (response.ok) {
        const userId = await response.json(); // Extract the userId from the response
        console.log("Login successful! User ID:", userId);
  
        // Store the userId in localStorage
        localStorage.setItem("userId", userId);
  
        // Redirect to the home page
        navigate("/home");
      } else {
        const errorMessage = await response.text();
        console.error("Login failed:", errorMessage);
        alert(errorMessage); // Show the error message to the user
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };  

  const handleGuestAccess = () => {
    navigate("/home");
    /**
     * TODO: Pending implementation
     * - Frontend validation
     * - Form submission functionality
     * Awaiting frontend team implementation
     */
  };

  return (
    <div className="min-h-screen bg-gray-350 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        {/* Sign In Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Username/Email */}
          <div className="relative">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-800"
            >
              Username or Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-5 left-0 pl-0 flex items-center pointer-events-none">
                <div className="flex items-center space-x-0.5">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-400"></span>
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <input
                id="userInput"
                name="userInput"
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-500 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Username or email"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          {/* Guest Access */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleGuestAccess}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Continue as Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
