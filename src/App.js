import {TodosPage} from './components/TodosPage.jsx';
import styles from './App.module.css';

export function App(){
	return (
		<div className={styles.App}>
			<h1 className={styles.title}>To-Do List</h1>
			<TodosPage/>
		</div>
	);
}

// json-server --watch src/db.json --port 3005
