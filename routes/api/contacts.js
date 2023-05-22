const express = require('express');

const contactController = require('../../controllers/contacts-controllers');

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require('../../models/contacts');
const router = express.Router();

router.get('/', authenticate, contactController.getAllContacts);

router.get('/:contactId', authenticate, contactController.getContactById, isValidId);

router.post('/', authenticate, validateBody(schemas.addSchema), contactController.addContact);

router.patch('/:contactId/favourite', authenticate, validateBody(schemas.updateFavoriteSchema), contactController.updateStatusContact, isValidId);

router.delete('/:contactId', authenticate, contactController.deleteContactById, isValidId);

router.put('/:contactId', authenticate, validateBody(schemas.addSchema), contactController.updateContactById, isValidId);

module.exports = router;
