import Syllabus from '../models/sylabbus.model.js'
import Course from '../models/courses.model.js'
import asyncHandler from 'express-async-handler'

// @desc    Fetch all the syllabus
// @route   GET /api/course:id/
// @access  Public
const getSyllabi = asyncHandler(async (req, res) => {
    
    const course = await Course.findById(req.params.id)
    console.log(req.params)
    const syllabi = await Syllabus.find().where('_id').in(course.syllabus).exec()
    res.json({syllabi})
})

// @desc    Fetch all professor course syllabus
// @route   GET /api/courses/my-courses/:id/syllabi
// @accses Private / Prof-courseOwner
const getProfessorCourseSyllabi = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)
    const professor = req.professor._id
    if (course.professor.toString() == professor) {
        const syllabi =  await Syllabus.find().where('_id').in(course.syllabus).exec()
        res.json({syllabi})
    } else {
        res.status(400)
        throw new Error('Hahahaha nice try')
    }
})

// @desc    get Syllabus By Id
// @route   GET /api/courses/:id/syllabus/:id
// @access  Public
const getSyllabus = asyncHandler(async (req, res) => {
    const syllabus = await Syllabus.findById(req.params.id)
    if (syllabus) {
        res.json(syllabus)
    } else {
        res.status(404)
        throw new Error('Syllabus not found')
    }
})

// @desc    Fetch professor syllabus by id
// @route   GET /api/courses/:id/syllabus/:id
// @access  Private / Prof-courseOwner
const getProfessorSyllabusById = asyncHandler(async (req, res) => {
    const professor = req.professor._id
    const syllabus = await Syllabus.findById(req.params.id)
    let courseID = syllabus.courseID
    const course = await Course.findById(courseID)
    if (course.professor.toString() == professor) {
        res.json(syllabus)
    } else {
        res.status(400)
        throw new Error('You do not have access to this page')
    }
})

// @desc    Delete a syllabus
// @route   DELETE /api/courses/:id/syllabus/:id
// @access  Pivate/Professor
const deleteSyllabus = asyncHandler(async (req, res) => {
    const syllabus = await Syllabus.findById(req.params.id)

    if (syllabus) {
        await syllabus.remove()
        res.json({message: 'Syllabus removed'})
    } else {
        res.status(404)
        throw new Error('Syllabus not found')
    }
})

// @desc    Create a new syllabus
// @route   POST /api/courses/:id
// @access Private/Professor | Course owner
const createSyllabus = asyncHandler(async (req, res) => {
    const syllabus = new Syllabus({
        title: req.body.title,
        description: req.body.description,
        estimatedHours: req.body.estimatedHours,
        courseID: req.body.courseID
    })

    const createdSyllabus = await syllabus.save()
    const course = await Course.findById(req.body.courseID)
    course.syllabus.push(createdSyllabus)
    console.log(course)
    course.save()
    res.status(201).json(createdSyllabus)
})

// @desc    Create Syllabus video
// @route   POST /api/courses/:id/syllabus/:id/create-ressource
// @access  Private / Prof-courseOwner
const createSyllabusVideo = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        video,
    } = req.body

    const professor = req.professor._id
    const syllabus = await Syllabus.findById(req.params.id)
    const videoExists = await syllabus.vidoes.findOne({ title })
    if (videoExists) {
        res.status(400)
        throw new Error('Video title is taken')
    }
    if (syllabus)
    {
        const vid = {
            title,
            description,
            video,
        }
    
        syllabus.vidoes.push(vid)
        await syllabus.save()
        res.status(201).json({ message: 'Video Added' })
    } else {
        res.status(400)
        throw new Error('Syllabus not found')
    }
    
})

// @desc    Update syllabus
// @route   POST /api/courses/:id/syllabi/:id
// @access  Private/Prefessor | Course owner
const updateSyllabus = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        estimatedHours,
    } = req.body

    const syllabus = await Syllabus.findById(req.params.id)

    if (syllabus) {
        syllabus.title = title,
        syllabus.description = description,
        syllabus.estimatedHours = estimatedHours;

        const updatedSyllabus = await syllabus.save()
        res.json(updatedSyllabus)
    } else {
        res.status(404)
        throw new Error('Syllabuys not found')
    }
})

export {
    getSyllabi,
    getSyllabus,
    createSyllabus,
    updateSyllabus,
    deleteSyllabus,
    getProfessorSyllabusById,
    getProfessorCourseSyllabi,
    createSyllabusVideo,
}