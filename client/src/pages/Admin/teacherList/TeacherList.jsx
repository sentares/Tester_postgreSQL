import React, { useState } from 'react'
import styles from './teacherList.module.css'
import CreateTeacherModal from '../../../components/modal/createTeacherModal/CreateTeacherModal'

const TeacherList = () => {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const handleOpenCreateTeacherModal = () => {
		setIsOpenModal(true)
	}

	const handleCloseCreateTeacherModal = () => {
		setIsOpenModal(false)
	}

	return (
		<div className={styles.teacherList}>
			{isOpenModal && (
				<CreateTeacherModal
					handleCloseCreateTeacherModal={handleCloseCreateTeacherModal}
				/>
			)}
			<div>
				<button
					className={styles.newTeacher}
					onClick={handleOpenCreateTeacherModal}
				>
					Новый преподователь
				</button>
			</div>
		</div>
	)
}

export default TeacherList
