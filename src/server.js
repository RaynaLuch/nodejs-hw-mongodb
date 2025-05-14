import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

// Читаємо змінну оточення PORT
const PORT = Number(process.env.PORT);

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Відповідь, якщо контакт не знайдено
    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      data: contact,
    });
  });

  app.use((err, req, res, next) => {
    res.status(400).json({
      message: 'Something went wrong',
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
