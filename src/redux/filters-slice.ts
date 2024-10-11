import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
	name: "filters",
	initialState: {
		tags: [],
		user: [],
	},
	reducers: {
		getFilters: (state) => state,
	},
});

export const { getFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
