const { Router } = require('express')
const CreateCourseController = require('../controllers/createCourse.controller')

const router = Router()

router.post('/', CreateCourseController.createCourse)

module.exports = router
