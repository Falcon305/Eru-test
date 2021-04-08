import Course from '../models/courses.model.js'

module.exports = {
    // Get course by ID
    getCourseById: function (req, res, next) {
        console.log(req.body)
        Course.findById(req.params.courseId, function(err, courseInfo) {
            if (err)
                next(err)
            else {
                res.json({status:"success", message:"Course Found", data:{courses: courseInfo}})
            }
        })
    },
    // Get the complet list of courses
    getAllCourses: function (req, res, next) {
        let coursesList = []

        Course.find({}, function(err, courses) {
            if (err)
                next(err)
            else {
                for (let course of courses) {
                    coursesList.push({id:course._id, title:Course.title, description:course.description,
                    duration:course.duration, image:course.image, rating:course.rating, isPublic:course.isPublic,
                    certificate:course.certificate, tags:course.tags})
                }
                res.json({status:"success", message:"Courses List found", data:{courses: coursesList}})
            }
        })
    },
    // Update course by id
    updateCourseById: function (req, res, next) {
        Course.findByIdAndUpdate(req.params.courseId, {title:req.body.title}, function(err, courseInfo) {
            if (err)
                next(err)
            else {
                res.json({status:"success", message:"Course updated successfully", data:null})
            }
        })
    },
    // Delete Course by id
    deleteCourseById: function (req, res, next) {
        Course.findByIdAndRemove(req.params.courseId, function(err, courseInfo) {
            if (err)
                next(err)
            else {
                res.json({status:"success", message:"Course Deleted Successfully", data:null})
            }
        })
    },
    // Get Data and create course
    createCourse: function(req, res, next) {
        Course.create({title:req.body.title, description:req.body.description,duration:req.body.duration,
                        difficulty:req.body.difficulty, isPublic:req.body.isPublic, certificate:req.body.certificate}, 
            function(err, result) {
                if (err)
                    next(err)
                else
                    res.json({status:"success", message:"Course Created Successfully", data:null})
        })
    }
}