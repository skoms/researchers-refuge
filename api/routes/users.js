const express = require('express');
const router = express.Router();

// Import middlewares
const asyncHandler = require('../middleware/async-handler');
const authenticateLogin = require('../middleware/user-auth');

// Import User Model
const { User } = require('../models');

// GET authenticated user info
router.get('/', authenticateLogin, asyncHandler(async (req, res) => {
  const user = await User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
    where: { emailAddress: req.currentUser.emailAddress }
  });
  res.status(200).json(user);
}));

// POST creates a new user and stores it in database if it meet requirements
router.post('/', asyncHandler(async (req, res) => {

  // Commented out to prevent conflicting with project requirements, but feel free to uncomment to see that it works perfectly :)
  // Setting validation up here, to not collide with hashing of the password on the model, see error message for requirements
  // const passwordIsValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/.test(req.body.password);
  // if (passwordIsValid) {
  //   await User.create(req.body);
  //   res.location('/').status(201).end();
  // } else {
  //   res.status(400).json({ message: "The password must contain between 8 and 20 characters including at least 1 uppercase, 1 lowercase and one digit." });
  // }

  await User.create(req.body);
  res.location('/').status(201).end();
}));

module.exports = router;