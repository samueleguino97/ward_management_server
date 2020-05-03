const router = require('express').Router();
const { login } = require('./handlers');
const { generateCrudRoutes } = require('../../db/helpers');
router.post('/login', login);
router.post('/register');
router.use('/users', generateCrudRoutes('users'));

module.exports = router;
