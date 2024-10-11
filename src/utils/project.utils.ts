import { IProject, ITask, IUser, TASK_BOARD } from "../models/models";

export const mockUsers: IUser[] = [
	{
		user_email: "john.doe@gmail.com",
		user_name: "John Doe",
		user_id: 22345,
	},
	{
		user_email: "Jessy.pinkman@gmail.com",
		user_name: "Jessy pinkman",
		user_id: 123,
	},
	{
		user_email: "michael.klark@gmail.com",
		user_name: "Michael Klark",
		user_id: 123,
	},
];

export const mockTasks: ITask[] = [
	{
		task_number: 445341,
		title: "To start with implementation",
		description: "Start working on the task details and implementation",
		assigned_to: {
			user_email: "Jessy.pinkman@gmail.com",
			user_name: "Jessy pinkman",
			user_id: 123,
		},
		created_time: "11/20/2024",
		priority: 1,
		project_id: "foodx23411",
		status: TASK_BOARD.NEW,
		tags: ["analysis", "#UI"],
		time_to_complete: 1,
	},
	{
		task_number: 445342,
		title: "To work on Analysis",
		description:
			"Create an R&D ticket on how to implement the tickets and create a small poc.",
		assigned_to: {
			user_email: "John.Doe@gmail.com",
			user_name: "John Doe",
			user_id: 123,
		},
		created_time: "11/20/2024",
		priority: 1,
		project_id: "foodx23411",
		status: TASK_BOARD.IN_PROGRESS,
		tags: ["ReactJs", "#UI"],
		time_to_complete: 1,
	},
	{
		task_number: 445343,
		title: "Set up initial Project and folders",
		description: "Setup initial folder, details and update it.",
		assigned_to: {
			user_email: "michael.klark@gmail.com",
			user_name: "Michael Klark",
			user_id: 123,
		},
		created_time: "11/20/2024",
		priority: 1,
		project_id: "foodx23411",
		status: TASK_BOARD.DONE,
		tags: ["Angular", "#UI"],
		time_to_complete: 1,
	},
];

export const mockProjectDetails = {
	project_name: "Kanban Board",
	project_id: "452112",
	users: mockUsers,
	creation_date: "11/20/2024",
	tasks: mockTasks,
};

export const mockProjectDetails$ = new Promise<IProject>((resolve, reject) => {
	setTimeout(() => {
		resolve({
			project_name: "Kanban Board",
			project_id: "452112",
			users: mockUsers,
			creation_date: "11/20/2024",
			tasks: mockTasks,
		} as IProject);
	});
});
