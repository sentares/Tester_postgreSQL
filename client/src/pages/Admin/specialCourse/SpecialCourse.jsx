import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useCourse from '../../../hooks/useCourse'

const SpecialCourse = () => {
	const params = useParams()
	const { id_course } = params

	const { getSpecialCourse, specialCourse } = useCourse(null, id_course)

	useState(() => {
		getSpecialCourse()
	}, [])

	console.log(specialCourse)

	return <div>SpecialCourse</div>
}

export default SpecialCourse
