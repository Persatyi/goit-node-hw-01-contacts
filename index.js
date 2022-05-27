const contacts = require("./contacts");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const listOfContacts = await contacts.listContacts();
        console.table(JSON.parse(listOfContacts));
        break;

      case "get":
        const oneContact = await contacts.getContactById(id);
        console.log(oneContact);
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log("new contact", newContact);
        break;

      case "remove":
        const removeContact = await contacts.removeContact(id);
        console.log("Removed contact", removeContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

invokeAction(argv);
