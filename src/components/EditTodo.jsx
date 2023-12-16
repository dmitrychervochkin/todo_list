import React, {useState, useEffect} from "react";
import * as yup from 'yup';
import {TextField} from './TextField';

const validateSchema = yup.object().shape({});
function parceYupError(){};

export function EditTodo({ handleEdit, editTodo, ...props }){
	const [error, setError] = useState({});
	const [value, setValue] = useState({...props});

	function handleChange(event){
		const {name, value} = event.target;
		setValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const isValid = Object.keys(error).length === 0;

	async function handleSubmit(event){
		event.preventDefault();
		try{
			if(isValid){
				await editTodo(props.id, value);
				handleEdit();
			}
		} catch(error){
			console.log(error);
		};
	};

	useEffect(() => {
		validateSchema
			.validate(value, { abortEarly: false })
			.then(() => {
				setError({})
			})
			.catch((yupError) => {
				const error = parceYupError(yupError);
				setError(error)
			})
	}, [value]);

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				value={value.title}
				id='title'
				type='text'
				name='title'
				onChange={handleChange}
				placeholder='Введите title'
				error={error.title}
			/>

		</form>
	)
};
