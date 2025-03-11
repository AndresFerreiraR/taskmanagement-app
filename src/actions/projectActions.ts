import { AxiosResponse } from "axios";
import IFilterProjectPagination from "../models/projects/filerProjectPagination";
import IProject from "../models/projects/project";
import IResponsePagination from "../models/response/responsePagination";
import { projectService } from "./connections";
import IResponse from "../models/response/response";

export default class ProjectActions {

    public GetProjectsWithPagination(filtro: IFilterProjectPagination): Promise<IResponsePagination<IProject[]>> {
        return projectService.get<IResponsePagination<IProject[]>>(`Project/GetAllPagination/${filtro.pageNumber}/${filtro.pageSize}/${filtro.userIdCreated}`)
            .then((response: AxiosResponse<IResponsePagination<IProject[]>>) => response.data);
    }

    public GetAllProjects(): Promise<IResponse<IProject[]>> {
        return projectService.get<IResponse<IProject[]>>(`Project`)
            .then((response: AxiosResponse<IResponse<IProject[]>>) => response.data);
    }

    public CreateProject(project: IProject): Promise<IResponse<boolean>> {
        return projectService.post<IResponse<boolean>, IProject>(`Project`, project)
            .then((response: AxiosResponse<IResponse<boolean>>) => response.data);
    }

    public DeleteProject(projectId: string): Promise<IResponse<boolean>> {
        return projectService.delete<IResponse<boolean>>(`Project/${projectId}`)
            .then((response: AxiosResponse<IResponse<boolean>>) => response.data);
    }

    public GetProjectById(projectId: string): Promise<IResponse<IProject>> {
        return projectService.get<IResponse<IProject>>(`Project/${projectId}`)
            .then((response: AxiosResponse<IResponse<IProject>>) => response.data);
    }

    public EditProject(project: IProject): Promise<IResponse<boolean>> {
        return projectService.put<IResponse<boolean>, IProject>(`Project`, project)
            .then((response: AxiosResponse<IResponse<boolean>>) => response.data);
    }
}