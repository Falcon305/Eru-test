import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ownerSchema = mongoose.Schema (
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

ownerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

ownerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt.hash(this.password, salt)
})

const Owner = mongoose.model('Owner', ownerSchema)

export default Owner


