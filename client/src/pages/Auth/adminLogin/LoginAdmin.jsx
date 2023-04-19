import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useHttp } from '../../../hooks/useHttp'
import { setIsAuth, setUser } from '../../../redux/slices/authSlice'
import styles from './loginAdmin.module.css'

const LoginAdmin = () => {
	const { request } = useHttp()
	const dispath = useDispatch()
	const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(true)
	const [tryCount, setTryCount] = useState(null)
	const [isActive, setIsActive] = useState(true)

	const getData = data => {
		dispath(setUser(data))
		dispath(setIsAuth(true))
	}

	const [form, setForm] = useState({
		login: '',
		password: '',
	})

	const handleLogin = async e => {
		e.preventDefault()
		const { login, password } = form
		if (!isCaptchaSuccessful) {
			return toast.warn('Подтвердите что вы не робот')
		}
		if (login.trim().length && password.trim().length) {
			const { data, accessToken, message, type } = await request(
				'/auth/loginAdmin',
				'POST',
				{ login: login.trim(), password: password.trim() }
			)
			toast[type](message)
			setIsActive(data.activ)
			setTryCount(data.try_count)
			if (accessToken.length) {
				getData(data)
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })
	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	let stayedCount = 5 - tryCount

	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				<form>
					<div>ADMIN</div>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input
								type='login'
								name='login'
								className={styles.registerInput}
								placeholder='Ваш login'
								value={form.login}
								onChange={change}
							/>
						</div>
						<div className={styles.inputBlock}>
							<input
								type='password'
								className={styles.registerInput}
								placeholder='Ваш пароль'
								value={form.password}
								name='password'
								onChange={change}
							/>
						</div>
						{/* <div className={styles.captcha}>
							<ReCAPTCHA sitekey={recaptchaKey} onChange={onChangeRecap} />
						</div> */}
						{stayedCount !== 0 || isActive ? (
							<button className={styles.buttonRegister} onClick={handleLogin}>
								Войти
							</button>
						) : (
							<button className={styles.buttonStoped}>
								Ваша учетная запись временно заблокирована из-за нескольких
								неудачных попыток авторизации. Обратитесь к администратору.
							</button>
						)}
						{tryCount && <div>Осталось попыток: {stayedCount}</div>}
						<div className={styles.haveAcc}>
							<p className={styles.acc}>
								Нет аккаунта?
								<Link to='/register' className={styles.signIn}>
									Регистрация
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginAdmin
