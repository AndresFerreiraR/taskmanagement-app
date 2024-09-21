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

const TableProject = () => {

    const projectAction = new ProjectActions();
    const userSesionState = useSelector((state: RootState) => state.userSesionState);
    const dispatch = useDispatch();

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

    useEffect(() => {
        getProjects();
    }, [filter])


    const getProjects = async () => {
        const response = await projectAction.GetProjectsWithPagination(filter);
        console.log("Se supone que hizo el request desde tabla y la respuesta es", response);
        if (response && response.isSuccess) {
            console.log("entro al if", response)
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
                            <TableRow key={project.name}>
                                <TableCell align="left">{project.name}</TableCell>

                                <Hidden mdDown>
                                    <TableCell align="left">{project.description}</TableCell>
                                    <TableCell align="left">{project.assignedTo}</TableCell>
                                    <TableCell align="left">{project.createdBy}</TableCell>
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