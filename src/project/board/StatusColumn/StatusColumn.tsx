import { FloatButton } from "antd";
import { TaskComponent } from "../task/task";
import "./status.css";
import { PlusOutlined } from "@ant-design/icons";
import { ITask } from "../../../models/models";
import { DragEvent, useRef } from "react";

export function StatusColumnComponent({
	status,
	tasks,
	updateTaskStatus,
}: {
	status: string;
	tasks: ITask[];
	updateTaskStatus: Function;
}) {
	const columnRef = useRef<HTMLDivElement>(null);
	const tasksListRef = useRef<HTMLDivElement>(null);
	function createTask() {}
	function handleDragEnter(e: any) {
		if (columnRef && columnRef.current) {
			columnRef.current.style.opacity = "0.2";
		}
	}
	function handleDragLeave(e: any) {
		if (columnRef && columnRef.current) {
			columnRef.current.style.opacity = "1";
		}
	}
	function handleDrop(e: DragEvent) {
		e.stopPropagation();
		if (columnRef && columnRef.current) {
			columnRef.current.style.opacity = "1";
		}
		const taskNumber: string = e.dataTransfer.getData("text/html");
		updateTaskStatus(Number(taskNumber), status);
	}

	function handleDragOver(e: any) {
		e.stopPropagation();
		e.preventDefault();
	}
	return (
		<div
			className='status'
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			ref={columnRef}
		>
			<h2>{status}</h2>
			<div ref={tasksListRef}>
				{tasks?.length
					? tasks.map((task: ITask) => (
							<TaskComponent
								key={task?.task_number}
								task={task}
							/>
					  ))
					: ""}
			</div>
			<FloatButton
				icon={<PlusOutlined />}
				onClick={createTask}
			></FloatButton>
		</div>
	);
}
