import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";
import AddTaskModal from "../components/AddTaskModal";

import { useTasks } from "../hooks/useTasks";
import { updateTask, deleteTask } from "../api/task.api";
import { logger } from "../utils/logger";

export default function Dashboard() {
  const { tasks, loading, error, fetchTasks } = useTasks();
  
  // FIX 1: Set default state to 'pending' so it shows first on load
  const [activeTab, setActiveTab] = useState("pending");

  // Log whenever tasks change
  useEffect(() => {
    logger.info("Tasks state updated", tasks);
  }, [tasks]);

  const toggleTask = async (task) => {
    try {
      logger.info(`Toggling task: ${task._id}`);
      
      const newStatus = task.status === "Completed" ? "Pending" : "Completed";
      
      await updateTask(task._id, { status: newStatus });
      await fetchTasks(); 
      logger.success("Task toggled and list refreshed");
    } catch (err) {
      logger.error("Toggle failed", err);
    }
  };

  const removeTask = async (id) => {
    try {
      logger.info(`Deleting task: ${id}`);
      await deleteTask(id);
      await fetchTasks();
      logger.success("Task deleted and list refreshed");
    } catch (err) {
      logger.error("Delete failed", err);
    }
  };

  // --- Filtering & Sorting Logic ---
  const filteredTasks = tasks
    .filter((task) => {
      if (activeTab === "completed") return task.status === "Completed";
      if (activeTab === "pending") return task.status === "Pending";
      return true; // 'all'
    })
    // FIX 2: Sort tasks so Pending always appears before Completed
    .sort((a, b) => {
      if (a.status === "Pending" && b.status === "Completed") return -1;
      if (a.status === "Completed" && b.status === "Pending") return 1;
      return 0;
    });

  if (loading) return <Loader />;
  if (error) return <p className="error-msg">Error: {error}</p>;

  return (
    <div className="container">
      <AddTaskModal onTaskAdded={() => {
        logger.success("Modal reported new task added");
        fetchTasks();
      }} />

      <div className="task-list-header">
         <h2>Your Tasks</h2>
      </div>

      {/* --- Tab Controls --- */}
      <div className="tabs-container">
        {/* Pending Button First */}
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>

        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>

        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
      </div>

      {/* Render Filtered Tasks */}
      {filteredTasks.length === 0 ? (
        <p className="empty-state">
          {activeTab === 'all' 
            ? "No tasks found. Try adding one!" 
            : `No ${activeTab} tasks found.`}
        </p>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleTask}
              onDelete={removeTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}