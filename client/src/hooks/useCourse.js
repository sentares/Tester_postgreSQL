import React, { useState } from 'react'
import { useHttp } from './useHttp'
import { toast } from 'react-toastify'

const useCourse = form => {
	const { request } = useHttp()
	const [allCourses, setAllCourses] = useState(null)

	const createCourse = async () => {
		const { nameOfCourse, descriptionOfCourse } = form
		try {
			const { message, type } = await request('/createCourse/', 'POST', {
				nameOfCourse,
				descriptionOfCourse,
			})
			toast[type](message)
		} catch (e) {
			console.log(e)
		}
	}

	const getAllCourse = async () => {
		const { data } = await request('/createCourse/get')
		setAllCourses(data)
	}

	return { createCourse, getAllCourse, allCourses }
}

export default useCourse
