import React, { useEffect } from 'react'
import styles from './courseList.module.css'
import useCourse from '../../../hooks/useCourse'
import CourseItem from '../../../components/courseItem/CourseItem'

const CourseList = () => {
	const { allCourses, getAllCourse } = useCourse()

	useEffect(() => {
		getAllCourse()
	}, [])

	return (
		<div className={styles.courseList}>
			<div>
				{allCourses &&
					allCourses.map(course => (
						<CourseItem key={course.id_course} course={course} />
					))}
			</div>
		</div>
	)
}

export default CourseList
