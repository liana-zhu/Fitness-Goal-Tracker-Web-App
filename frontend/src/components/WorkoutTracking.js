import React, { useState, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  Timer,
  Dumbbell,
} from "lucide-react";


const WorkoutTracking = () => {
  const [formData, setFormData] = useState({
    type: "weights", // 'weights' or 'cardio'
    name: "",
    sets: "",
    duration: "",
  });

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [workoutHistory, setWorkoutHistory] = useState([]);

  const [editingEntry, setEditingEntry] = useState(null);
  const [editFormData, setEditFormData] = useState({
    type: "weights",
    name: "",
    sets: "",
    duration: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setWorkoutHistory([
        {
          id: 1,
          date: "2024-01-05",
          time: "09:30",
          type: "weights",
          name: "Push Day",
          sets: 12,
          duration: 45,
        },
        {
          id: 2,
          date: "2024-01-05",
          time: "16:00",
          type: "cardio",
          name: "Treadmill",
          sets: null,
          duration: 30,
        },
      ]);
    } else {
      fetchWorkoutEntries(userId);
    }
  }, []);

  const fetchWorkoutEntries = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/workout?userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const formattedData = data.map((entry) => ({
          id: entry.workoutId,
          date: entry.workoutTimestamp.split("T")[0],
          time: entry.workoutTimestamp,
          type: entry.workoutType,
          name: entry.workoutName,
          sets: entry.numSets,
          duration: entry.duration,
        }));
        setWorkoutHistory(formattedData);
      } else {
        console.error("Failed to fetch workout entries");
      }
    } catch (error) {
      console.error("Error fetching workout entries:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add workout entries.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId,
          date: selectedDate,
        }),
      });

      if (response.ok) {
        const newEntry = await response.json();
        const formattedEntry = {
          id: newEntry.workoutId, // Make sure this aligns with the actual field
          date: newEntry.workoutTimestamp.split("T")[0],
          time: newEntry.workoutTimestamp,
          type: newEntry.workoutType,
          name: newEntry.workoutName,
          sets: newEntry.numSets,
          duration: newEntry.duration,
        };
  
        // Add the formatted entry to the workout history
        setWorkoutHistory((prev) => [...prev, formattedEntry]);
        setFormData({
          type: "weights",
          name: "",
          sets: "",
          duration: "",
        });
      } else {
        alert("Failed to add workout entry.");
      }
    } catch (error) {
      console.error("Error adding workout entry:", error);
    }
  };

  const handleEditClick = (entry) => {
    setEditingEntry(entry.id);
    setEditFormData({
      type: entry.type,
      name: entry.name,
      sets: entry.sets,
      duration: entry.duration,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:8080/api/workout/${editingEntry}`,
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
      const formattedEntry = {
        id: updatedEntry.workoutId, // Ensure this aligns with the backend's field
        date: updatedEntry.workoutTimestamp.split("T")[0],
        time: updatedEntry.workoutTimestamp,
        type: updatedEntry.workoutType,
        name: updatedEntry.workoutName,
        sets: updatedEntry.numSets,
        duration: updatedEntry.duration,
      };

      // Update the state with the new entry
      setWorkoutHistory((prev) =>
        prev.map((entry) => (entry.id === formattedEntry.id ? formattedEntry : entry))
      );

      // Clear the editing state
      setEditingEntry(null);

    } else {
      console.error("Failed to update workout entry.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/workout/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWorkoutHistory((prev) => prev.filter((entry) => entry.id !== id));
      } else {
        console.error("Failed to delete workout entry.");
      }
    } catch (error) {
      console.error("Error deleting workout entry:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Log Workout</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, type: "weights" }))
              }
              className={`py-2 px-4 rounded-md flex items-center justify-center ${
                formData.type === "weights"
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                  : "bg-gray-50 text-gray-700 border border-gray-300"
              }`}
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Weights
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, type: "cardio" }))
              }
              className={`py-2 px-4 rounded-md flex items-center justify-center ${
                formData.type === "cardio"
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                  : "bg-gray-50 text-gray-700 border border-gray-300"
              }`}
            >
              <Timer className="w-5 h-5 mr-2" />
              Cardio
            </button>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full rounded-md border py-2 px-3"
            placeholder="Workout name"
          />
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            className="block w-full rounded-md border py-2 px-3"
            placeholder="Sets (for weights only)"
          />
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="block w-full rounded-md border py-2 px-3"
            placeholder="Duration (minutes)"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            <Plus className="w-5 h-5 mr-1" />
            Log Workout
          </button>
        </form>
      </div>

      {/* Workout History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Workout History
        </h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Name</th>
              <th>Sets</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workoutHistory.map((entry) =>
              editingEntry === entry.id ? (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.type}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sets"
                      value={editFormData.sets}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="duration"
                      value={editFormData.duration}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditingEntry(null)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.type}</td>
                  <td>{entry.name}</td>
                  <td>{entry.sets || "-"}</td>
                  <td>{entry.duration}</td>
                  <td>
                    <button onClick={() => handleEditClick(entry)}>
                      <Edit2 />
                    </button>
                    <button onClick={() => handleDelete(entry.id)}>
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutTracking;
