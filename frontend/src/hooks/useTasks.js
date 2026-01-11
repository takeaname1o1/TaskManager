import { useEffect, useState, useCallback } from "react";
import { getTasks } from "../api/task.api";
import { logger } from "../utils/logger";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches tasks from the backend
   */
  const fetchTasks = useCallback(async () => {
    logger.info("Fetching tasks from backend...");
    
    try {
      // We don't always want to trigger the full-page loader 
      // on refreshes, so we handle loading state carefully.
      const res = await getTasks();
      
      logger.info("Raw API Response:", res);

      // DEBUG: Verify your data structure here. 
      // If using Axios, the data is usually in res.data
      // If your backend sends { tasks: [] }, it would be res.data.tasks
      const fetchedData = res.data?.data || res.data || [];
      
      logger.success(`Successfully fetched ${fetchedData.length} tasks`);
      setTasks(fetchedData);
      setError(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      logger.error("Failed to fetch tasks:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks };
}