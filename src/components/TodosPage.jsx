import React, { useState, useEffect } from "react";
import styles from '../App.module.css';
import { TodoList } from "./TodoList";
import { useDebounce } from "../hooks/useDebounce";
import { TodoInput } from "./TodoInput";
import { InputSearch } from "./InputSearch";
import { ref, onValue, push, set } from 'firebase/database';
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
		set(todosDbRef, {...payLoad})
			.then((item) => {
				const todosIndex = Object.entries(todos).findIndex((prod, index) => console.log(id));
				// console.log(todosIndex)
				const copyData = Object.entries(todos).slice();
				copyData[todosIndex] = payLoad;
				// console.log(copyData[todosIndex][0])
				// console.log((copyData[3][1]))
				// console.log(item)
				// setTodos(copyData);
			})
			.finally(() => setIsLoading(false));

		// fetch(`http://localhost:3005/todos/${id}`, {
		// 	method: 'PATCH',
		// 	headers: {'Content-Type': 'application/json;charset=utf-8'},
		// 	body: JSON.stringify({ ...payLoad })
		// })
		// 	.then((responce) => responce.json())
		// 	.then((data) => {
		// 		console.log(data)
		// 		const todosIndex = Object.entries(todos).findIndex((prod) => prod.id === id);
		// 		const copyData = Object.entries(todos).slice();
		// 		copyData[todosIndex] = data;
		// 		setTodos(copyData);
		// 	})
		// 	.finally(() => setIsLoading(false));
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
		fetch(`http://localhost:3005/todos/${event.target.id}`, {
			method: 'DELETE'
		})
			.then((responce) => responce.json())
			.then((data) => {
				setRefreshTodos(!refreshTodos)
			})
			.finally(() => {});
	}

	function completeTodo(event){
		fetch(`http://localhost:3005/todos/${event.target.id}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({
					completed: isCompleting,
				})

			})
			.then((rawResponce) => rawResponce.json())
			.then((response) => {
				setRefreshTodos(!refreshTodos)

			})
			.finally(() => {
				setIsCompleting(!isCompleting)
			})
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

