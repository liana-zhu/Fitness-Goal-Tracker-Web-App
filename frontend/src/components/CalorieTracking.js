import React, { useState,useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  PieChart,
} from "lucide-react";
/*
This can be changed a lot.
Automatically calculate meal calories by using macros
Remove food name for drop down (Breakfast, Lunch, Dinner, Snacks)
Color Changes for macros and calories
*/

const CalorieTracking = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] 
  );

  const [dailyEntries, setDailyEntries] = useState([]);

  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Placeholder data for guest
      setDailyEntries([
        {
          id: 1,
          time: "08:30",
          foodName: "Oatmeal with Banana",
          calories: 350,
          protein: 12,
          carbs: 65,
          fat: 6,
        },
        {
          id: 2,
          time: "12:30",
          foodName: "Chicken Salad",
          calories: 450,
          protein: 35,
          carbs: 25,
          fat: 22,
        },
      ]);
    } 
    else {
      fetchUserEntries(userId);
    }
  }, []);

  const fetchUserEntries = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/calories?userId=${userId}`
      );
  
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((entry) => ({
          id: entry.caloriesId,
          time: new Date(entry.caloriesTimestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          foodName: entry.foodName,
          calories: entry.calories,
          protein: entry.protein,
          carbs: entry.carbs,
          fat: entry.fat,
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

      const response = await fetch(`http://localhost:8080/api/calories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calories: formData.calories,
          carbs: formData.carbs,
          fat: formData.fat,
          foodName: formData.foodName,
          protein: formData.protein, 
          userId: localStorage.getItem("userId"),
        }),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setDailyEntries((prev) => [
          ...prev,
          {
            id: newEntry.caloriesId,
            time: new Date(newEntry.caloriesTimestamp).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            foodName: newEntry.foodName,
            calories: newEntry.calories,
            protein: newEntry.protein,
            carbs: newEntry.carbs,
            fat: newEntry.fat,
          },
        ]);
        setFormData({
          foodName: "",
          calories: "",
          protein: "",
          carbs: "",
          fat: "",
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
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const handleEditClick = (entry) => {
    setEditingEntry(entry.id); 
    setEditFormData({
      foodName: entry.foodName || "",
      calories: entry.calories || 0,
      protein: entry.protein || 0,
      carbs: entry.carbs || 0,
      fat: entry.fat || 0,
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

    const response = await fetch(`http://localhost:8080/api/calories/${editingEntry}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    });

    if (response.ok) {
      const updatedEntry = await response.json();
      setDailyEntries((prev) =>
        prev.map((entry) =>
          entry.id === updatedEntry.caloriesId
            ? {
                ...updatedEntry,
                time: new Date(updatedEntry.caloriesTimestamp).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                ),
              }
            : entry
        )
      );

      setEditingEntry(null);
    } else {
      console.error("Failed to update entry");
    }
  };

  const handleEditCancel = () => {
    setEditingEntry(null); 
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/calories/${id}`, {
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
  const fetchEntriesByDate = async (userId, date) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/calories/by-date?userId=${userId}&date=${date}`
      );
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((entry) => ({
          ...entry,
          time: new Date(entry.caloriesTimestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }));
        setDailyEntries(formattedData);
      } else {
        console.error("Failed to fetch entries for the selected date");
      }
    } catch (error) {
      console.error("Error fetching entries for the selected date:", error);
    }
  };
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && selectedDate) {
      fetchEntriesByDate(userId, selectedDate);
    }
  }, [selectedDate]);
  

  // Calculate daily totals
  const dailyTotals = dailyEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Daily Summary</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Calories</p>
            <p className="text-2xl font-bold text-blue-600">
              {dailyTotals.calories}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Protein</p>
            <p className="text-2xl font-bold text-red-600">
              {dailyTotals.protein}g
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Carbs</p>
            <p className="text-2xl font-bold text-yellow-600">
              {dailyTotals.carbs}g
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Fat</p>
            <p className="text-2xl font-bold text-green-600">
              {dailyTotals.fat}g
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Log Food Entry
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter food name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter calories"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Protein"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                name="carbs"
                value={formData.carbs}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Carbs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Fat"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-5 h-5 inline-block mr-1" />
              Add Entry
            </button>
          </div>
        </form>
      </div>

      {/* Today's Entries */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Today's Entries
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Food
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Macros (g)
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
          {new Date(`2024-01-01 ${entry.time}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <input
            type="text"
            name="foodName"
            value={editFormData.foodName}
            onChange={handleEditChange}
            className="w-full border border-gray-300 rounded-md px-2 py-1"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <input
            type="number"
            name="calories"
            value={editFormData.calories}
            onChange={handleEditChange}
            className="w-full border border-gray-300 rounded-md px-2 py-1"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <div className="flex space-x-2">
            <input
              type="number"
              name="protein"
              value={editFormData.protein}
              onChange={handleEditChange}
              className="w-1/3 border border-gray-300 rounded-md px-2 py-1"
            />
            <input
              type="number"
              name="carbs"
              value={editFormData.carbs}
              onChange={handleEditChange}
              className="w-1/3 border border-gray-300 rounded-md px-2 py-1"
            />
            <input
              type="number"
              name="fat"
              value={editFormData.fat}
              onChange={handleEditChange}
              className="w-1/3 border border-gray-300 rounded-md px-2 py-1"
            />
          </div>
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
          {new Date(`2024-01-01 ${entry.time}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {entry.foodName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {entry.calories}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <div className="flex space-x-2">
            <span className="text-red-600">P: {entry.protein}</span>
            <span className="text-yellow-600">C: {entry.carbs}</span>
            <span className="text-green-600">F: {entry.fat}</span>
          </div>
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
    )
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default CalorieTracking;
