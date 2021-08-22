const express = require('express');
const router = express.Router();

// Import other routers
const usersRoute = require('./users');
const articlesRoute = require('./articles');
const topicsRoute = require('./topics');

// Separate the routes into seperate files for better modularity and readability
router.use('/users', usersRoute);
router.use('/articles', articlesRoute);
router.use('/topics', topicsRoute);

// welcomes and redirects users
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to my API, please refer to "/api/users" for users and "/api/articles" for articles'});
});

module.exports = router;