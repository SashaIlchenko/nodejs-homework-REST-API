const { Contact } = require('../models/contacts');
const { HttpError } = require('../helpers');

const getAllContacts = async (req, res, next) => {

    try {
        const result = await Contact.find();
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
        if (!result) {
            throw HttpError(404, 'Not found!');

        }
        res.json(result)

    } catch (err) {
        next(err);
    }
};

const addContact = async (req, res, next) => {
    try {
        const result = await Contact.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const updateContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!result) {
            throw HttpError(404, 'Not found!');
        }
        res.json(result);
    } catch (err) {
        next(err);
    }

};

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const deleteContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
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
    updateStatusContact,
    deleteContactById,

}