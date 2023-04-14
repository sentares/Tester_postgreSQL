const { Router } = require('express')
const TesterController = require('../controllers/tester.controller')

const router = Router()

router.post('/', TesterController.TestPost)
router.get('/get', TesterController.TestGet)

module.exports = router
