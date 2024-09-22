import "./App.css";
import { ProjectComponent } from "./project/Project";

/**
 * Kanban board
 *
 * Requirements:
 * - Create, edit, delete and show tickets.
 * - Show tickets in board view.
 * - Ability to handle multiple projects.
 * - Drag and drop tickets on status columns.
 * - Search tickets/ filter tickets based on params (status, person, number).
 *
 * Non-Functional Reqs:
 * - May be responsive.
 * - Auto complete/suggestions on search.
 * - Drap and drop.
 * - pagination.
 * - Offline support.
 * - Accesability.
 *
 * Tech Choice:
 * - Framework - React(Typescript).
 * - Design System - MUI -> Joy UI.
 * - State management - Redux, thunk/saga, axios.
 * - Folder structure - Route/Screen based.
 *
 * Component Architecture:
 * - /src - Whole project inside it.
 * - /src/redux - State management code.
 * - /src/board - components related to board view.
 * - /src/model - Data Models.
 *   > Routes
 * - /src/:project/board/
 *  > Components (/board):
 * - TBD.
 *
 * Data, API, Protocols & Implementation:
 * > Models
 * - IUser - Logged user details. - [user_id, name, email]
 * - IProject - Project details - [project_name, project_id, users, creation, tasks?].
 * - ITaskDetails - Details of a task - [number, title, assigned_to, status, created_time, tags, time_to_complete, priority, project_id].
 *
 * /board - Main
 *
 */

function App() {
	return (
		<div className='App'>
			<ProjectComponent />
		</div>
	);
}

export default App;
