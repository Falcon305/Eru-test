import express from 'express'
const router = express.Router()
import {
    getSyllabi,
    getSyllabus,
    createSyllabus,
    deleteSyllabus,
    updateSyllabus,
    getProfessorSyllabusById,
    createSyllabusVideo,
} from '../controllers/syllabus.controllers.js'
import {protectProfessor} from '../middlewares/auth.middleware.js'

router.route('/').get(getSyllabi).post(protectProfessor, createSyllabus)
router
    .route('/my-syllabi/:id')
    .get(protectProfessor ,getProfessorSyllabusById)
router
    .route('/my-syllabi/:id/add-video')
    .post(protectProfessor ,createSyllabusVideo)
router
    .route('/:id')
    .get(getSyllabus)
    .put(protectProfessor, updateSyllabus)
    .delete(protectProfessor, deleteSyllabus)

export default router