import ITaskCard from "../models/task/taskCard";
import IUser from "../models/users/IUser";

export interface Task {
  name: string;
  status: string;
  tags: string[];
  id: string;
}

export interface TagProps {
  name: string;
  selectTag: (name: string) => void;
  selectedTag?: boolean;
}

export interface TaskColumnProps {
  name: string;
  image: string;
  tasksCard: ITaskCard[];
  users: IUser[];
  status: string;
  setActiveCard: (id: string) => void;
  onDrop: (status: string) => void;
}

export interface TaskFormProps {
  setTasks: (task: Task[]) => void;
}

export interface TaskCardProps {
  taskCard: ITaskCard;
  users: IUser[];
  setActiveCard: (id: string) => void;
}

export interface UpdateTaskProps {
  users: IUser[];
  taskId: string;
  onClose: () => void 
}


export interface UpdateProjectProps {
  projectId: string;
  users: IUser[];
  onClose: () => void
}