import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 10

const adminSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 32,
    },
  },
  {
    timestamps: true,
  }
)

// Hash user password before saving into the databese

adminSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds)
  next()
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin