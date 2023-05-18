const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
}




















// const fs = require('fs/promises');
// const path = require('path');
// const contactsPath = path.join(__dirname, '/contacts.json');
// const { nanoid } = require('nanoid');
// console.log(__dirname)

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// }

// const getContactById = async (contactId) => {
//   const data = await listContacts();
//   const contact = data.find(item => item.id === contactId);
//   return contact || null;
// }

// const removeContact = async (contactId) => {
//   const data = await listContacts();
//   const index = data.findIndex(item => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = data.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//   return result;
// }

// const addContact = async (body) => {
//   const data = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...body,
//   }
//   data.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//   return newContact;
// }

// const updateContact = async (contactId, body) => {
//   const data = await listContacts();
//   const index = data.findIndex(item => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   data[index] = {
//     contactId,
//     ...body,
//   }
//   await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
//   return data[index];

// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
