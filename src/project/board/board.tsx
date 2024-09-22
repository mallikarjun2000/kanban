import { FilterComponent } from "./filter/filter";
import { StatusColumnComponent } from "./StatusColumn/StatusColumn";
import "./board.css";
import { TASK_BOARD } from "../../models/models";

export function BoardComponent() {
	const statusList = Object.values(TASK_BOARD);
	return (
		<div>
			<FilterComponent />
			<section className='board-view'>
				{statusList.map((status: any) => (
					<StatusColumnComponent status={status} />
				))}
			</section>
		</div>
	);
}
