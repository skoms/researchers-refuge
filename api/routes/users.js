const express = require('express');
const router = express.Router();

// Import middlewares
const asyncHandler = require('../middleware/async-handler');
const authenticateLogin = require('../middleware/user-auth');

// Import Models
const { Article, User, Topic, Category } = require('../models');

// Import Op
const { Sequelize } = require('../models');
const { Op } = Sequelize;

// GET authenticated user info
router.get('/', authenticateLogin, asyncHandler(async (req, res) => {
  const user = await User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'occupation', 'mostActiveField', 'articles', 'credits', 'followers', 'following', 'imgURL'],
    where: { emailAddress: req.currentUser.emailAddress }
  });
  res.status(200).json(user);
}));

// GET finds specified user by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, { 
    attributes: ['id', 'firstName', 'lastName', 'occupation', 'mostActiveField', 'articles', 'credits', 'followers', 'following', 'imgURL']});
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).end();
  }
}));

// GET find users by query
router.get('/query/:query', asyncHandler(async (req, res) => {
  const users = await User.findAll({ 
    attributes: ['id', 'firstName', 'lastName', 'occupation', 'mostActiveField', 'articles', 'credits', 'followers', 'following', 'imgURL'],
    where: { 
      [Op.or]: [
      {
        firstName:  { 
          [Op.substring]: req.params.query 
        }
      },
      {
        lastName:  { 
          [Op.substring]: req.params.query 
        }
      }
    ]}});

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).end();
  }
}));

// POST creates a new user and stores it in database if it meet requirements
router.post('/', asyncHandler(async (req, res) => {

  // Commented out for easier testing, but feel free to uncomment to see that it works perfectly :)
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

// PUT updates the chosen user if authenticated to do so
router.put('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const owner = await User.findOne({ where: { id: req.params.id } });
  if (owner.emailAddress === req.currentUser.emailAddress) {
    await User.update(req.body, { where: { id: req.params.id } })
      .then(response => {
        if (!response.name) {
          res.status(204).end()
        }
      });
  } else {
    res.status(403).end();
  }
}));

// PUT updates 'followers' for the target and 'following' for the follow/unfollow, and returns both Users to update them
router.put('/:id/follow', authenticateLogin, asyncHandler(async (req, res) => {
  // Fetches the two users from the API
  const user = await User.findOne({
    attributes: [ 'id', 'following', 'emailAddress' ],
    where: { emailAddress: req.currentUser.emailAddress }
  });
  const target = await User.findOne({ 
    attributes: [ 'id', 'followers' ],
    where: { id: req.params.id } });
  
  if (user.emailAddress === req.currentUser.emailAddress) {
    // Programatically checks and updates for both follow and unfollow, making sure you cant follow more than once
    const following = user.following.split(',');
    const followers = target.followers.split(',');
    const updatedFollowing = !following.includes(target.id.toString()) ? [...following, target.id] : following.filter( id => id !== target.id.toString() );
    const updatedFollowers= !followers.includes(user.id.toString()) ? [...followers, user.id] : followers.filter( id => id !== user.id.toString() );

    // Update the two users with the respective data
    const userRes = await User.update(
      { following: updatedFollowing }, 
      { where: { emailAddress: req.currentUser.emailAddress } });
    const targetRes = await User.update(
      { followers: updatedFollowers }, 
      { where: { id: req.params.id } });

    // If it returns any data it was fail, so we check if theres any return
    if (!userRes.name && !targetRes.name) {
      const user = await User.findOne({ attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'occupation', 'mostActiveField', 'articles', 'credits', 'followers', 'following', 'imgURL'], 
        where: { emailAddress: req.currentUser.emailAddress },
      });
      const target = await User.findOne({ attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'occupation', 'mostActiveField', 'articles', 'credits', 'followers', 'following', 'imgURL'],  
        where: { id: req.params.id } });
      res.status(200).json({ user, target });
    }
  } else {
    res.status(403).end();
  }
}));

module.exports = router;