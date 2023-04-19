import React, { useState } from 'react'
import styles from './createTeacherModal.module.css'
import { MdOutlineClose } from 'react-icons/md'
import InputMask from 'react-input-mask'

const CreateTeacherModal = ({ handleCloseCreateTeacherModal }) => {
	return (
		<div className={styles.createTeacherModal}>
			<div className={styles.content}>
				<div className={styles.close}>
					<button
						className={styles.closeIcon}
						onClick={handleCloseCreateTeacherModal}
					>
						<MdOutlineClose />
					</button>
				</div>
				<form>
					<input type='text' placeholder='имя' />
					<input type='text' placeholder='фамилия' />
					<input type='text' placeholder='отчество' />
					<input type='number' pattern='\+996 \(\d{3}\) \d{3} \d{3}' />

					<input type='text' placeholder='login' />
					<input type='text' placeholder='пароль' />
				</form>
			</div>
		</div>
	)
}

export default CreateTeacherModal
