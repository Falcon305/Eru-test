import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middlewares/error.middleware.js'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import path from 'path'
import courseRoutes from './routes/course.routes.js'
import syllabusRoutes from './routes/syllabus.routes.js'
import professorRoutes from './routes/professor.routes.js'
import studentRoutes from './routes/student.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import VideoRoutes from './routes/video.routes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(bodyParser.json())

app.use('/api/courses', courseRoutes)
app.use('/api/professors', professorRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/courses/:id/syllabus', syllabusRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/video', VideoRoutes)

// Make the uplads folder static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/videos', express.static(path.join(__dirname, '../videos')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)