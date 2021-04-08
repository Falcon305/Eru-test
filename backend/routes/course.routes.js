import express from 'express'
const router = express.Router()
import {
  getCourses,
  getCourseById,
  deleteCourse,
  createCourse,
  updateCourse,
  getCourseSyllabi,
  enrollInCourse,
  createCourseReview,
  getTopCourses,
  getProfessorCourses,
  getProfessorCourseById,
} from '../controllers/course.controllers.js'
import {protectProfessor, protectStudent} from '../middlewares/auth.middleware.js'

router.route('/').get(getCourses).post(protectProfessor, createCourse)
router.route('/:id/reviews').post(protectStudent, createCourseReview)
router.get('/top', getTopCourses)
router.route('/my-courses').get(protectProfessor ,getProfessorCourses)
router.route('/my-courses/:id').get(protectProfessor ,getProfessorCourseById)

router
  .route('/:id')
  .get(getCourseById)
  .delete(protectProfessor, deleteCourse)
  .put(protectProfessor, updateCourse)
  .post(protectStudent, enrollInCourse)
router.route('/:id/syllabi').get(getCourseSyllabi)

export default router