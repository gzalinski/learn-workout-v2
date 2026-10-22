import { faker } from '@faker-js/faker'
import argon2 from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { UserFields } from '../utils/utils.user.js'
import { generateToken } from './generate-token.js'

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
	const { name, email, password } = req.body

	const userExists = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			name: faker.person.fullName(),
			password: await argon2.hash(password, 10)
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
