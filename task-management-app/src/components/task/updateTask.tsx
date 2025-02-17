import { FC, useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Container,
    Grid,
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

const UpdateTask: FC<UpdateTaskProps> = ({ taskId, users, onClose }) => {

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

    const [taskData, setTasksData] = useState<ITask>(TaskDataInitalState);
    const projectState = useSelector((state: RootState) => state.projectState);
    const taskAction = new TaskManagementActions();

    useEffect(() => {
        getTaskById();
    }, []);

    const getTaskById = async () => {
        const task = await taskAction.GetTaskyId(taskId);
        if (task.isSuccess) {
            setTasksData(task.data);
        }
    };

    const setProjectValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTasksData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

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
                                            label="Apellido"
                                            variant="outlined"
                                            name="surname"
                                            rows={4}
                                            multiline
                                            value={1}
                                            onChange={() => { }}
                                        />
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
                                    <DatePicker
                                        fullWidth
                                        label="Nombre"
                                        variant="outlined"
                                        name="name"
                                        value={1}
                                        onChange={() => { }}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Apellido"
                                        variant="outlined"
                                        name="surname"
                                        multiline
                                        rows={4}
                                        value={1}
                                        onChange={() => { }}
                                    />
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
                            onClick={onClose}
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