import TaskCard from "./TaskCard";
import "./TaskColumn.css";
import { TaskColumnProps } from "./types";

const TaskColumn = ({ name, image, tasks, status }: TaskColumnProps) => {
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={image} alt="" />
        {name}
      </h2>

      {tasks.map(
        (task, index) =>
          task?.status === status && (
            <TaskCard key={index} title={task.name} tags={task.tags} />
          )
      )}
    </section>
  );
};

export default TaskColumn;
