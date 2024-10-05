import { Button, Input, Modal, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { ITask, IUser, TASK_BOARD } from "../../../models/models";
import TextArea from "antd/es/input/TextArea";
import "./task-details-modal.css";

function getRandomNumber() {
	return Math.floor(100000 + Math.random() * 900000);
}

const emptyForm: ITask = {
	title: "",
	assigned_to: {
		user_email: "",
		user_id: 0,
		user_name: "",
	},
	task_number: getRandomNumber(),
	tags: [],
	created_time: new Date(),
	priority: 3,
	project_id: "45",
	status: TASK_BOARD.NEW,
	time_to_complete: 0,
	description: "",
};

const ADD_TASK_LABEL = {
	title: "Add Task",
	buttonLabel: "Create",
};

const EDIT_TASK_LABEL = {
	title: "Edit Task",
	buttonLabel: "Save",
};

export function TaskDetailsModalComponent({
	users,
	isModalOpen,
	handleOk,
	handleCancel,
	task,
}: {
	users: IUser[];
	isModalOpen: boolean;
	handleOk: Function;
	handleCancel: Function;
	task?: ITask;
}) {
	const [form, setForm] = useState<ITask>(task ?? emptyForm);
	const [formLabels, setFormLabels] = useState(ADD_TASK_LABEL);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	function addTag(tag: string) {
		if (tag.length) {
			setForm((formValue: ITask) => {
				return {
					...formValue,
					tags: [...formValue.tags, tag],
				};
			});
		}
	}
	function removeTag(tag: string) {
		if (tag.length) {
			setForm((formValue: ITask) => {
				return {
					...formValue,
					tags: formValue.tags.filter(
						(currenttag) => currenttag !== tag
					),
				};
			});
		}
	}

	useEffect(() => {
		if (Object.keys(task ?? {}).length) {
			setForm(task as ITask);
			setFormLabels(EDIT_TASK_LABEL);
			setIsEdit(true);
		} else {
			setForm(emptyForm);
			setFormLabels(ADD_TASK_LABEL);
			setIsEdit(false);
		}
	}, [task]);
	return (
		<Modal
			title={formLabels.title}
			open={isModalOpen}
			footer={[
				<Button onClick={(e) => handleCancel()}>Cancel</Button>,
				<Button
					type='primary'
					onClick={(e) => {
						const newTaskId = getRandomNumber();
						handleOk(
							!isEdit
								? {
										...form,
										task_number: newTaskId,
								  }
								: {
										...form,
								  }
						);
						setForm({
							...emptyForm,
							assigned_to: {
								...emptyForm.assigned_to,
							},
						});
					}}
				>
					{formLabels.title}
				</Button>,
			]}
		>
			<form>
				<div className='form-group'>
					<Input
						value={form.title}
						onChange={(e) => {
							setForm((formValue) => {
								return {
									...formValue,
									title: e.target.value,
								};
							});
						}}
						name='title'
						placeholder='Enter title'
					/>
				</div>
				<div className='form-group details-panel'>
					<TextArea
						value={form.description}
						onChange={(e) => {
							setForm((formValue) => {
								return {
									...formValue,
									description: e.target.value,
								};
							});
						}}
						placeholder='describe your task'
					></TextArea>
					<div>
						<div className='priority'>
							<label>Priority</label>
							<Select
								value={form.priority}
								onSelect={(e) => {
									setForm((formValue) => {
										return {
											...formValue,
											priority: e,
										};
									});
								}}
								className='select'
								options={[
									{ value: 1 },
									{ value: 2 },
									{ value: 3 },
								]}
							/>
						</div>
						<div className='efforts'>
							<label>Effors</label>
							<Input
								type='number'
								value={form.time_to_complete}
								onChange={(e) => {
									setForm((formValue: any) => {
										return {
											...formValue,
											time_to_complete: e.target.value,
										};
									});
								}}
							/>
						</div>
					</div>
				</div>
				<div>
					<Select
						style={{ margin: "5px", width: "120px" }}
						placeholder={"assign to"}
						onSelect={(e) => {
							setForm((formValue: any) => {
								return {
									...formValue,
									assigned_to: users.filter(
										(user) => user.user_email === e
									)[0],
								};
							});
						}}
						value={form?.assigned_to?.user_email ?? ""}
						options={[
							...users?.map((user: IUser) => {
								return {
									value: user.user_email,
									label: user.user_name,
								};
							}),
						]}
					></Select>
					<AddTagComponent
						tags={form.tags}
						addTag={addTag}
						removeTag={removeTag}
					/>
				</div>
			</form>
		</Modal>
	);
}

function AddTagComponent({
	tags,
	addTag,
	removeTag,
}: {
	tags: string[];
	addTag: Function;
	removeTag: Function;
}) {
	const [isEditMode, setEditMode] = useState(false);
	const [currentTag, setCurrentTag] = useState("");
	return (
		<div
			className='add-tag-container'
			style={{ display: "flex", margin: "5px" }}
		>
			<div style={{ margin: "2px" }}>
				{isEditMode ? (
					<Input
						autoFocus
						style={{ height: "25px", width: "65px" }}
						value={currentTag}
						onChange={(e) => {
							if (e.target.value === "Enter") {
								alert("ENter");
							}
							setCurrentTag(e.target.value);
						}}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								addTag(currentTag);
								setCurrentTag("");
								setEditMode((isEdit) => !isEdit);
							}
						}}
						onBlur={(e) => {
							addTag(currentTag);
							setCurrentTag("");
							setEditMode((isEdit) => !isEdit);
						}}
					/>
				) : (
					<div
						style={{
							border: "0.5px solid grey",
							borderRadius: "5px",
							padding: "2px 5px",
							fontSize: "0.75rem",
						}}
						onClick={(e) => setEditMode((isEdit) => !isEdit)}
					>
						+ Add Tag
					</div>
				)}
			</div>
			<div>
				{tags?.map((tag: string, index: number) => (
					<Tag
						key={index}
						closable
						onClose={(e) => removeTag(tag)}
						style={{ marginLeft: "2px" }}
					>
						{tag}
					</Tag>
				))}
			</div>
		</div>
	);
}
