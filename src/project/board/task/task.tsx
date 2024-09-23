import { ITask } from "../../../models/models";
import "./task.css";
import { Tag, Card, Avatar } from "antd";

export function TaskComponent({ task }: { task: ITask }) {
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
					{task.assigned_to.user_name.slice(0, 1).toUpperCase()}{" "}
				</Avatar>
				<span style={{ fontSize: "0.75rem", marginLeft: "4px" }}>
					{task.assigned_to.user_name}
				</span>
			</div>
			<div>
				{task.tags.map((tag, index) => (
					<Tag key={index} color='blue'>
						{tag}
					</Tag>
				))}
			</div>
		</Card>
	);
}
