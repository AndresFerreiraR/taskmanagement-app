import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAuthenticatedUser from "../../models/users/IAuthenticatedUser";
import { ISesionUserState } from "./reducersInterfaces";


const initialState: ISesionUserState = {
    user: {} as IAuthenticatedUser,
    authenticated: false,
};

const userSlice = createSlice({
    name: "userSesionState",
    initialState,
    reducers: {
        login(state, action: PayloadAction<IAuthenticatedUser>) {
            state.user = action.payload;
            state.authenticated = true;
        },
        logout(state) {
            state.user = {} as IAuthenticatedUser;
            state.authenticated = false;
        },
        updateUser(state, action: PayloadAction<IAuthenticatedUser>) {
            state.user = action.payload;
        },
    },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;