import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useHttp } from '../../../hooks/useHttp'
import { setIsAuth, setUser } from '../../../redux/slices/authSlice'
import styles from './admin.module.css'

const AdminPage = () => {
	const dispatch = useDispatch()
	const { request } = useHttp()
	const user = useSelector(state => state.auth.user)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const logout = async () => {
		await request('/auth/logout')
		dispatch(
			setUser({
				name: '',
				login: '',
				id_student: null,
				is_admin: null,
				role: null,
			})
		)
		dispatch(setIsAuth(false))
		navigate('/')
	}

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className={styles.home}>
					<div>
						<div className={styles.adminName}>{user.name}</div>
						<div className={styles.choseBlock}>
							<div>
								<Link to='/createCourse'>
									<button className={styles.testButton}>Создать курс</button>
								</Link>
							</div>
							<div>
								<Link to='/courseList'>
									<button className={styles.testButton}>Список курсов</button>
								</Link>
							</div>
							<div>
								<Link to='/teacherList'>
									<button className={styles.testButton}>
										Список преподователей
									</button>
								</Link>
							</div>
							<div>
								<button className={styles.exitButton} onClick={logout}>
									Выйти
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AdminPage
