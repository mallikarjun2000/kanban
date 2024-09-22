import { TaskComponent } from "../task/task";
import "./status.css";

export function StatusColumnComponent({ status }: { status: string }) {
	return (
		<div className='status'>
			<h2>{status}</h2>
			<TaskComponent />
		</div>
	);
}
