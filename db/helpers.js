const { getDb } = require("./config");
const mongodb = require("mongodb");
const db = getDb();
function saveDocumentTo(collection = "", documentData = {}) {
  return db.collection(collection).insertOne(documentData);
}
function updateDoc(collection = "", docId = "", docData = {}) {
  const query_id = new mongodb.ObjectId(docId);

  return db
    .collection(collection)
    .updateOne({ _id: query_id }, { $set: docData });
}

async function getDatabaseDocument(collection, options = {}) {
  const query = options.query || {};
  const documents = await db.collection(collection).find(query).toArray();
  const document = documents[0];
  return document;
}
async function getDatabaseDocuments(collection, options = {}) {
  const query = options.query || {};
  const documents = await db.collection(collection).find(query).toArray();
  return documents;
}
async function deleteDocument(collection, options = {}) {
  const query = options.query || {};
  if (query._id) {
    query._id = new mongodb.ObjectId(query._id);
  }
  const deleted = await db.collection(collection).deleteOne(query);
  return deleted;
}

function generateCrudRoutes(collection = "") {
  async function create(req, res) {
    const data = req.body;
    res.send(await saveDocumentTo(collection, data));
  }
  async function readAll(req, res) {
    const { query } = req;

    const data = await getDatabaseDocuments(collection, query);
    res.send(data);
  }
  async function readOne(req, res) {
    const { query, params } = req;
    const document = await getDatabaseDocument(collection, {
      ...query,
      ...params,
    });
    res.send(document);
  }
  async function updateOne(req, res) {
    const { query, body } = req;
    delete body._id;
    const document = await updateDoc(collection, query._id, body);
    res.send(document);
  }
  async function deleteOne(req, res) {
    const { query } = req;
    const document = await deleteDocument(collection, { query });
    res.send(document);
  }
  let router = require("express").Router();

  router.post("/", create);
  router.get("/", readAll);
  router.get("/:id", readOne);
  router.put("/:id", updateOne);
  router.delete("/:id", deleteOne);
  return router;
}
module.exports = {
  saveDocumentTo,
  getDatabaseDocument,
  getDatabaseDocuments,
  generateCrudRoutes,
};
