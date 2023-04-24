import { useState } from 'react'
import { toast } from 'react-toastify'
import { useHttp } from './useHttp'

const useCourse = (form, id_course) => {
	const { request } = useHttp()
	const [allCourses, setAllCourses] = useState(null)
	const [specialCourse, setSpecialCourse] = useState(null)

	const createCourse = async () => {
		const { nameOfCourse, descriptionOfCourse } = form
		try {
			const { message, type } = await request('/course/', 'POST', {
				nameOfCourse,
				descriptionOfCourse,
			})
			toast[type](message)
		} catch (e) {
			console.log(e)
		}
	}

	const getAllCourse = async () => {
		const { data } = await request('/course/get')
		setAllCourses(data)
	}

	const getSpecialCourse = async () => {
		const { data } = await request(`/course/getSpecial/${id_course}`)
		setSpecialCourse(data)
	}

	return {
		createCourse,
		getAllCourse,
		getSpecialCourse,
		specialCourse,
		allCourses,
	}
}

export default useCourse
