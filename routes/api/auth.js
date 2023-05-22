const express = require('express');


const { validateBody } = require("../../middlewares");
const { schemas } = require('../../models/user');
const router = express.Router();


module.exports = router;