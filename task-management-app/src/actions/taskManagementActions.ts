import { AxiosResponse } from "axios";
import IResponse from "../models/response/response";
import ITaskCard from "../models/task/taskCard";
import { taskManagementService } from "./connections";
import ITask from "../models/task/task";

export default class TaskManagementActions {

    public GetTaskCards(projectId: string): Promise<IResponse<ITaskCard[]>> {
        return taskManagementService.get<IResponse<ITaskCard[]>>(`Tasks/GetTaskCardByProjectId?projectId=${projectId}`)
            .then((response: AxiosResponse<IResponse<ITaskCard[]>>) => response.data);
            
    }

    public CreateTask(task: ITask): Promise<IResponse<boolean>> {
        return taskManagementService.post<IResponse<boolean>, ITask>(`Tasks`, task)
            .then((response: AxiosResponse<IResponse<boolean>>) => response.data);
    }

    public UpdateTaskState(id: string, task: ITask): Promise<IResponse<boolean>> {
        return taskManagementService.patch<IResponse<boolean>, ITask>(`Tasks/${id}`, task)
            .then((response: AxiosResponse<IResponse<boolean>>) => response.data);
    }

    public GetTaskyId(taskId: string): Promise<IResponse<ITask>> {
        return taskManagementService.get<IResponse<ITask>>(`Tasks/${taskId}`)
            .then((response: AxiosResponse<IResponse<ITask>>) => response.data);
            
    }
}