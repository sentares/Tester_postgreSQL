const db = require('../db/db')

class TeacherController {
	async createTeacher(req, res) {
		try {
			const { name, surname, patronymic, birthday, password, email } = req.body
			const data = db.query(
				'INSERT INTO teachers (name, surname, patronymic, birthday, password, email) VALUES ($1, $2, $3, $4, $5, $6) returning *',
				[name, surname, patronymic, birthday, password, email]
			)

			return res.status(200).json({
				message: 'Преподователь добавлен',
				type: 'success',
				data: data,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				type: 'error',
				data: [],
			})
		}
	}
}

module.exports = new TeacherController()
