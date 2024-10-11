import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockEmptyProjectDetails } from "../utils/project.utils";
import { IProject, ITask } from "../models/models";
import { asyncGetProjectDetails, asyncUpdateTaskStatus } from "./project-thunk";

interface IProjectInitialState {
	projectDetailsLoading: boolean;
	projectDetails: IProject;
}

const initialState: IProjectInitialState = {
	projectDetailsLoading: true,
	projectDetails: mockEmptyProjectDetails,
};

export const projectDetailsSlice = createSlice({
	name: "projectDetails",
	initialState,
	reducers: {
		getTasks: (state) => state,
		updateTaskStatus: (
			state: any,
			action: PayloadAction<{ task_number: number; status: boolean }>
		) => {
			const { task_number, status } = action.payload;
			const updatedTasks: ITask[] = state.projectDetails.tasks.map(
				(task: ITask) =>
					task.task_number === task_number
						? {
								...task,
								status,
						  }
						: task
			);
			if (state && state?.projectDetails)
				state.projectDetails.tasks = updatedTasks;
		},
		addTask: (state, action: PayloadAction<ITask>) => {
			state.projectDetails.tasks.push(action.payload);
		},
		editTask: (state, action) => {
			state.projectDetails.tasks = state.projectDetails.tasks.map(
				(task) =>
					task.task_number === action.payload.task_number
						? action.payload
						: task
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(asyncUpdateTaskStatus.fulfilled, (state, action) => {})
			.addCase(asyncGetProjectDetails.fulfilled, (state, action: any) => {
				state.projectDetails = action.payload;
				state.projectDetailsLoading = false;
			});
	},
});

export const { getTasks, updateTaskStatus, addTask, editTask } =
	projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
