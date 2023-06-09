// -------------------------------------------- IMPORTS
import { dbConnect } from "../config/db.js";
import { ObjectId } from "mongodb";

// -------------------------------------------- CONST
const COL_BOATS = process.env.COL_BOATS;

// -------------------------------------------- DB FUNCTIONS
// -------------------------------------------- GET ALL BOATS
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

// -------------------------------------------- GET ALL STATS
export const getStats = async (req, res) => {
  try {
    const db = await dbConnect();
    const result = await db.collection(COL_BOATS).find({}).toArray();
    const totalBoats = result.length;
    const availableBoats = result.filter((object) => object.available === true).length;
    const reservedBoats = result.filter((object) => object.available === false).length;
    if (result)
      return res.status(200).json({
        totalBoats: totalBoats,
        availableBoats: availableBoats,
        reservedBoats: reservedBoats,
      });
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
      user: req.body.user,
      available: JSON.parse(req.body.available),
      reservations: [],
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
          user: req.body.user,
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

// -------------------------------------------- EXECUTE ONCE (PUT COLLECTION WITH VALIDATION & SCHEMA)
const putCol = async () => {
  const db = await dbConnect();
  const result = await db.createCollection(COL_BOATS, {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "Boat Object Validation",
        required: [
          "constructionYear",
          "serialNumber",
          "material",
          "bootType",
          "user",
          "available",
          "reservations",
        ],
        properties: {
          constructionYear: {
            bsonType: "string",
            description: "'constructionYear' must be a string and is required",
          },
          serialNumber: {
            bsonType: "string",
            description: "'serialNumber' must be a string and is required",
          },
          material: {
            bsonType: "string",
            description: "'material' must be a string and is required",
          },
          bootType: {
            bsonType: "string",
            description: "'bootType' must be a string and is required",
          },
          user: {
            bsonType: "string",
            description: "'user' must be a string and is required",
          },
          available: {
            bsonType: "boolean",
            description: "'available' must be a boolean and is required",
          },
          reservations: {
            bsonType: "array",
            description: "'reservations' must be a array and is required",
          },
        },
      },
    },
  });
};

// putCol();
