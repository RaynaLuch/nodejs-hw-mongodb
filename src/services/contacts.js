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

export const createContact = (contact) => {
  console.log(contact);
  return Contact.create(contact);
};

export const updateContact = (contactId, contact) => {
  console.log(contactId);
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
};

export const deleteContact = (contactId) => {
  console.log(contactId);
  return Contact.findByIdAndDelete(contactId);
};
