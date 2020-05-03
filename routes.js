module.exports = {
	auth: { router: require('./features/auth/router'), path: '/auth' },
	projects: { router: require('./features/projects/router'), path: '/projects' }
};
