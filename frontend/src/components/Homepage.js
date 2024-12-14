import React, { useState, useEffect } from "react";
import {
  Weight,
  Salad,
  Dumbbell,
  LineChart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Dashboard from "./Dashboard";
import WeightTracking from "./WeightTracking";
import CalorieTracking from "./CalorieTracking";
import WorkoutTracking from "./WorkoutTracking";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [username, setUsername] = useState("Guest"); // Default to Guest
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setUsername("Guest"); // Default to Guest if no userId found
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/sidebar/username?userId=${userId}`
        );
        if (response.ok) {
          const fetchedUsername = await response.text();
          setUsername(fetchedUsername);
        } else {
          console.error("Failed to fetch username:", response.statusText);
          setUsername("Guest"); // Fall back to Guest on error
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("Guest");
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    // TODO: Implement logout functionality
    localStorage.removeItem("userId");
    navigate("/signin");
    console.log("Logout clicked");
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      id: "weight",
      label: "Body Weight",
      icon: <Weight className="w-5 h-5" />,
    },
    { id: "calories", label: "Calories", icon: <Salad className="w-5 h-5" /> },
    { id: "workout", label: "Workout", icon: <Dumbbell className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
  className={`fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md transition-all duration-300 ease-in-out hover:bg-gray-100 ${
    isSidebarOpen ? "lg:block" : ""
  }`}
  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
>
  {isSidebarOpen ? (
    <X className="w-6 h-6 text-gray-600 transition-transform duration-200 hover:rotate-90" />
  ) : (
    <Menu className="w-6 h-6 text-gray-600 transition-transform duration-200 hover:scale-110" />
  )}
</button>

{/* Sidebar */}
<div
  className={`fixed inset-y-0 left-0 transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 ease-in-out w-64 bg-white shadow-lg z-40`}
>
  <div className="flex flex-col h-full">
    {/* App Title */}
    <div className="p-6 pt-16 border-b">
      <h1 className="text-2xl font-bold text-gray-800">Fitness Tracker</h1>
      <p className="text-sm text-gray-600">Welcome, {username}!</p>
    </div>

    {/* Navigation Items */}
    <nav className="flex-1 p-4 space-y-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveSection(item.id);
            setIsSidebarOpen(false); // Close the sidebar on selection
          }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
            activeSection === item.id
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>

    {/* Logout Button */}
    <div className="p-4 border-t">
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  </div>
</div>


      {/* Main Content Area */}
      <div
        className={`${
          isSidebarOpen ? "lg:ml-64" : ""
        } min-h-screen transition-all duration-300`}
      >
        <div className="p-8">
          {/* Placeholder Content */}
          {activeSection === "dashboard" ? (
            <Dashboard />
          ) : activeSection === "weight" ? (
            <WeightTracking />
          ) : activeSection === "calories" ? (
            <CalorieTracking />
          ) : activeSection === "workout" ? (
            <WorkoutTracking />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {navItems.find((item) => item.id === activeSection)?.label}
              </h2>
              <p className="text-gray-600">
                Content for{" "}
                {navItems.find((item) => item.id === activeSection)?.label} will
                be displayed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
