import { useEffect, useState } from "react";
import { Task } from "../../types";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import CheckMark from "../../../assets/check-mark-button.png";
import DirectHit from "../../../assets/direct-hit.png";
import Glowingstart from "../../../assets/glowing-star.png";

import './TaskComponent.css'

const prevTasks: string | null = localStorage.getItem("tasks");
const initialState = prevTasks !== null ? JSON.parse(prevTasks) : [];

const TaskComponent = () => {
  const [tasks, setTasks] = useState<Task[]>(initialState);
  const [activeCard, setActiveCard] = useState<number | null>(null);


  function onChangeActiveCard(value: any) {
    setActiveCard(value)
  }

  function onDrop(status: string, position: number) {
    if(activeCard === null || activeCard === undefined) return
    const taskToMove = tasks[activeCard];

    const updatedTasks = tasks.filter((_, index) => index !== activeCard)

    updatedTasks.splice(position, 0, {
        ...taskToMove,
        status
    });

    setTasks(updatedTasks);
  }    

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  return (
    <div className="task">
      <TaskForm setTasks={setTasks} />
      <main className="task_main">
        <TaskColumn
          name="Section 1"
          image={CheckMark}
          tasks={tasks}
          status="todo"
          setActiveCard={onChangeActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          name="Section 2"
          image={DirectHit}
          tasks={tasks}
          status="doing"
          setActiveCard={onChangeActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          name="Section 3"
          image={Glowingstart}
          tasks={tasks}
          status="done"
          setActiveCard={onChangeActiveCard}
          onDrop={onDrop}
        />
      </main>
    </div>
  );
};

export default TaskComponent;
