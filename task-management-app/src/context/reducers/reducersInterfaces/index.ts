import IAuthenticatedUser from "../../../models/users/IAuthenticatedUser";



export interface ISesionUserState {
    user: IAuthenticatedUser;
    authenticated: boolean;
}

export interface ISnackbarState {
    open: boolean;
    message: string,
}

export interface IGlobalState {
    userSesionState: ISesionUserState;
    snackbarState: ISnackbarState;
}
