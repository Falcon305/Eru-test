import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Student'
        },
    },
    {
        timestamps: true,
    }
)
  
const courseSchema = mongoose.Schema(
    {
        professor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Professor",
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a course title'],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: [true, 'Please add number of weeks'],
            trim: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        reviews: [reviewSchema],
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        isPublic: {
            type: Boolean,
            required: false,
            default: true,
        },
        isActive: {
            type: Boolean,
            required: false,
            default: true,
        },
        certificate: {
            type: Boolean,
            required: true,
            default: true,
        },
        tags: {
            type: [String],
            required:  false,
        },
        syllabus: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Syllabus",
            required: false,
        },
        students: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Students",
            required: false,
        }
    },
    {
        timestamps: true,
    }
)

const Course = mongoose.model('Course', courseSchema)

export default Course