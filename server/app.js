require('dotenv').config()
const express = require('express')
const http = require('http')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(logger('dev'))
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)
app.use('/api', require('./router/index'))
app.use('/frames', express.static('uploads/students/:id_student/screen/frames'))
app.use('/images', express.static('uploads/questions/:id_question'))
app.use('/audio', express.static('uploads/questions/:id_question'))

const publicPath = path.join(__dirname, 'public')
const uploadsPath = path.join(__dirname, 'uploads')

app.use(express.static(publicPath))
app.use('/uploads', express.static(uploadsPath))
app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'))
})
const server = http.createServer(app)

server.listen(PORT, () => console.log(`Start server in port ${PORT}`))
