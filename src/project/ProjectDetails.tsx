import { IProject } from "../models/models";

export function ProjectDetails({ project }: { project: IProject }) {
	return (
		<div>
			Project Details {project.project_name}/{project.project_id}
		</div>
	);
}
