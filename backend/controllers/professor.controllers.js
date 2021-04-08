import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Professor from '../models/professor.model.js'
import Student from '../models/student.model.js'

// @desc    Auth professor & get token
// @route   POST /api/users/login
// @access  Public
const authProfessor = asyncHandler(async (req, res) => {

  const { email, password } = req.body
  const professor = await Professor.findOne({ email })
  const student = await Student.findOne({ email })
  
  if (professor && (await professor.matchPassword(password))) {
    res.json({
        _id: professor._id,
        firstName: professor.firstName,
        lastName: professor.lastName,
        email: professor.email,
        token: generateToken(professor._id),
    })
  } else if (student && (await student.matchPassword(password))) {
    res.json({
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        token: generateToken(student._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new professor
// @route   POST /api/professors
// @access  Public
const registerProfessor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const professorExists = await Professor.findOne({ email })

  if (professorExists) {
    res.status(400)
    throw new Error('Professor already exists')
  }

  const professor = await Professor.create({
    firstName,
    lastName,
    email,
    password,
  })

  if (professor) {
    res.status(201).json({
        _id: professor._id,
        firstName: professor.firstName,
        lastName: professor.lastName,
        email: professor.email,
        token: generateToken(professor._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid professor data')
  }
})

// @desc    Get professor profile
// @route   GET /api/users/profile
// @access  Private
const getProfessorProfile = asyncHandler(async (req, res) => {
  const professor = await Professor.findById(req.professor._id)

  if (professor) {
    res.json({
        _id: professor._id,
        firstName: professor.firstName,
        lastName: professor.lastName,
        email: professor.email,
    })
  } else {
    res.status(404)
    throw new Error('Professor not found')
  }
})

// @desc    Update Professor profile
// @route   PUT /api/professor/profile
// @access  Private
const updateProfessorProfile = asyncHandler(async (req, res) => {
  const prof = await Professor.findById(req.professor._id)

  if (prof) {
    prof.firstName = req.body.firstName || prof.firstName
    prof.lastName = req.body.lastName || prof.lastName
    prof.email = req.body.email || prof.email
    if (req.body.password) {
      prof.password = req.body.password
    }

    const updatedprof = await prof.save()

    res.json({
      _id: updatedprof._id,
      firstName: updatedprof.name,
      lastName: updatedprof.lastName,
      email: updatedprof.email,
      token: generateToken(updatedprof._id),
    })
  } else {
    res.status(404)
    throw new Error('Professor not found')
  }
})

// @desc    Get all Professors
// @route   GET /api/professors
// @access  Private/Admin
const getProfessors = asyncHandler(async (req, res) => {
  const professors = await Professor.find({})
  res.json(professors)
})

// @desc    Delete professors
// @route   DELETE /api/professor/:id
// @access  Private/Admin
const deleteProfessor = asyncHandler(async (req, res) => {
  const professor = await Professor.findById(req.params.id)

  if (professor) {
    await professor.remove()
    res.json({ message: 'Professor removed' })
  } else {
    res.status(404)
    throw new Error('Professor not found')
  }
})

// @desc    Get professor by ID
// @route   GET /api/professors/:id
// @access  Private/Admin
const getProfessorById = asyncHandler(async (req, res) => {
  const professor = await Professor.findById(req.params.id).select('-password')

  if (professor) {
    res.json(professor)
  } else {
    res.status(404)
    throw new Error('Professor not found')
  }
})


export {
  authProfessor,
  registerProfessor,
  getProfessorProfile,
  getProfessors,
  deleteProfessor,
  getProfessorById,
  updateProfessorProfile,
}