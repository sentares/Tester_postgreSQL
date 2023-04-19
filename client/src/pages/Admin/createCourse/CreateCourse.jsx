import React, { useState } from 'react'
import useCourse from '../../../hooks/useCourse'
import styles from './createCourse.module.css'

const CreateCourse = () => {
	const [form, setForm] = useState({
		nameOfCourse: '',
		descriptionOfCourse: '',
	})

	console.log(form)

	const { createCourse } = useCourse(form)

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const handleUploadCourse = async () => {
		createCourse()
	}

	return (
		<div className={styles.createCourse}>
			<div>
				Создать курс
				<form>
					<div className={styles.inputBlock}>
						<input
							className={styles.formInput}
							type='name'
							name='nameOfCourse'
							placeholder='Название курса'
							onChange={change}
							value={form.nameOfCourse}
						/>
					</div>
					<div className={styles.inputBlock}>
						<input
							className={styles.formInput}
							type='name'
							name='descriptionOfCourse'
							placeholder='Описание курса'
							onChange={change}
							value={form.descriptionOfCourse}
						/>
					</div>
					<button className={styles.createButton} onClick={handleUploadCourse}>
						Создать курс
					</button>
				</form>
			</div>
		</div>
	)
}

export default CreateCourse
