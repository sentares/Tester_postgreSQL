import React, { useEffect, useState } from 'react'
import styles from './specialTeacher.module.css'
import { useParams } from 'react-router-dom'
import useTeacher from '../../../hooks/useTeacher'
import { BiPencil } from 'react-icons/bi'

const SpecialTeacher = () => {
	const [formattedBirthday, setFormattedBirthday] = useState('')
	const [isEditable, setIsEditable] = useState(false)
	const [form, setTeacherData] = useState({
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
	const { getSpecialTeahcer, specialTeacher, editTeacher, isSuccesRequest } =
		useTeacher(form, null, id_teacher)

	console.log(isSuccesRequest)

	const handleEditTeacher = () => {
		setIsEditable(!isEditable)
	}

	const handleSaveChanges = async () => {
		await editTeacher()
	}

	const handleChange = e => {
		const { name, value } = e.target
		setTeacherData({ ...form, [name]: value })
	}

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

	useEffect(() => {
		getSpecialTeahcer()
	}, [])

	useEffect(() => {
		setIsEditable(false)
	}, [isSuccesRequest])

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
								<div>Фамилия:</div>
								{isEditable ? (
									<input
										name='surname'
										value={form.surname}
										onChange={handleChange}
										className={styles.changeInput}
									/>
								) : (
									<div>{specialTeacher.surname}</div>
								)}
							</div>
							<div className={styles.info}>
								<div>Имя:</div>
								{isEditable ? (
									<input
										name='name'
										value={form.name}
										onChange={handleChange}
										className={styles.changeInput}
									/>
								) : (
									<div>{specialTeacher.name}</div>
								)}
							</div>
							<div className={styles.info}>
								<div>Отчество:</div>
								{isEditable ? (
									<input
										name='patronymic'
										value={form.patronymic}
										onChange={handleChange}
										className={styles.changeInput}
									/>
								) : (
									<div>{specialTeacher.patronymic}</div>
								)}
							</div>
							<div className={styles.info}>
								<div>Email:</div>
								{isEditable ? (
									<input
										name='email'
										value={form.email}
										onChange={handleChange}
										className={styles.changeInput}
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
										value={form.status}
										onChange={handleChange}
										className={styles.changeInput}
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
										className={styles.changeInput}
										name='role'
										value={form.role}
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
										className={styles.changeInput}
										type='number'
										name='temp_inn'
										value={form.temp_inn}
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
										className={styles.changeInput}
										type='date'
										name='birthday'
										value={form.birthday}
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
