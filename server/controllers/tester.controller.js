const db = require('../db/db.js')

class TesterController {
	async TestPost(req, res) {
		try {
			const { text } = req.body
			const encodedText = btoa(text)

			const { rows } = await db.query(
				'INSERT INTO tester (text_tester) VALUES ($1) RETURNING *',
				[encodedText]
			)

			res.status(201).json({
				message: 'Тесты успешно отправлены',
				type: 'success',
				data: rows[0],
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

	async TestGet(req, res) {
		try {
			const { rows } = await db.query('SELECT text_tester FROM tester')

			const decodedText = atob(rows[0].text_tester)

			res.status(201).json({
				message: 'Результаты успешно получены и расшифрованы',
				type: 'success',
				data: decodedText,
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервере',
				type: 'error',
				data: [],
			})
		}
	}
}

module.exports = new TesterController()
