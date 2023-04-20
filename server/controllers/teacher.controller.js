const db = require('../db/db')
const bcrypt = require('bcrypt')

class TeacherController {
	async getAllTeachers(req, res) {
		try {
			const { rows } = await db.query('select * from teachers')
			res.status(200).json({
				message: 'Преподователи успешно загружены',
				type: 'succes',
				data: rows,
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

	async getSpecialTeacher(req, res) {
		try {
			const { id_teacher } = req.params
			const { rows } = await db.query(
				`select * from teachers where id_teacher=$1`,
				[id_teacher]
			)
			const {
				name,
				surname,
				patronymic,
				password,
				email,
				birthday,
				role,
				status,
				temp_inn,
			} = await rows[0]

			res.status(200).json({
				message: 'Преподователь успешно загружен',
				type: 'succes',
				data: {
					name,
					surname,
					patronymic,
					email,
					birthday,
					role,
					status,
					temp_inn,
				},
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

	async createTeacher(req, res) {
		try {
			const {
				name,
				surname,
				patronymic,
				birthday,
				password,
				email,
				inn,
				role,
			} = req.body

			const { rows } = await db.query(
				'select * from teachers where temp_inn=$1',
				[inn]
			)

			if (rows.length) {
				return res.status(303).json({
					message: `Преподователь с таким ИНН уже зарегистрирован`,
					type: 'warn',
					data: [],
				})
			}
			const hashPassword = await bcrypt.hash(password, 12)

			const data = db.query(
				'INSERT INTO teachers (name, surname, patronymic, birthday, password, email, temp_inn, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
				[name, surname, patronymic, birthday, hashPassword, email, inn, role]
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

	async editTeacher(req, res) {
		try {
			const {
				name,
				surname,
				patronymic,
				birthday,
				password,
				email,
				inn,
				role,
				status,
			} = req.body

			const { rows } = db.query('')
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
