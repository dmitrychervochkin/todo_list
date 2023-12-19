import React, { useState, useEffect } from "react";
import styles from '../App.module.css';
import { TodoList } from "./TodoList";
import { useDebounce } from "../hooks/useDebounce";
import { TodoInput } from "./TodoInput";
import { InputSearch } from "./InputSearch";
import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from '../firebase'

export function TodosPage(){
	const [todos, setTodos] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [note, setNote] = useState('');
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [sort, setSort] = useState(false);
	const [isCompleting, setIsCompleting] = useState(false);

	const debounceValue = useDebounce(searchQuery, 500);

	function loadedTodos(){
		const todosDbRef = ref(db, 'todos');
		// `todos?q=${searchQuery}`
		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];
			setTodos(loadedTodos);
			setIsLoading(false);
		});
	};

	function sortTodos(){
		let sortTitle = '?_sort=title';
		sort ? sortTitle = '?_sort=title' : sortTitle = '';
		fetch(`http://localhost:3005/todos${sortTitle}`)
			.then((responce) => responce.json())
			.then((data) => {
				setTodos(data);
			})
			.finally(() => {
				setSort(!sort)
				setIsLoading(false)
			});
    };

	function editTodo(id, payLoad){
		const todosDbRef = ref(db, `todos/${id}`);
		update(todosDbRef, {...payLoad})
			.then(() => {

			})
			.finally(() => setIsLoading(false));


	};

	function addTodo(){
		if(note !== ''){
			const todosDbRef = ref(db, 'todos');
			push(todosDbRef, {
				title: note,
      			completed: false
			})
				.then((data) => {})
				.finally(() => setNote(''));
		}
	};

	function deleteTodo(event){
		const todosDbRef = ref(db, `todos/${event.target.id}`);
		remove(todosDbRef)
	}

	function completeTodo(event){
		const todosDbRef = ref(db, `todos/${event.target.id}`);
		update(todosDbRef, {completed: !isCompleting})
			.then(() => {

			})
			.finally(() => setIsCompleting(!isCompleting));
	}

	useEffect(() => {
		setIsLoading(true);
		loadedTodos()
	}, [debounceValue, refreshTodos]);

	return(
		<div>
			<div className={styles.others}>
				<InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
				<button onClick={sortTodos} className={styles.sortBtn}>Sort cases</button>
			</div>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<>
					<TodoInput addTodo={addTodo} note={note} setNote={setNote}/>
					<TodoList
						data={todos}
						editTodo={editTodo}
						deleteTodo={deleteTodo}
						completeTodo={completeTodo}
					/>
				</>
					)}
		</div>
	)

};

