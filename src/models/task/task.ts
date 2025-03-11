import IComment from "./comment";

export default interface ITask {
    id?: string;
    taskId?: string;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    creationDate?: string;
    originalTimeEstimated?: number;
    remainingTime?: number;
    completedTime?: number;
    createdBy?: string;
    assignedTo?: string;
    projectId?: string;
    state?: string;
    priority?: string;
    comments?: IComment[];
    tags?: string[];
}