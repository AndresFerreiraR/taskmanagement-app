import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import CheckMark from "../../../assets/check-mark-button.png";
import ToDoIcon from "../../../assets/ToDoIcon.png";
import ProgressIcon from "../../../assets/task-progress-1.png";

import './TaskComponent.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../context/reducers";
import IUser from "../../../models/users/IUser";
import ITaskCard from "../../../models/task/taskCard";
import UserActions from "../../../actions/userActions";
import TaskManagementActions from "../../../actions/taskManagementActions";
import { openSnackbar } from "../../../context/reducers/snackbarReducer";
import ITask from "../../../models/task/task";

const TaskComponent = () => {
  const projectState = useSelector((state: RootState) => state.projectState);
  const userAction = new UserActions();
  const taskAction = new TaskManagementActions();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [tasksCards, setTasksCards] = useState<ITaskCard[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const dispatch = useDispatch();


  function onChangeActiveCard(value: string) {
    setActiveCard(value)
  }

  function onDrop(status: string) {
    if (activeCard === null || activeCard === undefined) return
    // const taskToMove = tasks[activeCard];

    // const updatedTasks = tasks.filter((_, index) => index !== activeCard)

    const card = tasksCards.find(x => x.id === activeCard);
    console.log(`Esta es la card`, card)
    if (card?.state !== status) {
        console.log('Otra vez', card);
      if (card?.assignedTo === "00000000-0000-0000-0000-000000000000") {
        dispatch(openSnackbar("No es posible cambiar de estado hasta que no se asigne un usaurio a la tarea."));
      }
      else {
        UpdateTaskState(status, card)
        getTasksCardsByProjectId();
      }
    }


    // updatedTasks.splice(position, 0, {
    //   ...taskToMove,
    //   status
    // });

    // setTasks(updatedTasks);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    getAllUsers();
    getTasksCardsByProjectId();
  }, [tasks]);


  const getAllUsers = async () => {
    const user = await userAction.GetAllUsers();
    if (user.isSuccess) {
      setUsers(user.data);
    }
  }

  const getTasksCardsByProjectId = async () => {
    const idProject = projectState.project.id ?? '';
    const cards = await taskAction.GetTaskCards(idProject);
    if (cards.isSuccess) {
      setTasksCards(cards.data)
    }
  }

  const UpdateTaskState = async (state: string, card?: ITaskCard) => {
    const taskvalues: ITask = {
      taskId: '',
      id: '',
      state: state
    }
    if (card !== undefined) {
      console.log("va al back a cambiar el estado");
      const cardstate = await taskAction.UpdateTaskState(card.id, taskvalues);
      if (cardstate.isSuccess) {
        getTasksCardsByProjectId();
      }
    }
  }

  return (
    <div className="task">
      <TaskForm setTasks={setTasks} />
      <main className="task_main">
        <TaskColumn
          name="ToDo"
          image={ToDoIcon}
          tasksCard={tasksCards}
          users={users}
          status="ToDo"
          setActiveCard={onChangeActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          name="In Progress"
          image={ProgressIcon}
          tasksCard={tasksCards}
          users={users}
          status="InProgress"
          setActiveCard={onChangeActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          name="Done"
          image={CheckMark}
          tasksCard={tasksCards}
          users={users}
          status="Done"
          setActiveCard={onChangeActiveCard}
          onDrop={onDrop}
        />
      </main>
    </div>
  );
};

export default TaskComponent;
