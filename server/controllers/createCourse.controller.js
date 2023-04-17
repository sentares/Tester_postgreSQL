const db = require('../db/db')

class CreateCourseController {
	async createCourse(req, res) {
		try {
			const { nameOfCourse, descriptionOfCourse } = req.body

			const data = await db.query(
				'INSERT INTO course (course_name, course_description) VALUES ($1, $2)',
				[nameOfCourse, descriptionOfCourse]
			)

			return res.status(200).json({
				message: 'Курс успешно создан',
				type: 'success',
				data: [],
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

module.exports = new CreateCourseController()
