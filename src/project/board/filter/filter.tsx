import { Card, Select } from "antd";
import "./filter.css";
import { IUser, TASK_BOARD } from "../../../models/models";

/**
 *
 * Filter by
 * 1. User
 * 2. Status
 * 3. Tag
 */

export function FilterComponent({
	users = [],
	tags = [],
	updateFilterBy,
}: {
	users: IUser[];
	tags: string[];
	updateFilterBy: Function;
}) {
	function handleChange(event: any, name: string) {
		console.log(event, name, "changed");
		updateFilterBy(event, name);
	}

	function handleBlur(event: any, name: string) {
		// console.log(event, name, "onBlur");
	}

	function handleClear(name: string) {
		// console.log(name, "clear");
	}
	return (
		<Card className='filter-container'>
			<span>Filter By</span>
			<Select
				title='Title Brp'
				className='filter'
				mode='multiple'
				options={renderUserOptions(users)}
				onChange={(e) => handleChange(e, "user")}
				onBlur={(e) => handleBlur(e, "user")}
				onClear={() => handleClear("user")}
				placeholder='Select User'
			/>
			<Select
				className='filter'
				mode='multiple'
				options={renderStatusOptions()}
				onChange={(e) => handleChange(e, "status")}
				onBlur={(e) => handleBlur(e, "status")}
				placeholder='Select Status'
			/>
			<Select
				className='filter'
				mode='multiple'
				placeholder='Select Tag'
				onChange={(e) => handleChange(e, "tag")}
				onBlur={(e) => handleBlur(e, "tag")}
				options={renderTagOptions(tags)}
			/>
		</Card>
	);
}

const renderUserOptions = (users: any) => {
	return users.map((user: any, index: number) => {
		return { value: user.user_name };
	});
};
const renderStatusOptions = () => {
	return Object.values(TASK_BOARD).map((status: string) => {
		return { value: status };
	});
};
const renderTagOptions = (tags: string[]) => {
	return tags.map((tag: string) => {
		return { value: tag };
	});
};
