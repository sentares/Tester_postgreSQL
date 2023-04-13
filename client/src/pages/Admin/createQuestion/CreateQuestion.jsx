import React, { useState } from 'react'
import CreateAnswerItem from '../../../components/createAnswerItem/CreateAnswerItem'
import styles from './createQuestion.module.css'
import { useHttp } from '../../../hooks/useHttp'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateQuestion = () => {
	const navigate = useNavigate()
	const { request } = useHttp()
	const [question, setQuestion] = useState('')
	const [options, setOptions] = useState([
		{ number: 1, text: '', isCorrect: true },
		{ number: 2, text: '', isCorrect: false },
		{ number: 3, text: '', isCorrect: false },
		{ number: 4, text: '', isCorrect: false },
	])

	const handleOptionTextChange = (optionNumber, optionText) => {
		setOptions(
			options.map(option => {
				if (option.number === optionNumber) {
					return { ...option, text: optionText }
				} else {
					return option
				}
			})
		)
	}

	const handleCorrectOptionChange = correctOption => {
		setOptions(
			options.map(option => {
				if (option.number === correctOption) {
					return { ...option, isCorrect: true }
				} else {
					return { ...option, isCorrect: false }
				}
			})
		)
	}

	const handleSubmit = async event => {
		event.preventDefault()
	}

	const handleCreateQuestion = async () => {
		const isAllFieldsFilled =
			question !== '' && options.every(option => option.text !== '')
		if (isAllFieldsFilled) {
			const data = await request('/edit/create/question', 'POST', {
				question,
				options,
			})
			navigate('/questions')
			console.log(data)
		} else {
			// Вызываем функцию toast.error() для показа уведомления об ошибке
			toast.error('Пожалуйста, заполните все поля.')
		}
	}

	return (
		<div className={styles.create}>
			<form onSubmit={handleSubmit}>
				<label>
					Вопрос:
					<input
						type='text'
						value={question}
						onChange={e => setQuestion(e.target.value)}
					/>
				</label>
				{options.map(option => (
					<CreateAnswerItem
						key={option.number}
						option={option}
						onTextChange={handleOptionTextChange}
						onCorrectChange={handleCorrectOptionChange}
					/>
				))}
				<button
					type='submit'
					onClick={handleCreateQuestion}
					disabled={!question || options.some(option => option.text === '')}
				>
					Сохранить
				</button>
			</form>
		</div>
	)
}

export default CreateQuestion
