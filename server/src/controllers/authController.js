const bcrypt = require('bcryptjs');

const asyncHandler = require("../middlewares/asyncHandlerMiddleware");
const ApiError = require('../utils/apiError');

const User = require("../models/userModel");
const createToken = require('../utils/createToken');

// @desc Signup
// @route GET /api/v1/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({data: user, token});
  // Broadcast created user profile to users.
  sendNewUser(user);
});

// @desc Login
// @route GET /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email or username in the body (validator)
  // 2) check if user exists & password is correct
  const user = await User.findOne({ email: req.body.user }) ||  await User.findOne({ username: req.body.user });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect email or password!', 401))
  }
  // 3) generate token
  const token = createToken(user._id);

  // 4) send response to client side
  res.status(200).json({data: user, token});
});

/**
 * Broadcast created user profile to users.
 * @param user
 */
const sendNewUser = user => {
  // let data = { name, username, avatar } = user;
  let data = user;
  io.emit('new_user', data);
};

// @desc Update profile
// @route post /api/v1/auth/profile
// @access Protected
exports.profile = asyncHandler(async (req, res, next) => {
  // Get user from request
  const user = req.user;

  // Update user data
  user.name = req.body.name;
  user.about = req.body.about;
  user.avatar = req.file ? req.file.filename : user.avatar;
  user.save()
  .then(updated => {
      // Broadcast the profile changes to users.
      sendUpdateUser(updated);
      res.json();
  })
  .catch(next);
});

/**
 * Broadcast the profile changes to users.
 * @param user
 */
const sendUpdateUser = (user) => {
  io.emit('update_user', user.getData());
};