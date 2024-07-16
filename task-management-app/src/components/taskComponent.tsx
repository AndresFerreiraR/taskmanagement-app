import React, { useState } from "react";
import { Task } from "./types";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import CheckMark from "../assets/check-mark-button.png";
import DirectHit from "../assets/direct-hit.png";
import Glowingstart from "../assets/glowing-star.png";

const TaskComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  console.log("TASK", tasks);

  return (
    <div>
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
