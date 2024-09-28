import { FilterComponent } from "./filter/filter";
import { StatusColumnComponent } from "./StatusColumn/StatusColumn";
import "./board.css";
import { ITask, TASK_BOARD } from "../../models/models";
import { mockUsers } from "../../utils/project.utils";
import { useEffect, useState } from "react";

export function BoardComponent({ tasks }: { tasks: ITask[] }) {
	const [newTasks, setNewTasks]: any = useState();
	const [inProgressTasks, setInProgressTasks]: any = useState();
	const [doneTasks, setDoneTasks]: any = useState();
	const [masterList, setMasterList]: any = useState();
	function separateTaskByStatus(list: any) {
		if (list?.length) {
			setNewTasks(
				list.filter((task: ITask) => task.status === TASK_BOARD.NEW)
			);
			setInProgressTasks(
				list.filter(
					(task: ITask) => task.status === TASK_BOARD.IN_PROGRESS
				)
			);
			setDoneTasks(
				list.filter((task: ITask) => task.status === TASK_BOARD.DONE)
			);
		}
	}
	useEffect(() => {
		separateTaskByStatus(tasks);
		setMasterList(tasks);
	}, []);

	useEffect(() => {
		console.log(newTasks, inProgressTasks, doneTasks, "re-rendered");
	});

	// ------------------------------- SECTION TOBE INVESTIGATED ---------------------- //

	// const statusList = Object.values(TASK_BOARD);
	// const [statusToTaskMap, setStatusToTask]: any = useState({});
	// const [masterTasks, setList]: any = useState([]);
	// function updateStatusToTask() {
	// 	if (masterTasks && masterTasks.length) {
	// 		const statusList = Object.values(TASK_BOARD);
	// 		const map: any = {};
	// 		for (let status of statusList) {
	// 			map[status] = masterTasks.filter(
	// 				(task: ITask) => task.status === status
	// 			);
	// 		}
	// 		setStatusToTask({
	// 			...map,
	// 		});
	// 	}
	// }
	// useEffect(() => {
	// 	if (tasks) {
	// 		setList([...tasks]);
	// 		updateStatusToTask();
	// 		console.log("useEffect - Board component", masterTasks);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	console.log(masterTasks, "use Effect - loop", "");
	// });

	// function updateTaskStatus(taskNumber: number, newStatus: string) {
	// 	console.log(taskNumber, newStatus);
	// 	setList((temp: ITask[]) => [
	// 		...temp.map((task: ITask) =>
	// 			task.task_number === taskNumber
	// 				? { ...task, status: newStatus }
	// 				: { ...task }
	// 		),
	// 	]);
	// 	updateStatusToTask();
	// }

	// --------------------------- SECTION TO BE INVESTIGATED -----------------------------//

	function updateTaskStatus(taskID: number, status: string) {
		console.log(taskID, status);
		const selectedTask: ITask = masterList.filter(
			(task: ITask) => task.task_number === taskID
		);
		if (selectedTask.status !== status) {
			const list: ITask[] = masterList.map((task: ITask) =>
				task.task_number === taskID
					? {
							...task,
							status,
					  }
					: {
							...task,
					  }
			);
			setMasterList(list);
			separateTaskByStatus(list);
		}
	}

	return (
		<div>
			<FilterComponent users={mockUsers} tags={["UI"]} />
			<section className='board-view'>
				<StatusColumnComponent
					status={TASK_BOARD.NEW}
					key={1}
					tasks={newTasks}
					updateTaskStatus={updateTaskStatus}
				/>
				<StatusColumnComponent
					status={TASK_BOARD.IN_PROGRESS}
					key={2}
					tasks={inProgressTasks}
					updateTaskStatus={updateTaskStatus}
				/>
				<StatusColumnComponent
					status={TASK_BOARD.DONE}
					key={3}
					tasks={doneTasks}
					updateTaskStatus={updateTaskStatus}
				/>
			</section>
		</div>
	);
}
