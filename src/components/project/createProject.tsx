import { useEffect, useState } from "react";
import IProject from "../../models/projects/project";
import { Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Style from "../../common/styles/style";
import IUser from "../../models/users/IUser";
import UserActions from "../../actions/userActions";
import ProjectActions from "../../actions/projectActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import { openSnackbar } from "../../context/reducers/snackbarReducer";

const CreateProject = () => {

    const userSesionState = useSelector((state: RootState) => state.userSesionState);

    const inputStateValues: IProject = {
        name: '',
        description: '',
        assignedTo: '',
        createdBy: userSesionState.user.id,
        id: "00000000-0000-0000-0000-000000000000"
    }

    const [project, setProject] = useState<IProject>(inputStateValues);
    const [users, setUsers] = useState<IUser[]>([]);
    const userAction = new UserActions();
    const projectAction = new ProjectActions();
    const dispatch = useDispatch();


    useEffect(() => {
        getAllUsers();
    }, [])

    const setProjectValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProject((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const getAllUsers = async () => {
        const user = await userAction.GetAllUsers();
        if (user.isSuccess) {
            setUsers(user.data);
        }
    }

    const setUserCreate = async () => {
        setProject((previous) => ({
            ...previous,
            createdBy: userSesionState.user.id
        }));
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await setUserCreate()
        const result = await projectAction.CreateProject(project)
        if (result.isSuccess) {
            console.log();
            dispatch(openSnackbar("Project created succesfull"));

        }
        console.log("Los datos del proyecto son", project);
    };

    return (
        <Container maxWidth="md">
            <div style={Style.paper}>
                <Typography component="h1" variant="h5">
                    Crear Proyecto
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
                            defaultValue="assignedTo"
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
                            defaultValue={project.createdBy}
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

export default CreateProject;