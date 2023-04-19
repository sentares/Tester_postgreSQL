const { Router } = require('express')
const TeacherController = require('../controllers/teacher.controller')

const router = Router()

router.post('/create', TeacherController.createTeacher)

module.exports = router
