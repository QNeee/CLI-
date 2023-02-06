const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json')
const contactsText = 'utf-8'

async function listContacts() {
    try {
        const response = await fs.readFile(contactsPath, contactsText)
        const data = JSON.parse(response);
        console.table(data);
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        contactId = contactId.toString();
        const contacts = await JSON.parse((await fs.readFile(contactsPath)).toString())
        const contact = await contacts.filter(item => item.id === contactId);
        return console.table(contact);

    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        contactId = contactId.toString();
        const contacts = await JSON.parse((await fs.readFile(contactsPath)).toString());
        const contactToRemove = await contacts.findIndex(item => item.id === contactId);
        contacts.splice(contactToRemove, 1)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        listContacts();
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    const newContact = {
        name,
        email,
        phone
    }
    const contacts = await JSON.parse((await fs.readFile(contactsPath)).toString());
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.table(contacts);
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}