import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/reducers";
import React, { useEffect, useState } from "react";
import ProjectActions from "../../actions/projectActions";
import IFilterProjectPagination from "../../models/projects/filerProjectPagination";
import IResponsePagination from "../../models/response/responsePagination";
import IProject from "../../models/projects/project";
import IBaseError from "../../models/errors/baseError";
import { openSnackbar } from "../../context/reducers/snackbarReducer";
import { Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { setProject } from "../../context/reducers/projectReducer";
import { useNavigate } from "react-router-dom";
import UserActions from "../../actions/userActions";
import IUser from "../../models/users/IUser";

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

    const [filter, setFilter] = useState<IFilterProjectPagination>(filters);
    const [data, setData] = useState<IResponsePagination<IProject[]>>(dataPagination);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getProjects();
        getAllUsers();
    }, [filter])

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
            dispatch(openSnackbar("Current data successful"));
            console.log("valor del dispatch", response.data)
        } else {
            console.log("NO se que mierda estoy haciendo");
        }
    }

    const handlePageChange = (event: unknown, newPage: number) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            pageNumber: newPage + 1, // Las páginas son 0-indexed en MUI, por lo que se suma 1.
        }));
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            pageSize: parseInt(event.target.value, 10),
            pageNumber: 1, // Reinicia a la primera página
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((project) => (
                            <TableRow 
                                key={project.id}
                                onClick={() => handleRowClic(project)}
                                style={{cursor:"pointer"}}
                            >
                                <TableCell align="left">{project.name}</TableCell>
                                <Hidden mdDown>
                                    <TableCell align="left">{project.description}</TableCell>
                                    <TableCell align="left">{getUserName(project.assignedTo)}</TableCell>
                                    <TableCell align="left">{getUserName(project.createdBy)}</TableCell>
                                </Hidden>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.totalCount}
                page={data.pageNumber-1}
                onPageChange={handlePageChange}
                rowsPerPage={5}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    )
}

export default TableProject;