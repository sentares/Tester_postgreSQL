const { Router } = require('express')
const CourseController = require('../controllers/course.controller')

const router = Router()

router.post('/', CourseController.createCourse)
router.get('/get', CourseController.getAllCourse)
router.get('/getSpecial/:id_course', CourseController.getSpecialCourse)

module.exports = router
