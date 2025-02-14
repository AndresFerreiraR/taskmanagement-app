import GenericRestService from "./genericRestService";


const USERS_URL = 'http://localhost:5146/api/';
const PROJECT_URL = 'http://localhost:5110/api/';
const TASK_MANAGEMENT_URL = 'http://localhost:5132/api/';

export const userService = new GenericRestService(USERS_URL);
export const projectService = new GenericRestService(PROJECT_URL);
export const taskManagementService = new GenericRestService(TASK_MANAGEMENT_URL);