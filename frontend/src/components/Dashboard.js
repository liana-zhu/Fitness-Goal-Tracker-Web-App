import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { Scale, Utensils, Dumbbell } from "lucide-react";

// TODO Frontend:
// - Add error handling for failed backend calls
// - Add input validation for the view details button clicks (if we keep it)

// TODO Backend:
// - Create REST endpoints:
//   GET /api/dashboard/stats - Returns current weight, calories, workout count
//   GET /api/dashboard/activity - Returns recent activity feed

// Data constants
// TODO Backend: Replace with API response data
// TODO Backend: Ensure proper date/time handling and data validation

// handleViewDetails function
// TODO Frontend: Implement navigation for detailed view
// or remove it if its unnecessary for points
// TODO Backend: Add data retrieval or remove it if its unnecessary for points

const Dashboard = () => {
  // Illustrative Data - Needs to be removed for when the
  // backend imports real data

  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0); // To store workout count for the week
  const [loading, setLoading] = useState(true); // To handle loading state

  const [caloriesData, setCaloriesData] = useState([]);
  const [loadingCalories, setLoadingCalories] = useState(true);

  const [weightData, setWeightData] = useState([]);
  const [loadingWeight, setLoadingWeight] = useState(true);

  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const fetchRecentActivities = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/dash/history?userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setRecentActivities(data);
      } else {
        console.error("Failed to fetch recent activities:", response.statusText);
        setRecentActivities([]);
      }
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      setRecentActivities([]);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  // Render activity icon
  const renderActivityIcon = (type) => {
    switch (type) {
      case "Workout logged":
        return <Dumbbell className="w-5 h-5 text-blue-500" />;
      case "Weight logged":
        return <Scale className="w-5 h-5 text-blue-500" />;
      case "Meal logged":
        return <Utensils className="w-5 h-5 text-blue-500" />;
      default:
        return <Scale className="w-5 h-5 text-blue-500" />;
    }
  };

  // Fetch weekly workout count from the backend
  const fetchWeeklyWorkouts = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found in local storage.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/dash/workout?userId=${userId}`);
      if (response.ok) {
        const count = await response.json();
        setWeeklyWorkouts(count);
      } else {
        console.error("Failed to fetch weekly workouts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching weekly workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyWorkouts();
  }, []); // Fetch data on component mount



  const fetchWeightData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found in local storage.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/dash/weight?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        // Transform the backend response into chart-compatible data
      const formattedData = Object.entries(data).map(([date, weight]) => ({
        date, // Use the date key as-is
        weight: weight || 0, // Ensure weight is not null
      }));
        setWeightData(formattedData);
      } else {
        console.error("Failed to fetch weight data:", response.statusText);
        setWeightData([]);
      }
    } catch (error) {
      console.error("Error fetching weight data:", error);
      setWeightData([]);
    } finally {
      setLoadingWeight(false);
    }
  };

  useEffect(() => {
    fetchWeightData();
  }, []);

  const fetchWeeklyCalories = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found in local storage.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/dash/calories?userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();

        // Transform backend data into chart-friendly format
        const formattedData = Object.entries(data).map(([date, totalCalories]) => ({
          date, // `date` from the backend response (e.g., "2024-12-12")
          totalCalories, // Calories sum for the given date
        }))
        .reverse(); // Reverse the order to show the latest date on the right

        setCaloriesData(formattedData);
      } else {
        console.error("Failed to fetch weekly calories:", response.statusText);
        setCaloriesData([]);
      }
    } catch (error) {
      console.error("Error fetching weekly calories:", error);
      setCaloriesData([]);
    } finally {
      setLoadingCalories(false);
    }
  };

  useEffect(() => {
    fetchWeeklyCalories();
  }, []);

  const SummaryCard = ({ title, value, unit, icon: Icon, data, dataKey, color }) => {
    const chartData = Array.isArray(data) ? data : [];

    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-3xl font-bold" style={{ color: color || "#3B82F6" }}>
              {value}
              <span className="text-lg text-gray-500 ml-1">{unit}</span>
            </p>
          </div>
          <Icon className="w-8 h-8" style={{ color: color || "#3B82F6" }} />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartData.length > 0 ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color || "#3B82F6"}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            ) : (
              <div className="text-center text-gray-500">No data available</div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    );
  };  

  const WorkoutCard = ({ title, value, unit, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {value}
            <span className="text-lg text-gray-500 ml-1">{unit}</span>
          </p>
        </div>
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">Greetings!</h2>
        <p className="text-gray-600 mt-1">Here Are Your Stats</p>
      </div>
      {/* Summary Grid */}
      <div>
        {/* DUMMY DATA FOR FRONTEND/BACKEND IMPLEMENTATION */}
        {/* Weight */}
        <SummaryCard
          title="Weight Trend"
          value={
            loadingWeight
              ? "Loading..."
              : weightData.length > 0
              ? weightData[weightData.length - 1].weight
              : "No Data"
          }
          unit="lbs"
          icon={Scale}
          data={weightData}
          dataKey="weight"
          color="#3B82F6" // Blue for weight
        />
        {/* Calories */}
        <SummaryCard
          title="Calories Trend"
          value={
            loadingCalories
              ? "Loading..."
              : caloriesData.reduce((acc, curr) => acc + curr.totalCalories, 0) || "No Data"
          }
          unit="cals"
          icon={Utensils}
          data={caloriesData}
          dataKey="totalCalories"
          color="#3B82F6"
        />
        {/* Workouts */}
        <WorkoutCard
          title="Weekly Workout"
          value={loading ? "Loading..." : weeklyWorkouts}
          unit="sessions"
          icon={Dumbbell}
        />
      </div>
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        {loadingActivities ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center space-x-3">
                  {renderActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {activity.type}
                    </p>
                    {activity.name && (
                      <p className="text-xs text-gray-500">{activity.name}</p>
                    )}
                    {activity.value && (
                      <p className="text-xs text-gray-500">
                        {activity.value} {activity.type === "Meal logged" ? "calories" : "lbs"}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No recent activity.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
