const { User } = require('../models/user');
const { HttpError } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email already in use");
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ ...req.body, password: hashPassword });
        res.status(201).json({
            email: newUser.email,
            password: newUser.password,
        })
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw HttpError(401, "Email or password is wrong");
        }
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        res.json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
}