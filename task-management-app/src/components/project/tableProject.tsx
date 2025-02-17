import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import React, { useEffect, useState } from "react";
import ProjectActions from "../../actions/projectActions";
import IFilterProjectPagination from "../../models/projects/filerProjectPagination";
import IResponsePagination from "../../models/response/responsePagination";
import IProject from "../../models/projects/project";
import IBaseError from "../../models/errors/baseError";
import { openSnackbar } from "../../context/reducers/snackbarReducer";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Hidden, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import { setProject } from "../../context/reducers/projectReducer";
import { useNavigate } from "react-router-dom";
import UserActions from "../../actions/userActions";
import IUser from "../../models/users/IUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Style from "../../common/styles/style";
import UpdateProject from "./updateProject";

const TableProject = () => {

    const projectAction = new ProjectActions();
    const userSesionState = useSelector((state: RootState) => state.userSesionState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userAction = new UserActions();

    const filters: IFilterProjectPagination = {
        pageNumber: 1,
        pageSize: 5,
        userIdCreated: userSesionState.user.id
    }

    const dataPagination: IResponsePagination<IProject[]> = {
        data: [] as IProject[],
        errors: [] as IBaseError[],
        hasNextPage: false,
        hasPreviousPage: false,
        isSuccess: false,
        message: '',
        pageNumber: 0,
        totalCount: 0,
        totalPages: 0
    };

    const initialStateproject: IProject = {
        id: '',
        assignedTo: '',
        createdBy: '',
        description: '',
        name: ''
    }

    const [filter, setFilter] = useState<IFilterProjectPagination>(filters);
    const [data, setData] = useState<IResponsePagination<IProject[]>>(dataPagination);
    const [users, setUsers] = useState<IUser[]>([]);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [projectData, setprojectData] = useState<IProject>(initialStateproject);

    useEffect(() => {
        getProjects();
        getAllUsers();
    }, [filter, openEdit])

    const getAllUsers = async () => {
        const user = await userAction.GetAllUsers();
        if (user.isSuccess) {
            setUsers(user.data);
        }
    }

    const getProjects = async () => {
        const response = await projectAction.GetProjectsWithPagination(filter);
        if (response && response.isSuccess) {
            setData(response);
            console.log("valor del dispatch", response.data)
        } else {
            console.log("NO se que mierda estoy haciendo");
            dispatch(openSnackbar("Hubo errores al cargar los proyectos"));
        }
    }

    const handlePageChange = (event: unknown, newPage: number) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            pageNumber: newPage + 1,
        }));
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            pageSize: parseInt(event.target.value, 10),
            pageNumber: 1,
        }));
    };

    const handleRowClic = (project: IProject) => {
        console.log(project)
        dispatch(setProject(project));
        navigate('/task/Dashboard');
    }

    const getUserName = (userId: string): string => {
        const user = users.find((u) => u.id === userId); // Busca el usuario por ID
        return user ? `${user.firstName} ${user.lastName}` : "Desconocido"; // Devuelve el nombre o "Desconocido"
    };

    const handleDeleteProject = (project: IProject) => {
        setprojectData(project);
        setOpen(true);
    }

    const handleUpdateProject = (project: IProject) => {
        setprojectData(project);
        setOpenEdit(true);
    }

    const deleteProjectAction = async (id: string) => {
        const response = await projectAction.DeleteProject(id);
        if (response.isSuccess) {
            dispatch(openSnackbar("Proyecto elimiando correctamente"));
            getProjects();
        }
        else {
            dispatch(openSnackbar("Error al eliminar el proyecto"));
        }
        setprojectData(initialStateproject);
        setOpen(false)
    }

    return (
        <div style={{ padding: "100px", width: "100%" }}>
            {/* <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Grid item xs={12} md={6} sm={4}>
          <TextField
            fullWidth
            name="textSearchCourse"
            variant="outlined"
            label="Busca tu curso"
            onChange={e => setTextSearchCourse(e.target.value)}
          />
        </Grid>
      </Grid> */}
            <div style={Style.paperTable}>
                <Typography component="h1" variant="h5">
                    Proyectos
                </Typography>
            </div>
            <TableContainer component={Paper}>
                <Table className="primary">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Proyecto</TableCell>
                            <Hidden mdDown>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Asignado A</TableCell>
                                <TableCell align="left">Creado Por</TableCell>
                            </Hidden>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((project) => (
                            <TableRow
                                key={project.id}
                                onClick={() => handleRowClic(project)}
                                style={{ cursor: "pointer" }}
                            >
                                <TableCell align="left">{project.name}</TableCell>
                                <Hidden mdDown>
                                    <TableCell align="left">{project.description}</TableCell>
                                    <TableCell align="left">{getUserName(project.assignedTo)}</TableCell>
                                    <TableCell align="left">{getUserName(project.createdBy)}</TableCell>
                                </Hidden>
                                <TableCell align="center">
                                    <Tooltip title={`Editar`} arrow>
                                        <IconButton 
                                            color="primary" 
                                            aria-label="edit task"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleUpdateProject(project);
                                            }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={`Eliminar`} arrow>
                                        <IconButton
                                            color="primary"
                                            aria-label="delete"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleDeleteProject(project);
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.totalCount}
                page={data.pageNumber - 1}
                onPageChange={handlePageChange}
                rowsPerPage={5}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            <Dialog maxWidth='sm' open={open} onClose={() => setOpen(false)}>
                <DialogTitle id="alert-dialog-title">
                    {"Se eliminara un proyecto"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta seguro de eliminar el proyecto <strong>{projectData.name}</strong>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => deleteProjectAction(projectData.id)} color="primary">Aceptar</Button>
                    <Button onClick={() => setOpen(false)} color="primary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog maxWidth='lg' open={openEdit} onClose={() => setOpenEdit(false)}>
                <UpdateProject projectId={projectData.id} users={users} onClose={() => setOpenEdit(false)}/>
            </Dialog>
        </div>
    )
}

export default TableProject;