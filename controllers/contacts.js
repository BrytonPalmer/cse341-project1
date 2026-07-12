const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    const contacts = await result.toArray();

    if (!contacts[0]) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contacts[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('contacts').updateOne(
      { _id: contactId },
      { $set: contact }
    );

    if (response.modifiedCount > 0) {
      return res.status(200).json(response);
    }

    res.status(404).json({ message: 'Contact not found or no changes made' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      return res.status(200).json({ message: 'Contact deleted' });
    }

    res.status(404).json({ message: 'Contact not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};