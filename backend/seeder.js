import mongoose from 'mongoose'
import dotenv from 'dotenv'
import professors from './data/professors.js'
import courses from './data/courses.js'
import Professor from './models/professor.model.js'
import Course from './models/courses.model.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Course.deleteMany()
    await Professor.deleteMany()

    const createdProfessors = await Professor.insertMany(professors)
    
    const sampleCourses = courses.map((course) => {
      return { ...Course, Professor }
    })

    await Course.insertMany(sampleCourses)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Course.deleteMany()
    await Professor.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}