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

      {tasksCard.map(
        (card) =>
          card.state === status && (
            <Fragment>
              <TaskCard
                taskCard={card}
                users={users}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status)} />
            </Fragment>
          )
      )}
    </section>
  );
};

export default TaskColumn;
