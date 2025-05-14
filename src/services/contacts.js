import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  console.log('contacts found' + contacts.length);
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  console.log(contactId);

  return contact;
};
