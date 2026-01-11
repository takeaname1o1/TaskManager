import Task from "../model.js";

/**
 * Create a new Task
 */
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    
    console.log(`[SUCCESS] Task Created: ${task._id}`);
    res.status(201).json(task);
  } catch (error) {
    console.error(`[ERROR] Create Task failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get All Tasks (Sorted by newest first)
 */
// Example of better utilization in task.controller.js
export const getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const query = {};

    // Utilize the indexes by allowing filtering
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Single Task by ID
 */
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);

    if (!task) {
      console.warn(`[WARN] Task not found: ${id}`);
      return res.status(404).json({ message: "Task not found" });
    }

    console.log(`[SUCCESS] Task Found: ${id}`);
    res.json(task);
  } catch (error) {
    console.error(`[ERROR] Invalid Task ID format: ${id}`);
    res.status(400).json({ message: "Invalid Task ID" });
  }
};

/**
 * Update Task by ID
 */
export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      console.warn(`[WARN] Update failed - Task not found: ${id}`);
      return res.status(404).json({ message: "Task not found" });
    }

    console.log(`[SUCCESS] Task Updated: ${id}`);
    res.json(task);
  } catch (error) {
    console.error(`[ERROR] Update Task failed for ${id}: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete Task by ID
 */
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      console.warn(`[WARN] Delete failed - Task not found: ${id}`);
      return res.status(404).json({ message: "Task not found" });
    }

    console.log(`[SUCCESS] Task Deleted: ${id}`);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(`[ERROR] Delete Task failed for ${id}: ${error.message}`);
    res.status(400).json({ message: "Invalid Task ID" });
  }
};