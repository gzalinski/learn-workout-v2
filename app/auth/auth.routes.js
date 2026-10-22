import express from 'express'
import { authRegister, authUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(authRegister)

export default router
