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
          date: new Date(entry.weightTimestamp).toISOString().split("T")[0],
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
        setDailyEntries((prev) => [
          ...prev,
          {
            id: newEntry.weightId,
            date: new Date(newEntry.weightTimestamp).toISOString().split("T")[0],
            weight: newEntry.weightVal,
          },
        ]);
        setFormData({
          weight: "",
        });
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
          body: JSON.stringify(editFormData),
        }
      );
  
      if (response.ok) {
        const updatedEntry = await response.json();
        setDailyEntries((prev) =>
          prev.map((entry) =>
            entry.id === updatedEntry.weightId
              ? {
                  ...updatedEntry,
                  date: new Date(updatedEntry.weightTimestamp).toISOString().split("T")[0],
                  weight: updatedEntry.weightVal,
                }
              : entry
          )
        );
        setEditingEntry(null);
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
              value={weight}
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Weight Trend</h2>
          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1W">1 Week</option>
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
              <option value="ALL">All Time</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weightData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  return new Date(date).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  });
                }}
                tick={{ fontSize: 14 }}
                dy={5}
              />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tick={{ fontSize: 14 }}
                dy={-2}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2 }}
              />
            </LineChart>
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
