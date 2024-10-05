import { FilterComponent } from "./filter/filter";
import { StatusColumnComponent } from "./StatusColumn/StatusColumn";
import "./board.css";
import { ITask, TASK_BOARD } from "../../models/models";
import { mockProjectDetails, mockUsers } from "../../utils/project.utils";
import { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TaskDetailsModalComponent } from "./taskDetailsModal/task-details-modal";

export function BoardComponent({
	tasks,
	projectId,
}: {
	tasks: ITask[];
	projectId: string;
}) {
	const [newTasks, setNewTasks]: any = useState();
	const [inProgressTasks, setInProgressTasks]: any = useState();
	const [doneTasks, setDoneTasks]: any = useState();
	const [masterList, setMasterList]: any = useState();
	const [tags, setTags] = useState<string[]>([]);
	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedTask, setSelectedTaskToEdit] = useState<ITask | undefined>(
		undefined
	);

	useEffect(() => {
		separateTaskByStatus(tasks);
		setMasterList(tasks);
		const tagsSet = new Set<string>();
		tasks?.forEach((task) => {
			task?.tags?.forEach((tag) => tagsSet.add(tag));
		});
		setTags(Array.from(tagsSet));
	}, []);

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

	function createTask() {
		setSelectedTaskToEdit(undefined);
		setModalOpen((isOpen) => !isOpen);
	}

	function addTask(task: ITask) {
		const updatedTask: ITask = {
			...task,
			project_id: projectId,
		};
		const updatedList = [...masterList, updatedTask];
		setMasterList(updatedList);
		separateTaskByStatus(updatedList);
		setModalOpen((isOpen) => !isOpen);
	}

	function editAndSaveTask(task: ITask) {
		const updatedList = masterList.map((curr: ITask) =>
			curr.task_number === task.task_number ? task : curr
		);
		setMasterList(updatedList);
		separateTaskByStatus(updatedList);
		setModalOpen((isOpen) => !isOpen);
	}

	function handleSave(task: ITask) {
		if (selectedTask && Object.keys(selectedTask as ITask).length) {
			// edit
			editAndSaveTask(task);
		} else {
			addTask(task);
		}
	}

	function onClickEdit(task: ITask) {
		setSelectedTaskToEdit(task);
		setModalOpen((isOpen) => !isOpen);
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
					openEditDetails={onClickEdit}
					status={TASK_BOARD.NEW}
					key={1}
					tasks={newTasks}
					updateTaskStatus={updateTaskStatus}
				/>
				<StatusColumnComponent
					openEditDetails={onClickEdit}
					status={TASK_BOARD.IN_PROGRESS}
					key={2}
					tasks={inProgressTasks}
					updateTaskStatus={updateTaskStatus}
				/>
				<StatusColumnComponent
					openEditDetails={onClickEdit}
					status={TASK_BOARD.DONE}
					key={3}
					tasks={doneTasks}
					updateTaskStatus={updateTaskStatus}
				/>
			</section>
			<section>
				<FloatButton
					icon={<PlusOutlined />}
					onClick={createTask}
				></FloatButton>
			</section>
			<section>
				<TaskDetailsModalComponent
					users={mockProjectDetails.users}
					isModalOpen={isModalOpen}
					handleCancel={() => {
						setModalOpen((isOpen) => !isOpen);
					}}
					handleOk={handleSave}
					task={{ ...selectedTask } as any}
				/>
			</section>
		</div>
	);
}
