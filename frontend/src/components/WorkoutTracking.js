import React, { useState } from "react";
import { Calendar, Plus, Edit2, Trash2, Timer, Dumbbell } from "lucide-react";

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

  // Placeholder data
  const workoutHistory = [
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
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Workout entry submitted:", formData);
    setFormData({
      type: "weights",
      name: "",
      sets: "",
      duration: "",
    });
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
      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Log Workout</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Workout Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Type
            </label>
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
          </div>

          {/* Workout Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={
                formData.type === "weights"
                  ? "e.g., Push Day, Leg Day"
                  : "e.g., Treadmill, Swimming"
              }
              required
            />
          </div>

          {/* Conditional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.type === "weights" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Sets
                </label>
                <input
                  type="number"
                  name="sets"
                  value={formData.sets}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Number of sets"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Total workout time"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-5 h-5 inline-block mr-1" />
              Log Workout
            </button>
          </div>
        </form>
      </div>

      {/* Workout History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Workout History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workout
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workoutHistory.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(`${entry.date} ${entry.time}`).toLocaleString(
                        "en-US",
                        {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      {entry.type === "weights" ? (
                        <Dumbbell className="w-4 h-4 mr-2 text-gray-400" />
                      ) : (
                        <Timer className="w-4 h-4 mr-2 text-gray-400" />
                      )}
                      {entry.type === "weights" ? "Weights" : "Cardio"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.sets || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
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

export default WorkoutTracking;
