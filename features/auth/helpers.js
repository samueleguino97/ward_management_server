const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');
const bcrypt = require('bcrypt');
const { getDatabaseDocument } = require('../../db/helpers');

module.exports = {
	checkEmail: async (email) => {
		const document = await getDatabaseDocument('users', { query: { email } });
		if (document) {
			return document;
		} else {
			return false;
		}
	},
	checkEmailAndPassword: async (email, password) => {
		const document = await getDatabaseDocument({ query: { email, password } });
		if (document) {
			return document;
		} else {
			return false;
		}
	},
	generateUserToken(user) {
		const { email, displayName } = user;
		const userToken = jwt.sign({ email, displayName }, jwtSecret, { expiresIn: '24h' });
		return userToken;
	},
	hashPassword: (password) => {
		const salt = bcrypt.genSaltSync();
		const hashed = bcrypt.hashSync(password, salt);
		return { hashed, salt };
	},
	verifyToken: (req, res, next) => {
		let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, jwtSecret, (err, decoded) => {
				if (err) {
					return res.json({
						success: false,
						message: 'Token is not valid'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.json({
				success: false,
				message: 'Auth token is not supplied'
			});
		}
	}
};
