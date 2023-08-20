const data = require("../data");
const User = require("../models/userModel");

const seedUser = async (req, res, next) => {
  try {
    // delete all existing user
    await User.deleteMany({});

    // create new user
    const users = await User.insertMany(data.users);

    // success response
    return res.status(201).json(users);

  } catch (error) {
    next(error);
  }
}

module.exports = { seedUser };