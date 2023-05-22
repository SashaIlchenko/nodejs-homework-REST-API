const express = require('express');
const { validateBody } = require("../../middlewares");
const { schemas } = require('../../models/user');
const userController = require('../../controllers/user-controllers')
const router = express.Router();
router.post('/register', validateBody(schemas.registerSchema), userController.register)

module.exports = router;