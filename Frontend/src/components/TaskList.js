import React, { useState } from "react";

const TaskList = ({ tasks, updateTask }) => {
  const [showHighPriority, setShowHighPriority] = useState(false);
  const [showDueSoon, setShowDueSoon] = useState(false);

  const today = new Date();
  const next3Days = new Date();
  next3Days.setDate(today.getDate() + 3);

  const filteredTasks = (Array.isArray(tasks) ? tasks : []).filter((task) => {
    const dueDate = new Date(task.due_date);
    if (showHighPriority && task.priority !== "high") return false;
    if (showDueSoon && (dueDate < today || dueDate > next3Days)) return false;
    return true;
  });
  

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Task List</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
      <label>
  <input
    type="checkbox"
    checked={showHighPriority}
    onChange={() => setShowHighPriority(!showHighPriority)}
    className="ml-2"
  />
  Show High Priority
</label>

<label>
  <input
    type="checkbox"
    checked={showDueSoon}
    onChange={() => setShowDueSoon(!showDueSoon)}
    className="ml-2"
  />
  Show Tasks Due Soon
</label>

      </div>

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between p-4 border-b last:border-none"
            >
              <div>
                <strong >{task.title}</strong> - {task.due_date} -{"   "}
                <span className={`text-${task.priority === "high" ? "red" : "gray"}-600`}>
                  {task.priority}
                </span>
              </div>
              <select
                value={task.status}
                onChange={(e) => updateTask(task.id, { status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
