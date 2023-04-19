import React from 'react'
import styles from './courseItem.module.css'

const CourseItem = ({ course }) => {
	return (
		<div className={styles.courseItem}>
			<div className={styles.courseBlock}>
				<div className={styles.name}>{course.course_name}</div>
				<div className={styles.description}>{course.course_description}</div>
			</div>
		</div>
	)
}

export default CourseItem
