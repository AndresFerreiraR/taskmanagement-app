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
  setActiveCard: (id: any) => void;
  onDrop: (status: string, position: number) => void;
}

export interface TaskFormProps {
  setTasks: (task: Task[]) => void;
}

export interface TaskCardProps {
  indexCard: number;
  title: string;
  tags: string[];
  setActiveCard: (id: any) => void;
}
