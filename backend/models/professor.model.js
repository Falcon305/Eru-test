import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const professorSchema = mongoose.Schema (
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
        },
        isValid: {
            type: Boolean,
            default: true,
            required: false,
        }
    },
    {
        timestamps: true,
    }
)

professorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  professorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
const Professor = mongoose.model('Professor', professorSchema)

export default Professor