import { HashRouter, Route, Routes } from "react-router-dom";
import { BoardComponent } from "./board/board";
import { ProjectDetails } from "./ProjectDetails";
import { mockProjectDetails } from "../utils/project.utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetProjectDetails } from "../redux/project-thunk";
import { Spin } from "antd";

export function ProjectComponent() {
	const dispatch = useDispatch<any>();
	const projectDetails: any = useSelector<any>(
		(state) => state.projectDetails.projectDetails
	);
	const isProjectLoading: any = useSelector<any>(
		(state) => state.projectDetails.projectDetailsLoading
	);
	const [project, setProject]: any = useState({});
	const [tasks, setTasks]: any = useState();

	useEffect(() => {
		dispatch(asyncGetProjectDetails());
	}, []);

	useEffect(() => {
		setProject({ ...projectDetails });
		setTasks([...projectDetails.tasks]);
	}, [projectDetails]);

	return (
		<>
			{isProjectLoading ? (
				<Spin size='large' />
			) : (
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
			)}
		</>
	);
}
