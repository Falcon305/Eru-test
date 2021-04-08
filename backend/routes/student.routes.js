import express from 'express'
const router = express.Router()
import {
    authStudent,
    registerStudent,
    getStudentProfile,
    getStudentById,
    getStudents,
    deleteStudentById,
    updateStudentProfile,
} from '../controllers/student.controllers.js'
import {protectStudent} from '../middlewares/auth.middleware.js'

router.route('/').post(registerStudent).get(protectStudent, getStudents)
router.post('/login', authStudent)
router
    .route('/profile')
    .get(protectStudent, getStudentProfile)
    .put(protectStudent, updateStudentProfile)
router
    .route('/:id')
    .delete(protectStudent, deleteStudentById)
    .get(protectStudent, getStudentById)

export default router
