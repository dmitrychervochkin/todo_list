import { forwardRef } from 'react';
import styles from '../App.module.css';

export const TextField = forwardRef(({ error, ...props }, ref) => {
	return (
		<div className={styles.TodoEdit}>
			<input className={styles.editInput}ref={ref} {...props} />
			{error && <span>{error}</span>}
			<button type='submit' className={styles.btn}>Save</button>
		</div>
	);
});
