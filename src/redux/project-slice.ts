import { createSlice } from "@reduxjs/toolkit";
import { mockProjectDetails } from "../utils/project.utils";
import { ITask } from "../models/models";

export const projectDetailsSlice = createSlice({
	name: "projectDetails",
	initialState: {
		ProjectDetailsLoading: false,
		projectDetails: mockProjectDetails,
	},
	reducers: {
		getTasks: (state) => state,
		updateTaskStatus: (state, action) => {
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
			state.projectDetails.tasks = updatedTasks;
		},
		addTask: (state, action) => {
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
});

export const { getTasks, updateTaskStatus, addTask, editTask } =
	projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
