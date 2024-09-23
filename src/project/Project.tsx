import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BoardComponent } from "./board/board";
import { ProjectDetails } from "./ProjectDetails";
import { mockProjectDetails$ } from "../utils/project.utils";
import { IProject } from "../models/models";
import { useEffect, useState } from "react";

export function ProjectComponent() {
	const [project, setProject]: any = useState({});
	const [tasks, setTasks]: any = useState();

	useEffect(() => {
		mockProjectDetails$.then((project: IProject) => {
			setProject(project);
			setTasks(project.tasks);
		});
	}, []);

	return (
		<>
			<BrowserRouter>
				<ProjectDetails project={project} />
				<Routes>
					<Route
						path='/'
						Component={() => <BoardComponent tasks={tasks} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
