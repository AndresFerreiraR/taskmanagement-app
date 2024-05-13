export interface Task {
  name: string;
  status: string;
  tags: string[];
}

export interface TagProps {
  name: string;
  selectTag: (name: string) => void;
  selectedTag: boolean;
}

export interface TaskcolumnProps {
  name: string;
  image: string;
  tasks: {}[];
  status: string;
}

export interface TaskColumnProps {
  name: string;
  image: string;
  tasks: Task[];
  status: string;
}

export interface TaskFormProps {
  setTasks: (task: Task[]) => void;
}

export interface TaskCardProps {
  title: string;
  tags: string[];
}
