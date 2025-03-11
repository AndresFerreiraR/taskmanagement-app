
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISnackbarState } from "./reducersInterfaces";


const initialState: ISnackbarState = {
    open: false,
    message: "",
};

const snackbarSlice = createSlice({
    name: "snackbarState",
    initialState,
    reducers: {
        openSnackbar(state, action: PayloadAction<string>) {
            state.open = true;
            state.message = action.payload;
        },
        closeSnackbar(state) {
            state.open = false;
            state.message = "";
        },
    },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;