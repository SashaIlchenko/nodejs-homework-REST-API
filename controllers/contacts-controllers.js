const contacts = require('../models/contacts');
const { HttpError } = require('../helpers');
const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
})
const getAllContacts = async (req, res, next) => {

    try {
        const result = await contacts.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw HttpError(404, 'Not found!');

        }
        res.json(result)

    } catch (error) {
        next(error);
    }
};

const addContact = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing required name field");
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const updateContactById = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        const { contactId } = req.params;
        if (error) {
            throw HttpError(400, "missing fields");
        }
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            return HttpError(404, 'Not found!');
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

};

const deleteContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            throw HttpError(404, 'Not found!');

        }
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updateContactById,
    deleteContactById,

}