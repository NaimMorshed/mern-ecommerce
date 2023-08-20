const express = require("express");
const { getUser, getProfile } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.get("/profile", getProfile);

module.exports = userRouter;
