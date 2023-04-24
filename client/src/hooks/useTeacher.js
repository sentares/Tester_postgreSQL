import { toast } from 'react-toastify'
import { useHttp } from './useHttp'
import { useState } from 'react'

const useTeacher = (form, setForm, id_teacher) => {
	const { request } = useHttp()
	const [allTeachers, setAllTeachers] = useState(null)
	const [specialTeacher, setSpecialTeacher] = useState(null)
	const [isSuccesRequest, setIsSuccesRequest] = useState(null)

	const getAllTeachers = async () => {
		const { data } = await request('/teacher')
		setAllTeachers(data)
	}

	const getSpecialTeahcer = async () => {
		const { data } = await request(`/teacher/getSpecial/${id_teacher}`)
		setSpecialTeacher(data)
	}

	const handleCreateTeacher = async () => {
		const {
			name,
			surname,
			patronymic,
			birthday,
			temp_inn,
			email,
			password,
			role,
		} = form
		if (
			name.trim().length &&
			surname.trim().length &&
			patronymic.trim().length &&
			birthday.trim().length &&
			temp_inn.trim().length &&
			email.trim().length &&
			password.trim().length &&
			role.trim().length
		) {
			const { type, message } = await request('/teacher/create', 'POST', {
				name: name.trim(),
				surname: surname.trim(),
				patronymic: patronymic.trim(),
				birthday: birthday.trim(),
				temp_inn: temp_inn.trim(),
				email: email.trim(),
				password: password.trim(),
				role: role.trim(),
			})
			toast[type](message)
			if (type === 'success') {
				setForm({
					name: '',
					surname: '',
					patronymic: '',
					birthday: '',
					temp_inn: '',
					email: '',
					password: '',
					role: '2',
				})
				await getAllTeachers()
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const editTeacher = async () => {
		const {
			name,
			surname,
			patronymic,
			birthday,
			temp_inn,
			email,
			status,
			role,
		} = form

		if (
			name.trim().length &&
			surname.trim().length &&
			patronymic.trim().length &&
			birthday.trim().length &&
			temp_inn.trim().length &&
			email.trim().length &&
			role.trim().length
		) {
			const { type, message } = await request(
				`/teacher/edit/${id_teacher}`,
				'PUT',
				{
					name: name.trim(),
					surname: surname.trim(),
					patronymic: patronymic.trim(),
					birthday: birthday.trim(),
					temp_inn: temp_inn.trim(),
					email: email.trim(),
					role: role.trim(),
					status,
				}
			)
			setIsSuccesRequest(true)
			toast[type](message)
			await getSpecialTeahcer()
			return
		}
		toast.warn('Заполните пустые поля')
	}

	return {
		handleCreateTeacher,
		getAllTeachers,
		getSpecialTeahcer,
		editTeacher,
		specialTeacher,
		allTeachers,
		isSuccesRequest,
	}
}

export default useTeacher
