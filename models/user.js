const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require('../helpers');
const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: '',
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    subscription: Joi.string(),
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
});
const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
})
const userEmailSchema = Joi.object({
    email: Joi.string().required(),
});
const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    userEmailSchema
};
const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}