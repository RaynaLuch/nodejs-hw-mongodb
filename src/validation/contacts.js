import Joi from 'joi';
//import { isValidObjectId } from 'mongoose';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  //photo: Joi.string().empty(),
  // userId: Joi.string().custom((value, helper) => {
  //   if (value && !isValidObjectId(value)) {
  //     return helper.message('User id should be a valid mongo id');
  //   }
  //   return true;
  // }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
