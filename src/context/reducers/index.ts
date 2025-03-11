import { configureStore } from "@reduxjs/toolkit";
import userSesionReducer from "./userSesionReducer";
import snackbarReducer from "./snackbarReducer";
import projectReducer from "./projectReducer"

const store = configureStore({
  reducer: {
    userSesionState: userSesionReducer,
    snackbarState: snackbarReducer,
    projectState: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;