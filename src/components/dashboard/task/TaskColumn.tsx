import { Fragment } from 'react';
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";
import { TaskColumnProps } from "../../types";

const TaskColumn = ({
  name,
  image,
  tasksCard,
  users,
  status,
  setActiveCard,
  onDrop
}: TaskColumnProps) => {

  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={image} alt="" />
        {name}
      </h2>

      {tasksCard.filter((card) => card.state === status).map((card) => (
        <Fragment key={card.id}>
          <TaskCard taskCard={card} users={users} setActiveCard={setActiveCard} />
          <DropArea onDrop={() => onDrop(status)} />
        </Fragment>
      ))}
      
      {tasksCard.filter((card) => card.state === status).length === 0 && (
        <DropArea onDrop={() => onDrop(status)} />
      )}
    </section>
  );
};

export default TaskColumn;