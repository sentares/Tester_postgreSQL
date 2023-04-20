import React, { useState } from 'react'
import styles from './teacherItem.module.css'
import { Link } from 'react-router-dom'

const TeacherItem = ({ teacher }) => {
	const [role, setRole] = useState('преподователь')

	return (
		<Link to={`/teacher/${teacher.id_teacher}`}>
			<div className={styles.teacherItem}>
				<div className={styles.name}>
					{teacher.name} {teacher.surname} {teacher.patronymic}
				</div>
				<div className={styles.role}>
					{teacher.role === 2 ? (
						<div className={styles.roleTeacher}>Преподователь</div>
					) : (
						<div className={styles.roleManager}>Менеджер</div>
					)}
				</div>
			</div>
		</Link>
	)
}

export default TeacherItem
