import { useRef } from "react";
import { ITask } from "../../../models/models";
import "./task.css";
import { Tag, Card, Avatar } from "antd";
import Link from "antd/es/typography/Link";

export function TaskComponent({
	task,
	openEditDetails,
}: {
	task: ITask;
	openEditDetails: Function;
}) {
	const taskRef = useRef<HTMLDivElement>(null);
	function handleDragStart(e: any) {
		if (taskRef && taskRef.current) {
			taskRef.current.style.opacity = "0.4";
			e.dataTransfer.effectAkkiwed = "move";
			e.dataTransfer.setData("text/html", task.task_number);
		}
	}

	function handleDragEnd(e: any) {
		if (taskRef && taskRef.current) {
			taskRef.current.style.opacity = "1";
		}
	}
	return task ? (
		<Card
			className='task'
			hoverable
			draggable
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			ref={taskRef}
		>
			<div className='task-title'>
				<Link href='#' onClick={(e) => openEditDetails(task)}>
					<span>
						{" "}
						#{task?.task_number} {task?.title}
					</span>
				</Link>
			</div>
			<div>
				<Avatar style={{ backgroundColor: "#f56a00" }} size={16}>
					{task?.assigned_to?.user_name.slice(0, 1).toUpperCase()}{" "}
				</Avatar>
				<span style={{ fontSize: "0.75rem", marginLeft: "4px" }}>
					{task.assigned_to?.user_name}
				</span>
			</div>
			<div>
				{task?.tags?.map((tag, index) => (
					<Tag key={index} color='blue'>
						{tag}
					</Tag>
				))}
			</div>
		</Card>
	) : (
		<div></div>
	);
}
