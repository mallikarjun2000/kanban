import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BoardComponent } from "./board/board";
import { ProjectDetails } from "./ProjectDetails";
import { mockProjectDetails$ } from "../utils/project.utils";
import { IProject } from "../models/models";
import { useEffect } from "react";

export function ProjectComponent() {
	let mockPDetails: IProject = {} as any;

	useEffect(() => {
		mockProjectDetails$.then((project: any) => {
			mockPDetails = project;
		});
	}, []);

	return (
		<>
			<BrowserRouter>
				<ProjectDetails project={mockPDetails} />
				<Routes>
					<Route path='/' Component={() => <BoardComponent />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
