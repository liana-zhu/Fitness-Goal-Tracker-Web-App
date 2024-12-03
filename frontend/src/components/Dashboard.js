import React from "react";
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
  const weightData = [
    { date: "11/23", weight: 200 },
    { date: "11/24", weight: 199.5 },
    { date: "11/25", weight: 199 },
    { date: "11/26", weight: 197 },
    { date: "11/27", weight: 196.5 },
    { date: "11/28", weight: 196 },
    { date: "11/29", weight: 198 },
  ];

  const caloriesData = [
    { date: "11/23", totalCalories: 1800 },
    { date: "11/24", totalCalories: 2100 },
    { date: "11/25", totalCalories: 1950 },
    { date: "11/26", totalCalories: 2000 },
    { date: "11/27", totalCalories: 2200 },
    { date: "11/28", totalCalories: 1900 },
    { date: "11/29", totalCalories: 2000 },
  ];

  const workoutData = [
    { date: "Mon", workouts: 1 },
    { date: "Tue", workouts: 0 },
    { date: "Wed", workouts: 1 },
    { date: "Thu", workouts: 0 },
    { date: "Fri", workouts: 1 },
    { date: "Sat", workouts: 0 },
    { date: "Sun", workouts: 0 },
  ];

  const SummaryCard = ({ title, value, unit, icon: Icon, data }) => (
    <div className="bg-white rounded-lg shadow-md p-g flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {value}
            <span className="text-lg text-gray-500 ml-1">{unit}</span>
          </p>
        </div>
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          {/* RIGHT HERE IS WHERE THE HARDCODED DATA IS BEING GRAPHED */}
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={Object.keys(data[0])[1]}
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

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
          title="Current Weight"
          value={weightData[weightData.length - 1].weight}
          unit="lbs"
          icon={Scale}
          data={weightData}
        />
        {/* Calories */}
        <SummaryCard
          title="Today's Calories"
          value={caloriesData[caloriesData.length - 1].totalCalories}
          unit="cals"
          icon={Utensils}
          data={caloriesData}
        />
        {/* Workouts */}
        <WorkoutCard
          title="Weekly Workout"
          value={3}
          unit="sessions"
          icon={Dumbbell}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {/* Activity items - will be populated from backend */}
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center space-x-3">
              <Dumbbell className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Completed Workout
                </p>
                <p className="text-xs text-gray-500">
                  Upper Body Strength Training
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center space-x-3">
              <Scale className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Weight Logged
                </p>
                <p className="text-xs text-gray-500">169.0 lbs</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">This morning</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center space-x-3">
              <Utensils className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Meal Logged</p>
                <p className="text-xs text-gray-500">Lunch - 700 kcal</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
