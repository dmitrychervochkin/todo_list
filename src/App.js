import styles from './App.module.css';
import { useEffect, useState } from 'react';

export function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<div className={styles.App}>
			<div className={styles.title}>TO-DO LIST</div>
			<div className={styles.todo_list}>
				{todos.map(({ id, title, completed }) => {
					return (
						<div className={styles.todo_title} data-complete={completed} key={id}>
							{title}
						</div>
					);
				})}
			</div>
		</div>
	);
}
