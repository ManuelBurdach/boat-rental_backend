// -------------------------------------------- IMPORTS
import { MongoClient } from "mongodb";

// -------------------------------------------- CONST & VARIABLES
const URI = process.env.URI;
const DB = process.env.DB;
const COL = process.env.COL;
const client = new MongoClient(URI);
let db;

// -------------------------------------------- DB CONNTECT

const dbConnect = async () => {
  if (db) return db;
  else {
    await client.connect();
    db = client.db(DB);
    return db;
  }
};
