import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, ChevronDown, Plus, Edit2, Trash2 } from "lucide-react";

const WeightTracking = () => {
    const [formData, setFormData] = useState({
    weight: "",
  });
  
  const [timeframe, setTimeframe] = useState("1M"); // 1W, 1M, 3M, 6M, 1Y, ALL
  const [dailyEntries, setDailyEntries] = useState([]);

  const [weightData, setWeightData] = useState([]);
  const [loadingWeight, setLoadingWeight] = useState(true);

  // Fetch weight data
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

 useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Placeholder data for guest
      setDailyEntries([
        { id: 1, date: "2024-01-01", weight: 170.5 },
        { id: 2, date: "2024-01-02", weight: 170.2 },
      ]);
    } else {
      fetchUserEntries(userId);
    }
  }, []);

  const fetchUserEntries = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/weight?userId=${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((entry) => ({
          id: entry.weightId,
          date: entry.weightTimestamp,
          weight: entry.weightVal,
        }));

        setDailyEntries(formattedData);
      } else {
        console.error("Failed to fetch user entries");
      }
    } catch (error) {
      console.error("Error fetching user entries:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = parseInt(localStorage.getItem("userId"), 10);
      if (!userId) {
        alert("Please log in to add entries.");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/weight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weightVal: parseFloat(formData.weight),
          userId,
        }),
      });

      if (response.ok) {
        const newEntry = await response.json();
        console.log(newEntry.weightTimestamp);
        setDailyEntries((prev) => [
          ...prev,
          {
            id: newEntry.weightId,
            date: newEntry.weightTimestamp,
            weight: newEntry.weightVal,
          },
        ]);
        setFormData({
          weight: "",
        });
        await fetchWeightData();
      } else {
        alert("Failed to add entry.");
      }
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const [editingEntry, setEditingEntry] = useState(null);
  const [editFormData, setEditFormData] = useState({
    weight: "",
  });

  const handleEditClick = (entry) => {
    setEditingEntry(entry.id);
    setEditFormData({
      weight: entry.weight,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    if (!editingEntry) {
      console.error("Error: No entry selected for editing.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:8080/api/weight/${editingEntry}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ weightVal: parseFloat(editFormData.weight) }),
        }
      );
  
      if (response.ok) {
        const updatedEntry = await response.json();
        setDailyEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === updatedEntry.weightId
              ? {
                  ...entry,
                  weight: updatedEntry.weightVal,
                  date: updatedEntry.weightTimestamp, // Ensure updated timestamp is reflected
                }
              : entry
          )
        );
  
        
       
        setEditingEntry(null);
        setEditFormData({ weight: "" });
        await fetchWeightData();
      } else {
        console.error("Failed to update entry");
      }
    } catch (error) {
      console.error("Error editing entry:", error);
    }
  };
  

  const handleEditCancel = () => {
    setEditingEntry(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/weight/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDailyEntries((prev) => prev.filter((entry) => entry.id !== id));
        await fetchWeightData();
      } else {
        console.error("Failed to delete entry.");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Weight</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Weight (lbs)
            </label>
            <input
              type="number"
              step="0.1"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter weight"
              required
            />
          </div>
          <button
            type="submit"
            className="self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log Weight
          </button>
        </form>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weight Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {loadingWeight ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : weightData.length > 0 ? (
              <LineChart
                data={weightData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                />
                <YAxis /> {/* Ensures Y-axis starts at 0 */}
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <div className="text-center text-gray-500">No data available</div>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Entries */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Weight History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight (lbs)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dailyEntries.map((entry) =>
                editingEntry === entry.id ? (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="number"
                        name="weight"
                        step="0.1"
                        value={editFormData.weight}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={handleEditSubmit}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleEditClick(entry)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeightTracking;
