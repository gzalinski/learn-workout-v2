import 'colors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './app/auth/auth.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './prisma.js'

const app = express()

async function main() {
	const PORT = process.env.PORT

	if (!PORT) {
		console.error('Error: PORT environment variable is not defined'.red.bold)
		process.exit(1)
	}

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}

	app.use(express.json())
	app.use('/api/auth', authRoutes)

	app.use(notFound)
	app.use(errorHandler)

	app.listen(PORT, () => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
				.bold
		)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async error => {
		console.error(error)
		await prisma.$disconnect()
		process.exit(1)
	})
