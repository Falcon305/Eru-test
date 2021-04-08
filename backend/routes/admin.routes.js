import express from 'express'
const router = express.Router()

import {
    authAdmin,
} from '../controllers/admin.controllers.js'

router.post('/login', authAdmin)

export default router