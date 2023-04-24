import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import styles from './createTeacherModal.module.css'

const CreateTeacherModal = ({
	form,
	change,
	handleOpenChangeTeacherModal,
	handleSubmit,
}) => {
	return (
		<div className={styles.createTeacherModal}>
			<div className={styles.content}>
				<div className={styles.close}>
					<button
						className={styles.closeIcon}
						onClick={handleOpenChangeTeacherModal}
					>
						<MdOutlineClose />
					</button>
				</div>
				<div className={styles.createForm}>
					<form>
						<input
							value={form.name}
							name='name'
							type='text'
							className={styles.infoInput}
							placeholder='имя'
							onChange={change}
						/>
						<input
							value={form.surname}
							name='surname'
							type='text'
							className={styles.infoInput}
							placeholder='фамилия'
							onChange={change}
						/>
						<input
							value={form.patronymic}
							name='patronymic'
							type='text'
							className={styles.infoInput}
							placeholder='отчество'
							onChange={change}
						/>
						<input
							value={form.birthday}
							name='birthday'
							type='text'
							className={styles.infoInput}
							placeholder='дата рождения'
							onChange={change}
						/>
						<input
							value={form.temp_inn}
							name='temp_inn'
							type='text'
							className={styles.infoInput}
							placeholder='ИНН'
							onChange={change}
						/>
						<input
							value={form.email}
							name='email'
							type='text'
							className={styles.infoInput}
							placeholder='email'
							onChange={change}
						/>
						<input
							value={form.password}
							name='password'
							type='text'
							className={styles.infoInput}
							placeholder='пароль'
							onChange={change}
						/>
						<label htmlFor='role' className={styles.label}>
							Выберите роль:
						</label>
						<select
							name='role'
							id='role'
							value={form.role}
							onChange={change}
							className={styles.infoInputRole}
						>
							<option value='3' className={styles.option}>
								Менеджер
							</option>
							<option value='2' className={styles.option}>
								Преподаватель
							</option>
						</select>
						<button
							type='button'
							className={styles.regButton}
							onClick={handleSubmit}
						>
							Зарегистрировать преподавателя
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateTeacherModal
