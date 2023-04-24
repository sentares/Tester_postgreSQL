import React from 'react'
import styles from './styles.module.css'

const Button = ({ value, onClick, disabled, style }) => {
	return (
		<button
			className={styles.btn}
			style={style}
			onClick={onClick}
			disabled={disabled}
		>
			{value}
		</button>
	)
}

export default Button
