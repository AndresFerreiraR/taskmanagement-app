import { FC, useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import Style from "../../common/styles/style";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UpdateTaskProps } from "../types";
import ITask from "../../models/task/task";
import TaskManagementActions from "../../actions/taskManagementActions";
import Tag from "../dashboard/task/Tag";
import { useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import IComment from "../../models/task/comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UpdateTask: FC<UpdateTaskProps> = ({ taskId, users, onClose }) => {

    const projectState = useSelector((state: RootState) => state.projectState);
    const userState = useSelector((state: RootState) => state.userSesionState);
    const TaskDataInitalState: ITask = {
        id: '',
        taskId: '',
        tags: [],
        name: '',
        description: '',
        priority: '',
        state: '',
        assignedTo: '',
        createdBy: '',
        projectId: '',
        creationDate: '',
        startDate: '',
        endDate: '',
        originalTimeEstimated: 0,
        remainingTime: 0,
        completedTime: 0,
        comments: [],
    }

    const newComment: IComment = {
        id: '00000000-0000-0000-0000-000000000000',
        date: new Date().toISOString(),
        commentBy: userState.user.id,
        textComment: ''
    };



    const [taskData, setTasksData] = useState<ITask>(TaskDataInitalState);
    const [comments, setComments] = useState<IComment[]>([]);
    const [inputComment, setInputComment] = useState<IComment>(newComment);
    const taskAction = new TaskManagementActions();

    useEffect(() => {
        getTaskById();
    }, []);

    useEffect(() => {
        console.log("lista de comentarios", comments);
    }, [comments]);

    const getTaskById = async () => {
        const task = await taskAction.GetTaskyId(taskId);
        if (task.isSuccess) {
            console.log("Mierda esto es lo que esta llegando", task.data);
            setTasksData(task.data);
            if (task.data != undefined && task.data.comments != undefined && task.data.comments.length > 0) {
                setComments(task.data.comments);
            }
        }
    };

    const setProjectValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTasksData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const setCommentValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputComment((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    const setCommentsCreate = async () => {
        console.log("aqui esta la asignacion", comments) 
        setTasksData((previous) => ({
            ...previous,
            comments: comments
        }));
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await setCommentsCreate();
        e.preventDefault();
        console.log("Los datos de la tarea son", taskData);
        onClose();
    };

    const getUserName = (userId: string): string => {
        const user = users.find((u) => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : "No Asignado";
    };

    const seveComment = () => {
        comments.push(inputComment);
        console.log("Esta es la lista de comentarios en memoria", comments)
        setInputComment(newComment);
    }


    //     let indiceEliminar = ingresos.findIndex(i => i.id === id);
    //   ingresos.splice(indiceEliminar, 1);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editComment, setEditComment] = useState("");

    const handleEditComment = (id: string) => {
        const updatedComments = comments.map((c) =>
            c.id === id ? { ...c, textComment: editComment} : c
        );
        setComments(updatedComments);
        setEditingId(null);
        setEditComment("");
    };

    const handleEdit = (id: string) => {
        setEditingId(id);
        const commendFinde = comments.find(c => c.id === id);
        if(commendFinde != null && commendFinde != undefined && commendFinde.textComment != null){
            setEditComment(commendFinde.textComment);
        }        
    };


    const handleDeleteComment = (id: string) => {
        const indiceEliminar = comments.findIndex(i => i.id === id);
        comments.splice(indiceEliminar, 1);
    }

    return (
        <Container maxWidth="lg">
            <div style={Style.paper}>
                <Typography component="h1" variant="h5">
                    Detalle Tarea
                </Typography>
            </div>
            {/* Contenedor Blanco */}
            <form style={Style.form}>
                <Grid container spacing={2}>
                    {/* Contenedor de la Izquierda */}
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                            {/* Contenedor Rojo: Description */}
                            <Grid item xs={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel-red-content"
                                        id="panel-red-header"
                                    >
                                        <Typography>Información general</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                {taskData?.tags?.map((tag, index) => (
                                                    <Tag key={index} name={tag} selectedTag />
                                                ))}
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Nombre"
                                                    variant="outlined"
                                                    name="name"
                                                    value={taskData.name}
                                                    onChange={setProjectValues}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Descripcion"
                                                    variant="outlined"
                                                    name="description"
                                                    multiline
                                                    rows={4}
                                                    value={taskData.description}
                                                    onChange={setProjectValues}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    select
                                                    label="Estado"
                                                    name="state"
                                                    value={taskData.state}
                                                    onChange={(event) => {
                                                        setTasksData((previous) => ({
                                                            ...previous,
                                                            state: event.target.value
                                                        }))
                                                    }}
                                                >
                                                    <MenuItem value={"ToDo"}>ToDo</MenuItem>
                                                    <MenuItem value={"InProgress"}>In Progress</MenuItem>
                                                    <MenuItem value={"Done"}>Done</MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    select
                                                    label="Prioridad"
                                                    name="priority"
                                                    value={taskData.priority}
                                                    onChange={(event) => {
                                                        setTasksData((previous) => ({
                                                            ...previous,
                                                            priority: event.target.value
                                                        }))
                                                    }}
                                                >
                                                    <MenuItem value={"Low"}>Baja</MenuItem>
                                                    <MenuItem value={"Medium"}>Media</MenuItem>
                                                    <MenuItem value={"High"}>Alta</MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel-red-content"
                                        id="panel-red-header"
                                    >
                                        <Typography>Asignación</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    select
                                                    label="Asignado A"
                                                    value={taskData.assignedTo}
                                                    onChange={(event) => {
                                                        setTasksData((previous) => ({
                                                            ...previous,
                                                            assignedTo: event.target.value
                                                        }))
                                                    }}
                                                >
                                                    {users.map((user) => (
                                                        <MenuItem key={user.id} value={user.id}>
                                                            {`${user.firstName} ${user.lastName}`}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    disabled
                                                    variant="outlined"
                                                    select
                                                    label="Creado Por"
                                                    value={taskData.createdBy}
                                                    onChange={(event) => {
                                                        setTasksData((previous) => ({
                                                            ...previous,
                                                            createdBy: event.target.value
                                                        }))
                                                    }}
                                                >
                                                    {users.map((user) => (
                                                        <MenuItem key={user.id} value={user.id}>
                                                            {`${user.firstName} ${user.lastName}`}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    fullWidth
                                                    disabled
                                                    variant="outlined"
                                                    select
                                                    label="Proyecto"
                                                    name="projectId"
                                                    value={taskData.projectId}
                                                    onChange={(event) => {
                                                        setTasksData((previous) => ({
                                                            ...previous,
                                                            projectId: event.target.value
                                                        }))
                                                    }}
                                                >
                                                    <MenuItem key={projectState.project.id} value={projectState.project.id}>
                                                        {`${projectState.project.name}`}
                                                    </MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel-red-content"
                                        id="panel-red-header"
                                    >
                                        <Typography>Comentarios/Discución</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TextField
                                            fullWidth
                                            multiline
                                            variant="outlined"
                                            placeholder="Escribe un comentario..."
                                            name="textComment"
                                            value={inputComment.textComment}
                                            onChange={setCommentValues}
                                            sx={{ mb: 2 }}
                                        />
                                        <Button variant="contained" onClick={seveComment} fullWidth>
                                            Comentar
                                        </Button>
                                        <List>
                                            {comments.map((comment) => (
                                                <ListItem key={comment.id} sx={{ mt: 2, border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <AccountCircleIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={getUserName(comment.commentBy)}
                                                        secondary={
                                                            <>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {"Hace un Tiempo"}
                                                                </Typography>
                                                                {editingId === comment.id ? (
                                                                    <TextField
                                                                        fullWidth
                                                                        value={editComment}
                                                                        onChange={(e) => setEditComment(e.target.value)}
                                                                        onBlur={() => handleEditComment(comment.id)}
                                                                        autoFocus
                                                                    />
                                                                ) : (
                                                                    <Typography>{comment.textComment}</Typography>
                                                                )}
                                                            </>
                                                        }
                                                    />
                                                    <IconButton onClick={() => handleEdit(comment.id)}>
                                                        <EditIcon color="primary" />
                                                    </IconButton>
                                                    <IconButton onClick={() => {handleDeleteComment(comment.id)}}>
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sx={{ padding: 2 }}>
                        <Grid item xs={12} md={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel-red-content"
                                    id="panel-red-header"
                                >
                                    <Typography>Planeación</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Grid item xs={12} sm={12}>
                                                <DatePicker
                                                    label="Fecha de Creación"
                                                    value={taskData.creationDate ? dayjs(taskData.creationDate, "YYYY-MM-DD") : null}
                                                    onChange={(newValue) =>
                                                        setTasksData((prev) => ({
                                                            ...prev,
                                                            creationDate: newValue ? newValue.format("YYYY-MM-DD") : "",
                                                        }))
                                                    }
                                                    format="DD/MM/YYYY"
                                                    slotProps={{ textField: { fullWidth: true } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <DatePicker
                                                    label="Fecha De Inicio"
                                                    value={taskData.startDate ? dayjs(taskData.startDate) : null}
                                                    onChange={(newValue) =>
                                                        setTasksData((prev) => ({
                                                            ...prev,
                                                            startDate: newValue ? newValue.format("YYYY-MM-DD") : "",
                                                        }))
                                                    }
                                                    format="DD/MM/YYYY"
                                                    slotProps={{ textField: { fullWidth: true } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <DatePicker
                                                    label="Fecha Fin"
                                                    value={taskData.endDate ? dayjs(taskData.endDate) : null}
                                                    onChange={(newValue) =>
                                                        setTasksData((prev) => ({
                                                            ...prev,
                                                            endDate: newValue ? newValue.format("YYYY-MM-DD") : "",
                                                        }))
                                                    }
                                                    format="DD/MM/YYYY"
                                                    slotProps={{ textField: { fullWidth: true } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    label="Tiempo Estimado"
                                                    variant="outlined"
                                                    name="originalTimeEstimated"
                                                    value={taskData.originalTimeEstimated}
                                                    onChange={setProjectValues}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Tiempo Restante"
                                                    type="number"
                                                    variant="outlined"
                                                    name="remainingTime"
                                                    value={taskData.remainingTime}
                                                    onChange={setProjectValues}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Tiempo Completo"
                                                    type="number"
                                                    variant="outlined"
                                                    name="completedTime"
                                                    value={taskData.completedTime}
                                                    onChange={setProjectValues}
                                                />
                                            </Grid>
                                        </LocalizationProvider>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid justifyContent="center">
                    <Grid item xs={12} md={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            style={Style.submit}
                            onClick={handleSubmit}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default UpdateTask;