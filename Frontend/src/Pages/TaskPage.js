import React from "react";
import useTasks from "../hooks/useTasks";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  const { tasks, addTask, updateTask } = useTasks();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} />
    </div>
  );
};

export default TaskPage;
