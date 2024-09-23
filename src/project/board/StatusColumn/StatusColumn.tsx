import { FloatButton } from "antd";
import { TaskComponent } from "../task/task";
import "./status.css";
import { PlusOutlined } from "@ant-design/icons";
import { ITask } from "../../../models/models";

export function StatusColumnComponent({
	status,
	tasks,
}: {
	status: string;
	tasks: ITask[];
}) {
	function createTask() {}
	return (
		<div className='status'>
			<h2>{status}</h2>
			{tasks?.length
				? tasks.map((task: ITask) => (
						<TaskComponent key={task.task_number} task={task} />
				  ))
				: ""}
			<FloatButton
				icon={<PlusOutlined />}
				onClick={createTask}
			></FloatButton>
		</div>
	);
}
