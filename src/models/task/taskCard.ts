export default interface ITaskCard {
    id: string;
    taskId: string;
    name: string;
    assignedTo: string;
    createdBy: string;
    priority: string;
    state: string;
    tags: string[];
}