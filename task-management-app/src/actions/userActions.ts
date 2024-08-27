import ILoginUser from "../models/users/ILoginUser";
import IUser from "../models/users/IUser";
import { userService } from "./connections";
import IResponse from "../models/response/response";
import { AxiosResponse } from "axios";
import IAuthenticatedUser from "../models/users/IAuthenticatedUser";

export default class UserActions {

    public AuthenticateUser(user: ILoginUser): Promise<IResponse<IAuthenticatedUser>> {
        return userService.post<IResponse<IAuthenticatedUser>, ILoginUser>('User/LogUser', user)
            .then((response: AxiosResponse<IResponse<IAuthenticatedUser>>) => response.data);
    }

    public Authenticate(user: ILoginUser): Promise<IResponse<IAuthenticatedUser>> {
        console.log("Data recibida por el action", user)
        return new Promise((resolve) => {
            userService.post<IResponse<IAuthenticatedUser>, ILoginUser>('User/LogUser', user)
                .then((response) => {
                    if (response.data.isSuccess) {
                        console.log("action success", response.data.data)
                    }
                    resolve(response.data);
                }).catch((error) => {
                    resolve(error);
                });
        })
    }

    public GetAllUsers(): Promise<IResponse<IUser[]>> {
        return userService.get<IResponse<IUser[]>>('User')
            .then((response: AxiosResponse<IResponse<IUser[]>>) => response.data);
    }

    public GetUserById(id : string): Promise<IResponse<IUser>> {
        return userService.get<IResponse<IUser>>(`User/${id}`)
            .then((response: AxiosResponse<IResponse<IUser>>) => response.data);
    }
}