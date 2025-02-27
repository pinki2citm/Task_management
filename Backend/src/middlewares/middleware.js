const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Log Requests to a File
const logRequests = (req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile(path.join(__dirname, "requests.log"), logMessage, (err) => {
    if (err) console.error("Logging failed:", err);
  });
  next();
};

// Reject Requests if Title Contains "test"
const rejectTestTitle = (req, res, next) => {
  if (req.body?.title?.toLowerCase().includes("test")) {
    return res.status(400).json({ error: "Task title cannot contain 'test'" });
  }
  next();
};

// Forward /tasks Requests to Java Backend
const forwardToJavaBackend = async (req, res) => {
  try {
    const javaBackendUrl = `http://localhost:8080${req.originalUrl}`;
    const method = req.method.toLowerCase();
    const response = await axios({ method, url: javaBackendUrl, data: req.body });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

module.exports = { logRequests, rejectTestTitle, forwardToJavaBackend };
