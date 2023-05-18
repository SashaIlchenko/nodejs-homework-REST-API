const express = require('express');

const contactController = require('../../controllers/contacts-controllers');

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require('../../models/contacts');
const router = express.Router();

router.get('/', contactController.getAllContacts);

router.get('/:contactId', isValidId, contactController.getContactById);

router.post('/', validateBody(schemas.addSchema), contactController.addContact);

router.patch('/:contactId/favourite', isValidId, validateBody(schemas.updateFavoriteSchema), contactController.updateStatusContact);

router.delete('/:contactId', isValidId, contactController.deleteContactById);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), contactController.updateContactById);

module.exports = router;
