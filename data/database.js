// data/database.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'contacts';

let client;

async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      console.log('Connected successfully to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
  return { client, db: client.db(dbName) };
}

module.exports = { connectToMongoDB };
