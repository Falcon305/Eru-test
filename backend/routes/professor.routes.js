import express from 'express'
const router = express.Router()
import {
  authProfessor,
  registerProfessor,
  getProfessorProfile,
  getProfessors,
  getProfessorById,
  deleteProfessor,
  updateProfessorProfile,
} from '../controllers/professor.controllers.js'
import {protectProfessor} from '../middlewares/auth.middleware.js'

router.route('/').post(registerProfessor).get(protectProfessor, getProfessors)
router.post('/login', authProfessor)
router
  .route('/profile')
  .get(protectProfessor, getProfessorProfile)
  .put(protectProfessor, updateProfessorProfile)
router
  .route('/:id')
  .delete(protectProfessor, deleteProfessor)
  .get(protectProfessor, getProfessorById)

export default router