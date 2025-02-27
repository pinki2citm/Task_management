import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (newTask) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const createdTask = await response.json();
        setTasks((prev) => [...prev, createdTask]);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update task status
  const updateTask = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, addTask, updateTask };
};

export default useTasks;
