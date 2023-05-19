const express = require('express');

const contactController = require('../../controllers/contacts-controllers');

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require('../../models/contacts');
const router = express.Router();

router.get('/', contactController.getAllContacts);

router.get('/:contactId', contactController.getContactById, isValidId);

router.post('/', validateBody(schemas.addSchema), contactController.addContact);

router.patch('/:contactId/favourite', validateBody(schemas.updateFavoriteSchema), contactController.updateStatusContact, isValidId);

router.delete('/:contactId', contactController.deleteContactById, isValidId);

router.put('/:contactId', validateBody(schemas.addSchema), contactController.updateContactById, isValidId);

module.exports = router;
