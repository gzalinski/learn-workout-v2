import jwt from 'jsonwebtoken'

export const generateToken = id => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
		expiresIn: '30d'
	})
}
