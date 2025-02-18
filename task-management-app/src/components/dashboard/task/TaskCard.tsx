import Tag from "./Tag";
import "./TaskCard.css";
import { TaskCardProps } from "../../types";
import { Avatar, Card, CardContent, Dialog, IconButton, Tooltip, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import UpdateTask from "../../task/updateTask";


const TaskCard = ({ taskCard, users, setActiveCard }: TaskCardProps) => {
  const [open, setOpen] = useState(false);
  const getUserName = (userId: string): string => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "No Asignado";
  };

  return (
    // <article
    //   className="task_card"
    //   draggable
    //   onDragStart={() => setActiveCard(indexCard)}
    //   onDragEnd={() => setActiveCard(null)}
    // >
    //   <h3 className="task_text">{title}</h3>
    //   <p>Asignado a: {"Andres Ferreira"}</p>
    //   <p>Prioridad: {"Low"}</p>
    //   <div className="task_card_bottom_line">
    //     <div className="task_card_tags">
    //       {tags.map((tag, index) => (
    //         <Tag key={index} name={tag} selectedTag/>
    //       ))}
    //     </div>
    //   </div>
    // </article>

    <React.Fragment>
      <Card
        className="task_card"
        sx={{ p: 2, borderRadius: "16px", boxShadow: 3, maxWidth: 400 }}
        draggable
        onDragStart={() => setActiveCard(taskCard.id)}
        onDragEnd={() => setActiveCard(null)}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Main Content */}
          <div>
            <Typography variant="h6" gutterBottom>
              {taskCard.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Asigna A:</strong> {getUserName(taskCard.assignedTo)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Prioridad:</strong> {taskCard.priority}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Estado:</strong> {taskCard.state}
            </Typography>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              {taskCard.tags.map((tag, index) => (
                <Tag key={index} name={tag} selectedTag />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Tooltip title={`Creado por: ${getUserName(taskCard.createdBy)}`} arrow>
              <Avatar sx={{ bgcolor: "#1976D2", mb: 1, cursor: "pointer" }}>
                <AccountCircleIcon />
              </Avatar>
            </Tooltip>
            <Tooltip title={"Editar"} arrow>
              <IconButton color="primary" aria-label="edit task" onClick={() => setOpen(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
      <Dialog maxWidth='xl' open={open} onClose={() => setOpen(false)}>
        <UpdateTask taskId={taskCard.id} users={users} onClose={() => setOpen(false)} />
      </Dialog>
    </React.Fragment>
  );
};

export default TaskCard;
