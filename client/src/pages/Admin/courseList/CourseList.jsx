import React, { useEffect, useState } from 'react'
import CourseItem from '../../../components/courseItem/CourseItem'
import useCourse from '../../../hooks/useCourse'
import CreateCourseModal from '../../../components/modal/createCourseModal/CreateCourseModal'
import styles from './courseList.module.css'

const CourseList = () => {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const { allCourses, getAllCourse } = useCourse()
	const [form, setForm] = useState({
		nameOfCourse: '',
		descriptionOfCourse: '',
	})

	const { createCourse } = useCourse(form)
	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const handleOpenChangeCourseModal = () => {
		setIsOpenModal(!isOpenModal)
	}

	const handleUploadCourse = async () => {
		await createCourse()
	}

	useEffect(() => {
		getAllCourse()
	}, [])

	return (
		<div className={styles.courseList}>
			<div className={styles.courseListBlock}>
				{isOpenModal && (
					<CreateCourseModal
						handleOpenChangeCourseModal={handleOpenChangeCourseModal}
						change={change}
						form={form}
						handleUploadCourse={handleUploadCourse}
					/>
				)}
				<div className={styles.buttonBlock}>
					<button
						className={styles.newCourse}
						onClick={handleOpenChangeCourseModal}
					>
						Новый курс
					</button>
				</div>
				<div className={styles.list}>
					{allCourses && allCourses.length > 0 ? (
						<div>
							<div className={styles.listText}>Список курсов</div>
							{allCourses.map(course => (
								<CourseItem key={course.id_course} course={course} />
							))}
						</div>
					) : (
						<div className={styles.listText}>Пока нет курсов</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CourseList
