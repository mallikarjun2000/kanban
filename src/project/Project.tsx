import { HashRouter, Route, Routes } from "react-router-dom";
import { BoardComponent } from "./board/board";
import { ProjectDetails } from "./ProjectDetails";
import { mockProjectDetails } from "../utils/project.utils";
import { useEffect, useState } from "react";

export function ProjectComponent() {
	const [project, setProject]: any = useState({});
	const [tasks, setTasks]: any = useState();

	useEffect(() => {
		setProject({ ...mockProjectDetails });
		setTasks([...mockProjectDetails.tasks]);
	}, []);

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
