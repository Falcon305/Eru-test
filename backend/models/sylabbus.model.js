import mongoose from "mongoose"
import AutoIncrement from 'mongoose-sequence'

var autoInc = AutoIncrement(mongoose)

const documentSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        doc: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
)

const videoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        video: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
)

const syllabusShcema = mongoose.Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        estimatedHours: {
            type: Number,
            required: false,
        },
        order: {
            type: Number,
        },
        courseID: {
            type: String,
            ref: 'Course',
            required: true,
        },
        videos: [videoSchema],
        documents: [documentSchema],

    },
    {
        timestamps: true,
    }
)

syllabusShcema.plugin(autoInc, {id:'order_seq', inc_field: 'order'})

const Syllabus = mongoose.model('Syllabus', syllabusShcema)

export default Syllabus