import { Contact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId: userId });
  const contactsCount = await Contact.find({ userId: userId })
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

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    userId: userId,
  }); //findById(contactId);
  console.log('!!!', contactId, userId);
  return contact;
};

export const createContact = (contact) => {
  console.log(contact);
  return Contact.create(contact);
};

export const updateContact = (contactId, userId, contact) => {
  console.log(contactId);
  return Contact.findOneAndUpdate({ _id: contactId, userId: userId }, contact, {
    new: true,
  });
};

export const deleteContact = (contactId, userId) => {
  console.log(contactId);
  return Contact.findByIdAndDelete({ _id: contactId, userId: userId });
};
