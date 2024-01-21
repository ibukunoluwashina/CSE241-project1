// controllers/users.js
const { connectToMongoDB } = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
    // #swagger.tags=['users']
  try {
    const { db } = await connectToMongoDB();
    const result = await db.collection("users").find();
    const users = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getSingle = async (req, res) => {
     // #swagger.tags=['users']
    try {
      const { db } = await connectToMongoDB();
      const userId = new ObjectId(req.params.Id);
      const user = await db.collection("users").findOne({ _id: userId });
  
      if (user) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(user);
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json("Internal Server Error");
    }
  };


  const createUser = async (req, res) => {
     // #swagger.tags=['users']
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  try {
    const { db } = await connectToMongoDB();
    // const user = {
    //   firstName,
    //   lastName,
    //   email,
    //   favoriteColor,
    //   birthday,
    // };

    const response = await db.collection("users").insertOne({...req.body});

    if (response) {
      res
        .status(201)
        .json({
          message: "User created successfully",
          userId: response.insertedId,
        });
    } else {
      res.status(500).json("Some error occurred while creating the user.");
    }
  } catch (error) {
    console.error("Error creating/updating user:", error);
    res.status(500).json("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
     // #swagger.tags=['users']
  try {
    const { db } = await connectToMongoDB();
    const userId = new ObjectId(req.params.Id);
    const user = {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      ipaddress: req.body.ipaddress,
    };
    const response = await db
      .collection("users")
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the user.");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
     // #swagger.tags=['users']
  try {
    const { db } = await connectToMongoDB();
    const userId = new ObjectId(req.params.id);
    const response = await db.collection("users").remove({ _id: userId }, true);

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
