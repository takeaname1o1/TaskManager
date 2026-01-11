import { useState } from "react";
import { createTask } from "../api/task.api";

export default function AddTaskModal({ onTaskAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  // Helper functions for date buttons
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getTomorrowDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setPriority = (level) => {
    setFormData((prev) => ({ ...prev, priority: level }));
  };

  const setDate = (dateString) => {
    setFormData((prev) => ({ ...prev, dueDate: dateString }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (formData.title.trim().length < 3) return;

    await createTask(formData);
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
    onTaskAdded();
  };

  // Styles for the pill buttons to match the image
  const pillStyle = {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "20px",
    border: "2px solid transparent", // Default border
    cursor: "pointer",
    textAlign: "center",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s",
  };

  // Colors based on the image
  const colors = {
    low: "#86efac", // Green
    medium: "#fcd34d", // Yellow
    high: "#fca5a5", // Red
    blue: "#93c5fd", // Blue (for Today)
    green: "#86efac", // Green (for Tomorrow)
  };

  const getActiveStyle = (isSelected) => ({
    border: isSelected ? "2px solid #1f2937" : "2px solid transparent", // Dark border if selected
    transform: isSelected ? "scale(1.02)" : "scale(1)",
  });

  return (
    <div className="modern-card">
      <form onSubmit={submit} className="task-form">
        {/* Title Input */}
        <div className="input-group">
          <input
            name="title"
            className="input-primary"
            style={{ fontSize: "1.1rem", padding: "1rem" }}
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            required
            autoFocus
          />
        </div>

        {/* Description Input */}
        <div className="input-group">
          <input
            name="description"
            className="input-primary"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (Optional)"
          />
        </div>

        {/* Priority and Due Date Row */}
        <div className="form-row">
          {/* Priority Section */}
          <div className="input-group">
            <label>Priority</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setPriority("Low")}
                style={{
                  ...pillStyle,
                  backgroundColor: colors.low,
                  ...getActiveStyle(formData.priority === "Low"),
                }}
              >
                Low
              </button>
              <button
                type="button"
                onClick={() => setPriority("Medium")}
                style={{
                  ...pillStyle,
                  backgroundColor: colors.medium,
                  ...getActiveStyle(formData.priority === "Medium"),
                }}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority("High")}
                style={{
                  ...pillStyle,
                  backgroundColor: colors.high,
                  ...getActiveStyle(formData.priority === "High"),
                }}
              >
                High
              </button>
            </div>
          </div>

          {/* Due Date Section */}
          <div className="input-group">
            <label>Due Date</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setDate(getTodayDate())}
                style={{
                  ...pillStyle,
                  backgroundColor: colors.blue,
                  ...getActiveStyle(formData.dueDate === getTodayDate()),
                }}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDate(getTomorrowDate())}
                style={{
                  ...pillStyle,
                  backgroundColor: colors.green,
                  ...getActiveStyle(formData.dueDate === getTomorrowDate()),
                }}
              >
                Tomorrow
              </button>
              
              {/* Custom Date Picker */}
              <input
                type="date"
                name="dueDate"
                className="input-primary"
                style={{ 
                   flex: 1.5, // Make this slightly wider
                   borderRadius: "20px", 
                   padding: "0.4rem 1rem",
                   fontSize: "0.85rem"
                }}
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-submit">
          Add Task
        </button>
      </form>
    </div>
  );
}