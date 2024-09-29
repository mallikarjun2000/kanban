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
	const [tags, setTags] = useState<string[]>([]);

	useEffect(() => {
		separateTaskByStatus(tasks);
		setMasterList(tasks);
		const tagsSet = new Set<string>();
		tasks?.forEach((task) => {
			task?.tags?.forEach((tag) => tagsSet.add(tag));
		});
		setTags(Array.from(tagsSet));
	}, []);

	useEffect(() => {
		console.log(newTasks, inProgressTasks, doneTasks, tags, "re-rendered");
	});

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

	function updateFilterBy(filterItems: string[], filterKey: string) {
		let originalTasks = [...tasks];
		switch (filterKey) {
			case "tag": {
				if (!filterItems.length) {
					separateTaskByStatus(tasks);
					return;
				}
				let tas = [];
				for (let filterItem of filterItems) {
					tas.push(
						originalTasks.filter((task: ITask) =>
							task.tags.includes(filterItem)
						)[0]
					);
				}
				separateTaskByStatus(tas);
				break;
			}
			case "user": {
				let originalTasks = [...tasks];
				if (!filterItems.length) {
					separateTaskByStatus(originalTasks);
					return;
				}
				const selectedTasks = [];
				for (let name of filterItems) {
					for (let task of originalTasks) {
						if (task.assigned_to.user_name === name) {
							selectedTasks.push(task);
						}
					}
				}
				separateTaskByStatus(selectedTasks);
				break;
			}
			default: {
				return;
			}
		}
	}

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
			<FilterComponent
				users={mockUsers}
				tags={tags}
				updateFilterBy={updateFilterBy}
			/>
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
