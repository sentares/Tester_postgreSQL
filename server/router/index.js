const express = require('express')

const app = express()

app.use('/auth', require('./auth.route'))
app.use('/tests', require('./tests.route'))
app.use('/result', require('./result.route'))
app.use('/checkStudent', require('./check.route'))
app.use('/video', require('./video.route'))
app.use('/screen', require('./screen.route'))
app.use('/edit', require('./edit.route'))
app.use('/tester', require('./tester.route'))
app.use('/course', require('./course.route'))
app.use('/teacher', require('./teacher.route'))

module.exports = app
