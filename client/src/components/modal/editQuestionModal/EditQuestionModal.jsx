import React, { useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { FiMusic } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import useEditQuestion from '../../../hooks/useEditQuestion'
import styles from './editQuestion.module.css'

const EditQuestionModal = ({
	setOpenEditModal,
	test,
	getSpecialQuestionForEdit,
	image_question,
	audio_question,
}) => {
	const [question, setTitle] = useState(test.question)
	const [originalQuestion] = useState(test.question)
	const [selectedImage, setSelectedImage] = useState(null)
	const [selectedAudio, setSelectedAudio] = useState(null)
	const [imageQuestionURL, setImageQuestionUrl] = useState(image_question?.path)
	const [audioQuestionURL, setAudioQuestionURL] = useState(audio_question?.path)
	const [audio, setAudio] = useState('')
	const [image, setImage] = useState('')
	const isQuestionChanged = question !== originalQuestion
	const { id_question } = test

	const changeTitle = e => {
		e.preventDefault()
		setTitle(e.target.value)
	}
	const clickCloseModal = e => {
		e.preventDefault()
		setOpenEditModal(false)
	}
	const handleCloseImage = () => {
		setSelectedImage(null)
	}

	const handleFileChange = e => {
		setSelectedImage(e.target.files[0])
		const file = e.target.files[0]
		const imageUrl = URL.createObjectURL(file)
		setImage(imageUrl)
	}

	const handleAudioChange = e => {
		setSelectedAudio(e.target.files[0])
		const file = e.target.files[0]
		const audioUrl = URL.createObjectURL(file)
		setAudio(audioUrl)
	}

	const {
		changeQuestionTitle,
		handleSavePhoto,
		deleteQuestionImage,
		deleteQuestionAudio,
		handleSaveAudio,
	} = useEditQuestion(
		question,
		id_question,
		selectedImage,
		image_question,
		audio_question,
		selectedAudio
	)

	async function handleSaveEdits() {
		try {
			if (isQuestionChanged) {
				await changeQuestionTitle()
			}
			if (selectedImage) {
				await handleSavePhoto()
			}
			if (selectedAudio) {
				await handleSaveAudio(selectedAudio)
			}
			setOpenEditModal(false)
			getSpecialQuestionForEdit()
		} catch (e) {
			toast.error('Ошибка сохранения изменений')
			console.log(e)
		}
	}

	const handleDeleteQuestionImage = async () => {
		await deleteQuestionImage()
		setImageQuestionUrl(null)
		await getSpecialQuestionForEdit()
	}

	const handleDeleteQuestionAudio = async () => {
		await deleteQuestionAudio(audio_question)
		setAudioQuestionURL('')
		await getSpecialQuestionForEdit()
	}

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<div className={styles.close}>
					<button className={styles.closeIcon} onClick={clickCloseModal}>
						<MdOutlineClose />
					</button>
				</div>
				<div className={styles.text}>
					<div className={styles.inputBlock}>
						<input
							className={styles.input}
							type='text'
							placeholder={question}
							onChange={changeTitle}
							value={question}
						/>
					</div>
					<div className={styles.buttonBlock}>
						{audioQuestionURL ? (
							<div className={styles.audioBlock}>
								<audio controls>
									<source
										src={`http://localhost:443/${audioQuestionURL}`}
										type='audio/mpeg'
									/>
								</audio>
								<button
									className={styles.deleteAudioButton}
									onClick={handleDeleteQuestionAudio}
								>
									Удалить аудио
								</button>
							</div>
						) : (
							<>
								{selectedAudio ? (
									<div>
										<audio controls>
											<source src={audio} type='audio/mpeg' />
										</audio>
									</div>
								) : (
									<>
										<label htmlFor='audioInput' className={styles.playerButton}>
											<FiMusic />
										</label>
										<input
											id='audioInput'
											className={styles.audioInput}
											type='file'
											onChange={handleAudioChange}
											style={{ display: 'none' }}
										/>
									</>
								)}
							</>
						)}

						{imageQuestionURL ? (
							<div className={styles.imageBlock}>
								<img
									className={styles.selectedImage}
									src={`http://localhost:443/${imageQuestionURL}`}
									alt='photo'
								/>
								<button
									className={styles.closeImage}
									onClick={handleDeleteQuestionImage}
								>
									<MdOutlineClose />
								</button>
							</div>
						) : (
							<>
								<input
									className={styles.fileInput}
									type='file'
									onChange={handleFileChange}
								/>
								{selectedImage ? (
									<div className={styles.imageBlock}>
										<img
											src={image}
											alt='Selected image'
											className={styles.selectedImage}
										/>
										<button
											className={styles.closeImage}
											onClick={handleCloseImage}
										>
											<MdOutlineClose />
										</button>
									</div>
								) : (
									<button
										className={styles.galleryButton}
										onClick={() => {
											document.querySelector(`.${styles.fileInput}`).click()
										}}
									>
										<BsImage />
									</button>
								)}
							</>
						)}

						<button
							className={
								isQuestionChanged || selectedImage || selectedAudio
									? styles.save
									: styles.unsave
							}
							// disabled={!isQuestionChanged || !selectedImage}
							onClick={handleSaveEdits}
						>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditQuestionModal
