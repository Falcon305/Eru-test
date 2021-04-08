import Course from '../models/courses.model.js'
import Student from '../models/student.model.js'
import asyncHandler from 'express-async-handler'
import Syllabus from '../models/sylabbus.model.js'

// @desc  Fetch All Courses
// @route /api/courses
// @accsess Public
const getCourses = asyncHandler(async (req, res) => {
  const pageSize = 20
  const page = Number(req.query.pageNumber) || 1
  
  const keyword = req.query.keyword
  ? {
      title: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
  : {}

  const count = await Course.countDocuments({ ...keyword })
  const courses = await Course.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ courses, page, pages: Math.ceil(count / pageSize) })
  })
  
// @desc  Fetch All Professor Courses
// @route /api/courses/courses
// @accsess Public
const getProfessorCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({professor:req.professor._id})
  if (courses) {
    res.json(courses)
  } else {
    res.status(400)
    throw new Error('Professor Does not have any published courses')
  }
})

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    console.log('Not Found')
    throw new Error('Course not found')
  }
})

// @desc    Fetch Professor course by ID
// @route   GET /api/courses/my-courses/:id
// @access  Private / Prof-courseOwner
const getProfessorCourseById = asyncHandler(async (req, res) => {
  console.log('Entered')
  const professor = req.professor._id
  const course = await Course.findById(req.params.id)
  console.log(course.professor)
  console.log(professor)
  if (course.professor.toString() == professor) {
    res.json(course)
  } else  {
    res.status(400)  
    throw new Error('You do not have access to this page')
  }
})

// @desc    Delete a Course
// @route   DELETE /api/courses/:id
// @access  Private/Professor
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    await course.remove()
    res.json({ message: 'Course removed' })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Create a Course
// @route   POST /api/courses
// @access  Private/Professor
const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    duration,
    difficulty,
    image,
  } = req.body

  const professor = req.professor._id
  const courseExists = await Course.findOne({ title })

  if (courseExists) {
    res.status(400)
    throw new Error('Course Title is taken')
  }

  const course = await Course.create({
    title,
    description,
    duration,
    difficulty,
    image,
    professor,
  })

  if (course) {
    res.status(201).json({ course })
  } else {
    res.status(400)
    throw new Error('Invalid course data')
  }

  // const course = new Course({
  //   title: req.body.title,
  //   description: req.body.description,
  //   professor: req.professor._id,
  //   duration: req.body.duration,
  //   difficulty: req.body.difficulty,
  //   isPublic: req.body.isPublic,
  //   certificate: req.body.certificate,
  //   image: req.body.image,
  // })
  
  // const createdCourse = await course.save()
  // res.status(201).json(createdCourse)
})

// @desc    Update a Course
// @route   PUT /api/Courses/:id
// @access  Private/Professor
const updateCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    duration,
    difficulty,
    isPublic,
    certificate,
    image,
  } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
      course.title = title
      course.description = description
      course.duration = duration
      course.difficulty = difficulty
      course.isPublic = isPublic
      course.certificate = certificate
      course.image = image

      const updatedCourse = await course.save()
      res.json(updatedCourse)
  } else {
      res.status(404)
      throw new Error('Course not found')
  }
})

// @desc    Update syllabus
// @route   POST /api/courses/:id/syllabi/:id
// @access  Private/Prefessor | Course owner
const getCourseSyllabi = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    const syllabi = await Syllabus.find().where('_id').in(course.syllabus).exec()
    if (syllabi) {
      res.json({syllabi})
    }
  } else {
    res.status(404)
    throw new Error('Course Syllabus Not Found')
  }
})

// @desc    Enroll in course
// @route   POST /api/courses/:id/
// @access  Private/Student
const enrollInCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  const student = await Student.findById(req.student._id)
  if (course && student) {
    const isEnrolled = await Student.findOne({courses: course})
    console.log(isEnrolled)
    if (!isEnrolled){
      course.students.push(student)
      student.courses.push(course)
      course.save()
      student.save()
      console.log('Student enrolled in the course sucessfuly !!')
      res.json({course, student})
    } else {
      res.status(404)
      throw new Error('Student Already Enrolled')
    }
  } else {
    res.status(400)
    throw new Error('Course or student not found')
  }
})

// @desc    Create new review
// @route   POST /api/courses/:id/reviews
// @access  Private/Student
const createCourseReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
    const alreadyReviewed = course.reviews.find(
      (r) => r.student.toString() === req.student._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Course already reviewed')
    }

    const review = {
      name: req.student.firstName,
      rating: Number(rating),
      comment,
      user: req.student._id,
    }

    course.reviews.push(review)

    course.numReviews = course.reviews.length

    course.rating =
      course.reviews.reduce((acc, item) => item.rating + acc, 0) /
      course.reviews.length

    await course.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc    Get top rated courses
// @route   GET /api/courses/top
// @access  Public
const getTopCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).sort({ rating: -1 }).limit(4)

  res.json(courses)
})

  export {
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
  }