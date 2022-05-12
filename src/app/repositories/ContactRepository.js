const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Lucas',
    email: 'lucas@mail.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Yasmim',
    email: 'yasmim@mail.com',
    phone: '55548987006',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.id === id)));
  }

  findByEmail(email) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.email === email)));
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(), name, email, phone, category_id,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id, name, email, phone, category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
      resolve(updatedContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id === id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
