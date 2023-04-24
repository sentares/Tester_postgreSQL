const db = require('../db/db')

class CourseController {
	async createCourse(req, res) {
		try {
			const { nameOfCourse, descriptionOfCourse } = req.body

			const { rows } = await db.query(
				'INSERT INTO course (course_name, course_description) VALUES ($1, $2) returning *',
				[nameOfCourse, descriptionOfCourse]
			)

			return res.status(200).json({
				message: 'Курс успешно создан',
				type: 'success',
				data: rows,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				status: 'error',
				data: [],
			})
		}
	}

	async getAllCourse(req, res) {
		try {
			const { rows } = await db.query(
				'select * from course order by id_course asc'
			)

			return res.status(200).json({
				message: 'Курсы успешно получены',
				type: 'success',
				data: rows,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				status: 'error',
				data: [],
			})
		}
	}

	async getSpecialCourse(req, res) {
		try {
			const { id_course } = req.params
			const { rows } = await db.query(
				'select * from course where id_course=$1',
				[id_course]
			)
			return res.status(200).json({
				message: 'Курсы успешно получены',
				type: 'success',
				data: rows,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				status: 'error',
				data: [],
			})
		}
	}
}

module.exports = new CourseController()
