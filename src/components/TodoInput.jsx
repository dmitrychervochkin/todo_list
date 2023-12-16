import React, {useState} from "react";
import styles from '../App.module.css';

export function TodoInput({note, setNote, addTodo}){
	function handleChange({target}){
		setNote(target.value);
	}

	return(
		<>
			<input
				value={note}
				onChange={handleChange}
				className={styles.TodoInput}
				placeholder='Введите новую задачу...'
			></input>
			<button
				className={styles.AddBtn}
				onClick={addTodo}
			>
				Добавить новую задачу
			</button>
		</>

	)
};
