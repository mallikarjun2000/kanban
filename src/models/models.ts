export interface IUser {
	user_id: number;
	user_name: string;
	user_email: string;
	isAdmin?: string;
}

export interface IProject {
	project_name: string;
	project_id: string;
	users: IUser[];
	creation_date: Date;
	tasks?: ITask[];
}

export interface ITask {
	task_number: number;
	title: string;
	assigned_to: IUser;
	status: TASK_BOARD;
	created_time: Date;
	tags: string[];
	time_to_complete: number;
	priority: number;
	project_id: string;
	description?: string;
}

export enum TAST_STATUS {
	NEW = "New",
	READY = "Ready",
	IN_PROGRESS = "In Progress",
	RESOLVED = "Resolved",
	TESTING = "Testing",
	CLOSED = "Closed",
}

export enum TASK_BOARD {
	NEW = "New",
	IN_PROGRESS = "In Progress",
	DONE = "Done",
}
