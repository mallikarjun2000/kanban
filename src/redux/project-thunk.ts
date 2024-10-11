import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTaskStatus } from "./project-slice";
import { mockProjectDetails } from "../utils/project.utils";

export const asyncUpdateTaskStatus = createAsyncThunk(
	"projectDetails/asyncUpdateTaskStatus",
	async ({ task_number, status }: any, thunkAPI) => {
		setTimeout(() => {
			thunkAPI.dispatch(updateTaskStatus({ task_number, status }));
		}, 2000);
		return thunkAPI.getState();
	}
);

export const asyncGetProjectDetails = createAsyncThunk(
	"projectDetails/asyncGetProjectDetails",
	async () => {
		const projectDetailsPromise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(mockProjectDetails);
			}, 5000);
		});
		const projectDetails = await projectDetailsPromise;
		return projectDetails;
	}
);
