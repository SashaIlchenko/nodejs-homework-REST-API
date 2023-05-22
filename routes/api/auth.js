const express = require('express');
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require('../../models/user');
const userController = require('../../controllers/user-controllers')
const router = express.Router();
router.post('/register', validateBody(schemas.registerSchema), userController.register)
router.post('/login', validateBody(schemas.loginSchema), userController.login)
router.get('/current', authenticate, userController.getCurrentUser)
router.post('/logout', authenticate, userController.logOut)
module.exports = router;