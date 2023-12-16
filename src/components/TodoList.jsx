import React from "react";
import { TodoItem } from './TodoItem';

export function TodoList({ completeTodo, editTodo, deleteTodo, data }){
	return(
		<ul>
			{data.map((todo) => (
				<TodoItem
					key={todo.id}
					{...todo}
					editTodo={editTodo}
					deleteTodo={deleteTodo}
					completeTodo={completeTodo}
				/>
			)).reverse()}
		</ul>
	);
};
