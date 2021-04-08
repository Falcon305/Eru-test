import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const studentSchema = mongoose.Schema (
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        courses: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false,
            ref: "Courses",
        },
    },
    {
        timestamps: true,
    }
)

studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
const Student = mongoose.model('Student', studentSchema)

export default Student