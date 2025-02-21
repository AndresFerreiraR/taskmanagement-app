import IProject from "../../../models/projects/project";
import IAuthenticatedUser from "../../../models/users/IAuthenticatedUser";



export interface ISesionUserState {
    user: IAuthenticatedUser;
    authenticated: boolean;
}

export interface ISnackbarState {
    open: boolean;
    message: string;
}

export interface IProjectState{
    project: IProject;
    projectActive: boolean
}

export interface IGlobalState {
    userSesionState: ISesionUserState;
    snackbarState: ISnackbarState;
    projectState: IProjectState;
}