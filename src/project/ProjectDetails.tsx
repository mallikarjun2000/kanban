import { Card } from "antd";
import { IProject } from "../models/models";
import "./project-details.css";

export function ProjectDetails({ project }: { project: IProject }) {
	return (
		<Card
			style={{ textAlign: "left", padding: "10px" }}
			className='project-details-container'
		>
			<span>
				<strong>Project Name</strong>: {project.project_name}
			</span>
			<span>
				<strong>Project ID</strong>: {project.project_id}
			</span>
			<span>
				<strong>Created on</strong>:{" "}
				{project.creation_date?.toDateString()}
			</span>
		</Card>
	);
}
