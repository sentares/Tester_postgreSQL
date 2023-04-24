import React from 'react'
import styles from './createCourse.module.css'
import { MdOutlineClose } from 'react-icons/md'

const createCourseModal = ({
	handleOpenChangeCourseModal,
	change,
	form,
	handleUploadCourse,
}) => {
	return (
		<div className={styles.createTeacherModal}>
			<div className={styles.content}>
				<div className={styles.close}>
					<button
						className={styles.closeIcon}
						onClick={handleOpenChangeCourseModal}
					>
						<MdOutlineClose />
					</button>
				</div>
				<div className={styles.createForm}>
					<form>
						<input
							className={styles.infoInput}
							type='name'
							name='nameOfCourse'
							placeholder='Название курса'
							onChange={change}
							value={form.nameOfCourse}
						/>
						<input
							className={styles.infoInput}
							type='name'
							name='descriptionOfCourse'
							placeholder='Описание курса'
							onChange={change}
							value={form.descriptionOfCourse}
						/>
						<button className={styles.regButton} onClick={handleUploadCourse}>
							Создать курс
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default createCourseModal
