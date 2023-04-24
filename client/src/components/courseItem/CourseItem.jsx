import React from 'react'
import styles from './courseItem.module.css'
import { Link } from 'react-router-dom'

const CourseItem = ({ course }) => {
	return (
		<Link to={`/course/${course.id_course}`}>
			<div className={styles.courseItem}>
				<div className={styles.courseBlock}>
					<div className={styles.name}>{course.course_name}</div>
					<div className={styles.description}>{course.course_description}</div>
				</div>
			</div>
		</Link>
	)
}

export default CourseItem
