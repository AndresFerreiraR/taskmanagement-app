import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProject from "../../models/projects/project";
import { IProjectState } from "./reducersInterfaces";

const initialState: IProjectState = {
    project: {} as IProject,
    projectActive: false
};

const projectSlice = createSlice({
    name: "projectState",
    initialState,
    reducers: {
        setProject(state, action: PayloadAction<IProject>) {
            state.project = action.payload;
            state.projectActive = true;
        },
        changeProject(state) {
            state.project = {} as IProject;
            state.projectActive = false;
        }
    }
});

export const { setProject, changeProject } = projectSlice.actions;
export default projectSlice.reducer;