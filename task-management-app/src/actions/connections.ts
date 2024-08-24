import GenericRestService from "./genericRestService";


const USERS_URL = 'http://localhost:5146/api/';

export const userService = new GenericRestService(USERS_URL);