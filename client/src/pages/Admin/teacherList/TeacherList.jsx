import React, { useEffect, useState } from 'react'
import CreateTeacherModal from '../../../components/modal/createTeacherModal/CreateTeacherModal'
import useTeacher from '../../../hooks/useTeacher'
import styles from './teacherList.module.css'
import TeacherItem from '../../../components/teacherItem/TeacherItem'

const TeacherList = () => {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [form, setForm] = useState({
		name: '',
		surname: '',
		patronymic: '',
		birthday: '',
		inn: '',
		email: '',
		password: '',
		role: 3,
	})

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const handleOpenChangeTeacherModal = () => {
		setIsOpenModal(!isOpenModal)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		await handleCreateTeacher()
	}

	const { handleCreateTeacher, getAllTeachers, allTeachers } = useTeacher(
		form,
		setForm,
		null
	)

	useEffect(() => {
		getAllTeachers()
	}, [])

	return (
		<div className={styles.teacherList}>
			<div className={styles.teacherListBlock}>
				{isOpenModal && (
					<CreateTeacherModal
						change={change}
						form={form}
						handleOpenChangeTeacherModal={handleOpenChangeTeacherModal}
						handleSubmit={handleSubmit}
					/>
				)}
				<div className={styles.buttonBlock}>
					<button
						className={styles.newTeacher}
						onClick={handleOpenChangeTeacherModal}
					>
						Новый преподаватель
					</button>
				</div>
				<div className={styles.list}>
					{allTeachers && allTeachers.length > 0 ? (
						<div>
							<div className={styles.listText}>Список преподавателей</div>
							<div>
								{allTeachers.map(teacher => (
									<TeacherItem key={teacher.id_teacher} teacher={teacher} />
								))}
							</div>
						</div>
					) : (
						<div className={styles.listText}>Пока что нет преподавателей</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default TeacherList
