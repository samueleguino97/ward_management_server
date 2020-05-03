const { checkEmailAndPassword, generateUserToken, hashPassword, checkEmail } = require('./helpers');
const { saveDocumentTo } = require('../../db/helpers');

module.exports = {
	login: async function(req, res) {
		try {
			const credentials = req.body;
			const { email, password } = credentials;
			const userWithValidCredentials = await checkEmailAndPassword(email, password);
			if (userWithValidCredentials) {
				const token = generateUserToken(userWithValidCredentials);
				res.status(200).send(token);
			} else {
				res.status(400).send(error);
			}
		} catch (error) {
			res.status(500).send(error);
		}
	},
	register: async (req, res) => {
		const { data, email, password } = req.body;
		const userIsAlreadyRegistered = await checkEmail(email);
		if (userIsAlreadyRegistered) {
			res.status(400).send('Youre already on the app');
			return;
		}
		const { hashed, salt } = hashPassword(password);
		const userToBeCreated = { ...data, password: hashed, salt };
		await saveDocumentTo('users', userToBeCreated);
		res.status(200).send('User Created');
	}
};
