const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = fs.readFile(contactsPath);
  return data;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = JSON.parse(contacts).find((el) => el.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const listOfContacts = JSON.parse(contacts);
  const index = listOfContacts.findIndex((el) => el.id === contactId);

  if (index === -1) {
    return null;
  }

  const [contact] = listOfContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };

  const listOfContacts = JSON.parse(contacts);
  listOfContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(listOfContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
