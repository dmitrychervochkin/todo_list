import React from "react";
import styles from '../App.module.css';

export function InputSearch({searchQuery, setSearchQuery}){
	function handleChange(event){
		setSearchQuery(event.target.value)
	};

	return(
		<input
			placeholder='Поиск...'
			value={searchQuery}
			onChange={handleChange}
			className={styles.search}
		></input>
	);
};
