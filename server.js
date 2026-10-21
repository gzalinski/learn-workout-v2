import 'colors'
import express from 'express'
import authRoutes from './app/auth/auth.routes.js'

dotenv.config()

const app = express()

async function main() {
	if (!process.env.PORT) {
		console.error('Error: PORT environment variable is not defined'.red.bold)
		process.exit(1)
	}

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'))
	}

	app.use(express.json())
	app.use('/api/auth', authRoutes)
	app.listen(
		process.env.PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
				.bold
		)
	)
}

main()
