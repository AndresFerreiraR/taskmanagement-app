import { Fragment } from 'react';
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";
import { TaskColumnProps } from "../../types";

const TaskColumn = ({
  name,
  image,
  tasks,
  status,
  setActiveCard,
  onDrop,
}: TaskColumnProps) => {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={image} alt="" />
        {name}
      </h2>
      <DropArea onDrop={() => onDrop(status, 0)}/>

      {tasks.map(
        (task, index) =>
          task?.status === status && (
            <Fragment key={index}>
              <TaskCard
                key={index}
                title={task.name}
                tags={task.tags}
                indexCard={index}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status, index + 1)}/>
            </Fragment>
          )
      )}
    </section>
  );
};

export default TaskColumn;
