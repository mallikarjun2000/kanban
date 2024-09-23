import { IProject, ITask, IUser, TASK_BOARD } from "../models/models";

export const mockUsers: IUser[] = [
	{
		user_email: "john.doe@gmail.com",
		user_name: "John Doe",
		user_id: 22345,
	},
];

export const mockTasks: ITask[] = [
	{
		task_number: 445342,
		title: "To start with implementation",
		assigned_to: {
			user_email: "John.Doe@gmail.com",
			user_name: "John Doe",
			user_id: 123,
		},
		created_time: new Date(),
		priority: 1,
		project_id: "foodx23411",
		status: TASK_BOARD.NEW,
		tags: ["analysis", "#UI"],
		time_to_complete: 1,
	},
	{
		task_number: 445342,
		title: "To work on Analysis",
		assigned_to: {
			user_email: "John.Doe@gmail.com",
			user_name: "John Doe",
			user_id: 123,
		},
		created_time: new Date(),
		priority: 1,
		project_id: "foodx23411",
		status: TASK_BOARD.IN_PROGRESS,
		tags: ["analysis", "#UI"],
		time_to_complete: 1,
	},
	{
		task_number: 445342,
		title: "Set up initial Project and folders",
		assigned_to: {
			user_email: "John.Doe@gmail.com",
			user_name: "John Doe",
			user_id: 123,
		},
		created_time: new Date(),
		priority: 1,
		project_id: "foodx23411",
		status: TASK_BOARD.DONE,
		tags: ["analysis", "#UI"],
		time_to_complete: 1,
	},
];

export const mockProjectDetails$ = new Promise<IProject>((resolve, reject) => {
	setTimeout(() => {
		resolve({
			project_name: "Kanban Board",
			project_id: "452112",
			users: mockUsers,
			creation_date: new Date(),
			tasks: mockTasks,
		} as IProject);
	});
});
