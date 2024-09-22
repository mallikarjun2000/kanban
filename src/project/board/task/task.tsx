import { ITask, TAST_STATUS } from "../../../models/models";
import "./task.css";
import { Tag, Card, Avatar } from "antd";

export function TaskComponent() {
	const task: ITask = {
		title: "Work on the Creating Web Page",
		assigned_to: {
			user_email: "John.Doe@gmail.com",
			user_name: "John Doe",
			user_id: 123,
		},
		created_time: new Date(),
		priority: 1,
		project_id: "12334",
		status: TAST_STATUS.READY,
		tags: ["UI", "React.Js"],
		task_number: 41123,
		time_to_complete: 2,
	};
	return (
		<Card className='task' hoverable>
			<div className='task-title'>
				<span>
					{" "}
					#{task.task_number} {task.title}
				</span>
			</div>
			<div>
				<Avatar style={{ backgroundColor: "#f56a00" }} size={16}>
					{task.assigned_to.user_name.slice(1, 2).toUpperCase()}{" "}
				</Avatar>
				<span style={{ fontSize: "0.75rem", marginLeft: "4px" }}>
					{task.assigned_to.user_name}
				</span>
			</div>
			<div>
				{task.tags.map((tag) => (
					<Tag color='blue'>{tag}</Tag>
				))}
			</div>
		</Card>
	);
}
