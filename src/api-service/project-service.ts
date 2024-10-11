import { BASE_URL } from "../utils/project.utils";

export function getProjectDetails() {
	return fetch(BASE_URL);
}

export function putTaskStatus() {
	return fetch(BASE_URL);
}

export function postAddTask() {
	return fetch(BASE_URL);
}

export function putEditTask() {
	return fetch(BASE_URL);
}
