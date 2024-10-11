import { HashRouter, Route, Routes } from "react-router-dom";
import { BoardComponent } from "./board/board";
import { ProjectDetails } from "./ProjectDetails";
import { mockProjectDetails } from "../utils/project.utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function ProjectComponent() {
	const projectDetails: any = useSelector<any>(
		(state) => state.projectDetails.projectDetails
	);
	const [project, setProject]: any = useState({});
	const [tasks, setTasks]: any = useState();

	useEffect(() => {
		setProject({ ...projectDetails });
		setTasks([...projectDetails.tasks]);
	}, [projectDetails]);

	return (
		<>
			<HashRouter>
				<ProjectDetails project={project} />
				<Routes>
					<Route
						path='*'
						Component={() => (
							<BoardComponent
								tasks={tasks}
								projectId={mockProjectDetails.project_id}
							/>
						)}
					/>
				</Routes>
			</HashRouter>
		</>
	);
}
