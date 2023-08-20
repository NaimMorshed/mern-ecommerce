const createError = require("http-errors");
const User = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({
      message: "User is returned",
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
