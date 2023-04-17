import { useState } from 'react'
import { useHttp } from './useHttp'

const useGetQuestions = chosedQuestion => {
	const { request } = useHttp()
	const [allTests, setAllTests] = useState([])
	const [test, setTest] = useState()
	const [id_question, setIdQuestion] = useState(null)
	const [currentIndex, setCurrentIndex] = useState(0)

	const getQuestions = async () => {
		const { data } = await request('/tests')
		setAllTests(data)
	}

	const getSpecialQuestion = async () => {
		// const { data } = await request(`/tests/special/${id_question}`)
		// setTest(data)
		setTest(allTests[currentIndex])
		if (currentIndex !== -1) {
			setIdQuestion(allTests[currentIndex].id_question)
		} else {
			return
		}
	}

	const getSpecialQuestionForEdit = async () => {
		const { data } = await request(`/tests/special/${chosedQuestion}`)
		setTest(data)
	}

	return {
		allTests,
		test,
		id_question,
		getQuestions,
		setIdQuestion,
		getSpecialQuestion,
		getSpecialQuestionForEdit,
		currentIndex,
		setCurrentIndex,
	}
}

export default useGetQuestions
