// -------------------------------------------- IMPORTS
import { dbConnect } from "../config/db.js";
import { ObjectId } from "mongodb";

// -------------------------------------------- CONST
const COL_BOATS = process.env.COL_BOATS;

// -------------------------------------------- DB FUNCTIONS

// -------------------------------------------- GET BOATS
export const getBoats = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_BOATS).find({}).toArray();
    if (result) return res.status(200).json(result);
    else {
      return res.status(500).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
};

// -------------------------------------------- ADD BOAT
export const addBoat = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_BOATS).insertOne({
      constructionYear: req.body.constructionYear,
      serialNumber: req.body.serialNumber,
      material: req.body.material,
      bootType: req.body.bootType,
    });
    if (result) return res.status(200).json(result);
    else {
      return res.status(500).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
};

// -------------------------------------------- DELETE BOAT
export const deleteBoat = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_BOATS).deleteOne({ _id: new ObjectId(req.body.id) });
    if (result) return res.status(200).json(result);
    else {
      return res.status(500).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
};

// -------------------------------------------- EDIT BOAT
export const editBoat = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_BOATS).updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          constructionYear: req.body.constructionYear,
          serialNumber: req.body.serialNumber,
          material: req.body.material,
          bootType: req.body.bootType,
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
