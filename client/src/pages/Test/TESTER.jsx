import React, { useState } from 'react'

const TESTER = () => {
	const [currentIndex, setCurrentIndex] = useState(0) // Индекс текущего вопроса

	const questions = [
		{ id_question: 1, question: 'hello' },
		{ id_question: 2, question: 'heqweqwello' },
		{ id_question: 6, question: 'heqweqwello' },
		{ id_question: 10, question: 'qwewq' },
		{ id_question: 11, question: 'safas' },
	]

	const handleNextQuestion = () => {
		// Если достигли конца массива, сбрасываем индекс на 0
		if (currentIndex === questions.length - 1) {
			setCurrentIndex(0)
		} else {
			setCurrentIndex(prevIndex => prevIndex + 1) // Увеличиваем индекс на 1
		}
		console.log(currentIndex)
	}

	console.log(questions[currentIndex])

	return (
		<div>
			<p style={{ color: 'red' }}>{questions[currentIndex].question}</p>{' '}
			<button onClick={handleNextQuestion} style={{ background: 'green' }}>
				Следующий вопрос
			</button>{' '}
		</div>
	)
}

export default TESTER
