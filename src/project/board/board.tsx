import { FilterComponent } from "./filter/filter";
import { StatusColumnComponent } from "./StatusColumn/StatusColumn";
import "./board.css";
import { ITask, TASK_BOARD } from "../../models/models";
import { mockUsers } from "../../utils/project.utils";
import { useEffect, useState } from "react";

export function BoardComponent({ tasks = [] }: { tasks: ITask[] }) {
	const statusList = Object.values(TASK_BOARD);
	const [statusToTaskMap, setStatusToTask]: any = useState(new Map());
	function separateTaskByStatus() {
		const statusToTask = new Map<string, ITask[]>();
		tasks.forEach((task) => {
			const currentTasks: ITask[] | undefined =
				statusToTask.get(task.status) ?? [];
			currentTasks.push(task);
			statusToTask.set(task.status, currentTasks);
		});
		setStatusToTask(statusToTask);
	}
	useEffect(() => {
		separateTaskByStatus();
	}, []);
	return (
		<div>
			<FilterComponent users={mockUsers} tags={["UI"]} />
			<section className='board-view'>
				{statusList.map((status: any, index: number) => (
					<StatusColumnComponent
						status={status}
						key={index}
						tasks={statusToTaskMap?.get(status) ?? []}
					/>
				))}
			</section>
		</div>
	);
}
