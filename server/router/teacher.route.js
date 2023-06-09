const { Router } = require('express')
const TeacherController = require('../controllers/teacher.controller')

const router = Router()

router.get('/', TeacherController.getAllTeachers)
router.get('/getSpecial/:id_teacher', TeacherController.getSpecialTeacher)
router.post('/create', TeacherController.createTeacher)
router.put('/edit/:id_teacher', TeacherController.editTeacher)

module.exports = router
