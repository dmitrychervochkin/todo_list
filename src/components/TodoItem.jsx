import React, { useState } from "react";
import styles from '../App.module.css';
import { EditTodo } from './EditTodo';

export function TodoItem({ completeTodo, editTodo, deleteTodo, ...props }){
	const [isEdit, setIsEdit] = useState(false);

	function handleEdit(){
		setIsEdit((prevState) => !prevState)
	};
	
	return(
		<>
			{isEdit ? (
				<EditTodo {...props} handleEdit={handleEdit} editTodo={editTodo} />
			) : (
				<li className={styles.TodoTitle}>
					<div data-complete={props.completed}>
						{props.title}
						<div>
							<button
								onClick={handleEdit}
								className={styles.btn}
							>
								Edit
							</button>
							<button
								id={props.id}
								onClick={deleteTodo}
								className={styles.btn}
							>
								Delete
							</button>
							<button
								id={props.id}
								onClick={completeTodo}
								className={styles.btn}
							>
								Complete
							</button>
						</div>
					</div>
				</li>
			)}
		</>
	)
}
