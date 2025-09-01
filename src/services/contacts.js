import { Contact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
