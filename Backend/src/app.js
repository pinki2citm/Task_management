require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const {rejectTestTitle,logRequests} = require("./middlewares/middleware");

const app = express();
app.use(cors());
app.use(express.json());

// Apply logging middleware globally (Logs all incoming requests)
app.use(logRequests);

// PostgreSQL Connection
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT,
});

// Helper Function: Check if due_date is in the past
const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
};

// Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY due_date ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a Task (Prevent Past Due Dates & Reject "test" in Title)
app.post("/tasks", rejectTestTitle, async (req, res) => {
  const { title, due_date, priority } = req.body;

  if (isPastDate(due_date)) {
    return res.status(400).json({ error: "Due date cannot be in the past." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, due_date, priority) VALUES ($1, $2, $3) RETURNING *",
      [title, due_date, priority]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Task
app.put("/tasks/:id", rejectTestTitle, async (req, res) => {
  const { id } = req.params;
  const { due_date, status } = req.body;

  if (due_date && isPastDate(due_date)) {
    return res.status(400).json({ error: "Due date cannot be in the past." });
  }

  try {
    const result = await pool.query(
      "UPDATE tasks SET due_date = COALESCE($1, due_date), status = COALESCE($2, status) WHERE id = $3 RETURNING *",
      [due_date, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
