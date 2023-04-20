import React, { useEffect, useState } from 'react'
import styles from './specialTeacher.module.css'
import { useParams } from 'react-router-dom'
import useTeacher from '../../../hooks/useTeacher'
import { BiPencil } from 'react-icons/bi'

const SpecialTeacher = () => {
	const [formattedBirthday, setFormattedBirthday] = useState('')
	const [isEditable, setIsEditable] = useState(false)
	const [teacherData, setTeacherData] = useState({
		birthday: '',
		name: '',
		surname: '',
		patronymic: '',
		email: '',
		status: '',
		role: '',
		temp_inn: '',
	})

	const params = useParams()
	const { id_teacher } = params
	const { getSpecialTeahcer, specialTeacher } = useTeacher(
		null,
		null,
		id_teacher
	)

	const handleEditTeacher = () => {
		setIsEditable(!isEditable)
	}

	const handleSaveChanges = () => {
		setIsEditable(false)
	}

	const handleChange = e => {
		const { name, value } = e.target
		setTeacherData({ ...teacherData, [name]: value })
	}

	useEffect(() => {
		getSpecialTeahcer()
	}, [])

	useEffect(() => {
		if (specialTeacher && specialTeacher.birthday) {
			const date = new Date(specialTeacher.birthday)
			const formattedDate = `${date.getDate()}.${
				date.getMonth() + 1
			}.${date.getFullYear()}`
			setFormattedBirthday(formattedDate)
			setTeacherData({
				birthday: formattedBirthday,
				name: specialTeacher.name,
				surname: specialTeacher.surname,
				patronymic: specialTeacher.patronymic,
				email: specialTeacher.email,
				status: specialTeacher.status,
				role: specialTeacher.role,
				temp_inn: specialTeacher.temp_inn,
			})
		}
	}, [specialTeacher])

	return (
		<div className={styles.specialTeacher}>
			{specialTeacher ? (
				<div className={styles.teacherBlock}>
					<div>
						<button onClick={handleEditTeacher} className={styles.editPen}>
							<BiPencil />
						</button>
						<div className={styles.infoBlock}>
							<div className={styles.info}>
								<div>ФИО:</div>
								<div>{`${specialTeacher.name} ${specialTeacher.surname} ${specialTeacher.patronymic}`}</div>
							</div>
							<div className={styles.info}>
								<div>Email:</div>
								{isEditable ? (
									<input
										type='text'
										name='email'
										value={teacherData.email}
										onChange={handleChange}
									/>
								) : (
									<div>{specialTeacher.email}</div>
								)}
							</div>
							<div className={styles.info}>
								<div>Статус:</div>
								{isEditable ? (
									<select
										name='status'
										value={teacherData.status}
										onChange={handleChange}
									>
										<option value={true}>Работает</option>
										<option value={false}>Не работает</option>
									</select>
								) : (
									<div>
										{specialTeacher.status === true ? (
											<div className={styles.statusTrue}>Работает</div>
										) : (
											<div className={styles.statusFalse}>Не работает</div>
										)}
									</div>
								)}
							</div>
							<div className={styles.info}>
								<div>Роль:</div>
								{isEditable ? (
									<select
										name='role'
										value={teacherData.role}
										onChange={handleChange}
									>
										<option value={3}>Менеджер</option>
										<option value={2}>Преподаватель</option>
									</select>
								) : (
									<div>
										{specialTeacher.role === 2 ? (
											<div className={styles.roleTeacher}>Преподаватель</div>
										) : (
											<div className={styles.roleManager}>Менеджер</div>
										)}
									</div>
								)}
							</div>
							<div className={styles.info}>
								<div>ИНН:</div>
								{isEditable ? (
									<input
										type='number'
										name='temp_inn'
										value={teacherData.temp_inn}
										onChange={handleChange}
									/>
								) : (
									<div>{specialTeacher.temp_inn}</div>
								)}
							</div>
							<div className={styles.info}>
								<div>Дата рождения:</div>
								{isEditable ? (
									<input
										type='date'
										name='birthday'
										value={teacherData.birthday}
										onChange={handleChange}
									/>
								) : (
									<div>{formattedBirthday}</div>
								)}
							</div>
							{isEditable && (
								<button
									onClick={handleSaveChanges}
									className={styles.saveButton}
								>
									Сохранить
								</button>
							)}
						</div>
					</div>
				</div>
			) : (
				<div>loading</div>
			)}
		</div>
	)
}

export default SpecialTeacher
