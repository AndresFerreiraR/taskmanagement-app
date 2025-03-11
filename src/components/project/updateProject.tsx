import { FC, useEffect, useState } from "react";
import IProject from "../../models/projects/project";
import { Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Style from "../../common/styles/style";
import ProjectActions from "../../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import { openSnackbar } from "../../context/reducers/snackbarReducer";
import { UpdateProjectProps } from "../types";
import { useNavigate } from "react-router-dom";

const UpdateProject : FC<UpdateProjectProps> = ({users, projectId, onClose }) => {

    const userSesionState = useSelector((state: RootState) => state.userSesionState);

    const inputStateValues: IProject = {
        name: '',
        description: '',
        assignedTo: '',
        createdBy: userSesionState.user.id,
        id: "00000000-0000-0000-0000-000000000000"
    }

    const [project, setProject] = useState<IProject>(inputStateValues);
    const projectAction = new ProjectActions();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        getProjectByid();
    }, [])

    const getProjectByid = async () => {
        const project = await projectAction.GetProjectById(projectId);
        if (project.isSuccess) {
            setProject(project.data);
        }
    }

    const setProjectValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProject((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const setUserCreate = async () => {
        setProject((previous) => ({
            ...previous,
            createdBy: userSesionState.user.id
        }));
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await setUserCreate()
        const result = await projectAction.EditProject(project)
        if (result.isSuccess) {
            console.log();
            dispatch(openSnackbar("Proyecto editado correctamente"));
            onClose()
            navigate('/');
        }else{
            dispatch(openSnackbar("No fue posible editar el proyecto"));
        }

    };

    return (
        <Container maxWidth="md">
            <div style={Style.paperUpdate}>
                <Typography component="h1" variant="h5">
                    Editar Proyecto
                </Typography>
            </div>
            <form style={Style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            variant="outlined"
                            name="name"
                            value={project.name}
                            onChange={setProjectValues}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Descripcion"
                            variant="outlined"
                            name="description"
                            value={project.description}
                            onChange={setProjectValues}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            select
                            label="Asignar usurio"
                            value={project.assignedTo}
                            onChange={(event) => {
                                setProject((previous) => ({
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            disabled
                            variant="outlined"
                            select
                            label="Asignar usurio"
                            value={project.createdBy}
                            onChange={(event) => {
                                setProject((previous) => ({
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
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default UpdateProject;