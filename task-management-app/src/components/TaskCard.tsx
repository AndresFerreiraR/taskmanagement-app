import Tag from "./Tag";
import "./TaskCard.css";
import { TaskCardProps } from "./types";

const TaskCard = ({ title, tags }: TaskCardProps) => {
  return (
    <article className="task_card">
      <p className="task_text">{title}</p>

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} name={tag} selectedTag />
          ))}
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
