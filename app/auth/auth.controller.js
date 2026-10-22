import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Authenticate user
// @route POST /api/auth/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			email: req.body.email
		}
	})

	if (user && (await user.matchPassword(req.body.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

export const authRegister = asyncHandler(async (req, res) => {
	res.json(req.body)
})
