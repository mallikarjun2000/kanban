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
}: {
	users: IUser[];
	tags: string[];
}) {
	const renderUserOptions = () => {
		return users.map((user) => {
			return { value: user.user_name };
		});
	};
	const renderStatusOptions = () => {
		return Object.values(TASK_BOARD).map((status: string) => {
			return { value: status };
		});
	};
	const renderTagOptions = () => {
		return tags.map((tag) => {
			return { value: tag };
		});
	};
	function handleChange(event: any, name: string) {
		// alert(event);
	}

	function handleBlur(event: any, name: string) {
		// alert(event.toString());
	}

	function handleClear(name: string) {
		// alert(name);
	}
	return (
		<Card className='filter-container'>
			<span>Filter By</span>
			<Select
				className='filter'
				mode='multiple'
				options={renderUserOptions()}
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
				options={renderTagOptions()}
			/>
		</Card>
	);
}
