// -------------------------------------------- IMPORTS
import { dbConnect } from "../config/db.js";
import { ObjectId } from "mongodb";

// -------------------------------------------- CONST
const COL_USERS = process.env.COL_USERS;

// -------------------------------------------- DB FUNCTIONS

// -------------------------------------------- GET USERS
export const getBoats = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_USERS).find({}).toArray();
    if (result) return res.status(200).json(result);
    else {
      return res.status(500).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
};

// -------------------------------------------- ADD USER
export const addBoat = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_USERS).insertOne({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    if (result) return res.status(200).json(result);
    else {
      return res.status(500).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
};

// -------------------------------------------- DELETE USER
export const deleteBoat = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_USERS).deleteOne({ _id: new ObjectId(req.body.id) });
    if (result) return res.status(200).json(result);
    else {
      return res.status(500).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
};

// -------------------------------------------- EDIT USER
export const editBoat = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_USERS).updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        },
      }
    );
    if (result) return res.status(200).json(result);
    else {
      return res.status(500).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
};
