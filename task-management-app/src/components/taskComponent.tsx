import React, { useEffect, useState } from "react";
import { Task } from "./types";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import CheckMark from "../assets/check-mark-button.png";
import DirectHit from "../assets/direct-hit.png";
import Glowingstart from "../assets/glowing-star.png";

const prevTasks: string | null = localStorage.getItem("tasks");
const initialState = prevTasks !== null ? JSON.parse(prevTasks) : [];

const TaskComponent = () => {
  const [tasks, setTasks] = useState<Task[]>(initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn
          name="Section 1"
          image={CheckMark}
          tasks={tasks}
          status="todo"
        />
        <TaskColumn
          name="Section 2"
          image={DirectHit}
          tasks={tasks}
          status="doing"
        />
        <TaskColumn
          name="Section 3"
          image={Glowingstart}
          tasks={tasks}
          status="done"
        />
      </main>
    </div>
  );
};

export default TaskComponent;
