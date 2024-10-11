import { configureStore } from "@reduxjs/toolkit";
import projectDetailsReducer from "./project-slice";
import filtersReducer from "./filters-slice";

export default configureStore({
	reducer: {
		projectDetails: projectDetailsReducer,
		filters: filtersReducer,
	},
});
