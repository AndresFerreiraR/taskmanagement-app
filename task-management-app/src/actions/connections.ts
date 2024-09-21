import GenericRestService from "./genericRestService";


const USERS_URL = 'http://localhost:5146/api/';
const PROJECT_URL = 'http://localhost:5110/api/'

export const userService = new GenericRestService(USERS_URL);
export const projectService = new GenericRestService(PROJECT_URL);