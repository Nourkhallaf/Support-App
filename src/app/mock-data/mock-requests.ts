import { Contact } from '../models/contact.model';

export const MOCK_CONTACT_REQUESTS: Contact[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    content: 'Request details for John',
    captcha: '123456',
    status: 'submitted',
    createdDate: '2023-09-01T12:00:00'
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '0987654321',
    content: 'Request details for Jane',
    captcha: '654321',
    status: 'resolved',
    createdDate: '2024-09-02T14:00:00'
  },
  {
    id: 3,
    name: 'Daniel John',
    email: 'johnDa@example.com',
    phone: '0856524321',
    content: 'Request details for Daniel John',
    captcha: '9652254',
    status: 'resolved',
    createdDate: '2023-09-03T10:00:00'
  }
];
