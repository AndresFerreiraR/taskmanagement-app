import { configureStore } from "@reduxjs/toolkit";
import userSesionReducer from "./userSesionReducer";
import snackbarReducer from "./snackbarReducer";

const store = configureStore({
  reducer: {
    userSesionState: userSesionReducer,
    snackbarState: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;