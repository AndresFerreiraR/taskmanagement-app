import { useState } from "react";
import Tag from "./Tag";
import "./TaskForm.css";
import { Task, TaskFormProps } from "./types";

const initialData: Task = {
    name: "",
    status: "todo",
    tags: []
}

const TaskForm = ({ setTasks }: TaskFormProps) => {
  const [taskData, setTaskData] = useState<Task>(initialData);

  function handleFormChange(e: any) {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handledSubmit(e: any) {
    e.preventDefault();
    setTasks((prev: Task[]) => {
      return [...prev, taskData];
    });
    setTaskData(initialData)
  }

  function selectTag(tag: string) {
    let newTags = taskData.tags;
    if (!taskData.tags.some((prevTag) => prevTag === tag)) {
      newTags.push(tag);
    } else {
      newTags = newTags.filter((oldTag) => oldTag !== tag);
    }
    setTaskData((prev) => {
      return {
        ...prev,
        tags: newTags,
      };
    });
    console.log(taskData);
  }

  function checkTag(tag: string) {
    return taskData.tags.some((item) => item === tag);
  }

  return (
    <header className="app_header">
      <form onSubmit={handledSubmit}>
        <input
          name="name"
          type="text"
          value={taskData.name}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleFormChange}
        />
        <div className="task_form_bottom_line">
          <div>
            <Tag
              name="Front"
              selectTag={selectTag}
              selectedTag={checkTag("Front")}
            />
            <Tag
              name="Back"
              selectTag={selectTag}
              selectedTag={checkTag("Back")}
            />
            <Tag
              name="Infrastructure"
              selectTag={selectTag}
              selectedTag={checkTag("Infrastructure")}
            />
            <Tag
              name="DevOps"
              selectTag={selectTag}
              selectedTag={checkTag("DevOps")}
            />
          </div>

          <div>
            <select
              className="task_status"
              value={taskData.status}
              onChange={handleFormChange}
              name="status"
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button type="submit" className="task_submit">
            + Add task
          </button>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
