import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminPage from './Admin/adminPage/AdminPage'
import CourseList from './Admin/courseList/CourseList'
import CreateCourse from './Admin/createCourse/CreateCourse'
import CreateQuestion from './Admin/createQuestion/CreateQuestion'
import QuestionsPage from './Admin/questionsPage/QuestionsPage'
import SpecialQuestion from './Admin/specialQuestion/SpecialQuestion'
import SpecialStudent from './Admin/specialStudent/SpecialStudent'
import StudentList from './Admin/studentList/StudentList'
import TeacherList from './Admin/teacherList/TeacherList'
import LoginAdmin from './Auth/adminLogin/LoginAdmin'
import LoginPage from './Auth/login/LoginPage'
import RegisterPage from './Auth/register/RegisterPage'
import HomePage from './Student/homePage/HomePage'
import TestsPage from './Student/testsPage/TestsPage'
import TESTER from './Test/TESTER'

const Router = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)
	const { role } = user
	console.log(isAuth)
	console.log(role)

	if (isAuth && role === 1) {
		return (
			<Routes>
				<Route path='/loginAdmin' element={<Navigate replace to='/' />} />
				<Route path='/' element={<Navigate replace to='/admin' />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/check' element={<StudentList />} />
				<Route path='/createCourse' element={<CreateCourse />} />
				<Route path='/student/:id_student' element={<SpecialStudent />} />
				<Route path='/questions' element={<QuestionsPage />} />
				<Route path='/question/:id_question' element={<SpecialQuestion />} />
				<Route path='/create' element={<CreateQuestion />} />
				<Route path='/courseList' element={<CourseList />} />
				<Route path='/teacherList' element={<TeacherList />} />
				<Route path='/t' element={<TESTER />} />
			</Routes>
		)
	} else if (isAuth) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/tests' element={<TestsPage />} />
			</Routes>
		)
	} else {
		return (
			<Routes>
				<Route path='/' element={<Navigate replace to='/login' />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/loginAdmin' element={<LoginAdmin />} />
			</Routes>
		)
	}
}

export default Router
