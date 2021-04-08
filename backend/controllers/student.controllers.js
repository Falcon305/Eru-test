import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Student from '../models/student.model.js'
//import validator from 'express-validator'
//const {check, isEmail, normalizeEmail} = validator

// @desc    Auth student and get token
// @route   POST /api/users/login
// @access Public
const authStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const student = await Student.findOne({ email })
    
    if (student && (await student.matchPassword(password))) {
        res.json({
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            token: generateToken(student._id) 
        })
    } else {
        res.status(404)
        throw new Error('Invalid email or password')
    }
})

// @desc Register a new student
// @route POST api/students
// @access Public
const registerStudent = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password} = req.body

    const studentExists = await Student.findOne({ email })

    if (studentExists) {
        res.status(404)
        throw new Error('Student already exists')
    }

    const student = await Student.create({
        firstName,
        lastName,
        email,
        password,
    })

    if (student) {
        res.status(201).json({
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            token: generateToken(student._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid student data')
    }
})

// @desc    Get student profile
// @route   GET /api/users/profile
// @access  Private
const getStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id)

    if (student) {
        res.json({
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
        })
    } else {
        res.status(400)
        throw new Error('Student not found')
    }
})

// @desc    Update Professor profile
// @route   PUT /api/professor/profile
// @access  Private
const updateStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id)
  
    if (student) {
      student.firstName = req.body.firstName || student.firstName
      student.lastName = req.body.lastName || student.lastName
      student.email = req.body.email || student.email
      if (req.body.password) {
        student.password = req.body.password
      }
  
      const updatedstudent = await student.save()
  
      res.json({
        _id: updatedstudent._id,
        firstName: updatedstudent.name,
        lastName: updatedstudent.lastName,
        email: updatedstudent.email,
        token: generateToken(updatedstudent._id),
      })
    } else {
      res.status(404)
      throw new Error('Student not found')
    }
  })

// @desc    Get all Students
// @route   GET /api/students
// @access  Public
const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({})
    res.json(students)
})

// @desc    Delete Student Account
// @route   DELETE /api/student/id
// @access  Private/Admin
const deleteStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id)

    if (student) {
        res.json(student)
    } else {
        res.status(400)
        throw new Eroor('Student not found')
    }
})

// @desc    Get student by ID
// @route   GET /api/student/:id
// @access  Priivate/Users
const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params._id)

    if (student) {
        res.json(student)
    } else {
        res.status(400)
        throw new Eroor('Student not found')
    }
})


export {
    authStudent,
    registerStudent,
    getStudentProfile,
    getStudents,
    deleteStudentById,
    getStudentById,
    updateStudentProfile,
}