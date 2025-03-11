import IBaseError from "../errors/baseError";

export default interface IGenericResponse<T> {
    isSuccess: boolean;
    data: T;
    message: string;
    errors: IBaseError[];
}