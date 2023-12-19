import React from "react";
import { TodoItem } from './TodoItem';

export function TodoList({ completeTodo, editTodo, deleteTodo, data }){
	return(
		<ul>
			{Object.entries(data).map(([id, {...todo}]) => (
				<TodoItem
					key={id}
					{...todo}
					editTodo={editTodo}
					deleteTodo={deleteTodo}
					completeTodo={completeTodo}
				/>
			))}
		</ul>
	);
};
