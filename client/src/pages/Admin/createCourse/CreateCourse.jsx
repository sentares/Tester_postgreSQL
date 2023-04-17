import React, { useState } from 'react'

const CreateCourse = () => {
	const [form, setForm] = useState({
		nameOfCourse: '',
		descriptionOfCourse: '',
	})

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const handleUploadCourse = async () => {
		console.log('gg')
	}

	return (
		<div>
			<div>Создать курс</div>
			<div>
				<input
					type='text'
					name='nameOfCourse'
					placeholder='Название курса'
					onChange={change}
					value={form.nameOfCourse}
				/>
				<input
					type='text'
					name='descriptionOfCourse'
					placeholder='Описание курса'
					onChange={change}
					value={form.descriptionOfCourse}
				/>
				<button onClick={handleUploadCourse}>Создать курс</button>
			</div>
		</div>
	)
}

export default CreateCourse
