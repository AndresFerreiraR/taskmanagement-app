export default interface IAuthenticatedUser {
    id: string;
    userName: string;
    fullName: string;
    email: string;
    token: string;
}