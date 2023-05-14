const express = require('express');

const contactController = require('../../controllers/contacts-controllers');
const router = express.Router();



router.get('/', contactController.getAllContacts);

router.get('/:contactId', contactController.getContactById);

router.post('/', contactController.addContact)

router.delete('/:contactId', contactController.deleteContactById)

router.put('/:contactId', contactController.updateContactById)

module.exports = router;
