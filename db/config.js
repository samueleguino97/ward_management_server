const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'sbm';

// Create a new MongoClient
const client = new MongoClient(url);
let database = null;
async function connectToDb() {
	try {
		await client.connect();

		const db = client.db(dbName);
		database = db;
		return db;
	} catch (error) {
		console.error(error);
	}
}
function getDb() {
	return client.db(dbName);
}
module.exports = { connectToDb, getDb };
// Use connect method to connect to the Server
