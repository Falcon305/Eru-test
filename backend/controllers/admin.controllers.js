import asyncHandler from "express-async-handler"
import Admin from '../models/admin.model.js'

// @desc Auth Admin and get token
// @route POST /api/auth/login
// @access 

const authAdmin = asyncHandler(async (req, res) => {
    const {email, username, password} =  req.body
    res.send(email, password, username)
})