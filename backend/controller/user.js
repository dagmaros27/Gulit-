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
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.body);
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { asyncUser, registerUser, getUser, updateUser };
