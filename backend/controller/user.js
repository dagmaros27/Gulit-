import asyncHandler from "express-async-handler";
import User from "../model/user.js";
import { generateToken } from "../utils/generateToken.js";

const asyncUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).send({
      message: "Invalid email or password",
    });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    password,
    name,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
});

export { asyncUser, registerUser, getUser };
