import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (title.toLowerCase().includes("test")) {
      setError('Title cannot contain "test".');
      return;
    }
    if (!dueDate) {
      setError("Due date is required.");
      return;
    }
    const today = new Date();
    if (new Date(dueDate) < today) {
      setError("Due date cannot be in the past.");
      return;
    }
    addTask({ title, due_date: dueDate, priority });
    setTitle("");
    setDueDate("");
    setPriority("low");
    setError("");
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
