import DeleteIcon from "../assets/delete.png";
import Tag from "./Tag";
import "./TaskCard.css";

const TaskCard = ({ title, tags }: { title: string; tags: string[] }) => {
  return (
    <article className="task_card">
      <p className="task_text">{title}</p>

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} name={tag} selectedTag/>
          ))}
        </div>
        {/* <div className="task_delete">
          <img className="delete_icon" src={DeleteIcon} alt="" />
        </div> */}
      </div>
    </article>
  );
};

export default TaskCard;
