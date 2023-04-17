// -------------------------------------------- IMPORTS
import { MongoClient } from "mongodb";

// -------------------------------------------- CONST & VARIABLES
const URI = process.env.URI;
const DB = process.env.DB;
const client = new MongoClient(URI);
let db;

// -------------------------------------------- DB CONNTECT
export const dbConnect = async () => {
  if (db) return db;
  else {
    await client.connect();
    db = client.db(DB);
    return db;
  }
};
