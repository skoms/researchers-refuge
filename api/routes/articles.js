const express = require('express');
const router = express.Router();

// Import middlewares
const asyncHandler = require('../middleware/async-handler');
const authenticateLogin = require('../middleware/user-auth');

// Import Article and User Model
const { Article, User } = require('../models');

// GET finds and displays all the articles and basic info on their owners
router.get('/', asyncHandler(async (req, res) => {
  const articles = await Article.findAll(({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress'] } ] }));

  res.status(200).json(articles);
}));

// GET finds specified article and basic info on its owner
router.get('/:id', asyncHandler(async (req, res) => {
  const article = await Article.findByPk(req.params.id, { 
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress'] } ] });
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).end();
  }
}));

// GET finds and displays all the articles and basic info on their owners
router.get('/owner/:id', asyncHandler(async (req, res) => {
  const articles = await Article.findAll(({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId'], 
    include: [{ model: User, attributes: ['firstName', 'lastName', 'emailAddress']}],
    where: { userId: req.params.id }
  }));

  if (articles) {
    res.status(200).json(articles);
  } else {
    res.status(404).end();
  }
}));

// POST creates a new article and assigns the logged authenticated user as its owner
router.post('/', authenticateLogin, asyncHandler(async (req, res) => {
  req.body.userId = req.currentUser.id;
  const article = await Article.create(req.body);

  res.location(`/api/articles/${article.id}`).status(201).end();
}));

// PUT updates the chosen article if the user is authenticated to do so
router.put('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: article.userId }});

  if (owner.emailAddress === req.currentUser.emailAddress) {
    await Article.update(req.body, { where: { id: req.params.id } })
      .then(response => {
        if (!response.name) {
          res.status(204).end()
        }
      });
  } else {
    res.status(403).end();
  }
}));

// DELETE deletes the chosen article if the user is authenticated to do so
router.delete('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: article.userId }});
  
  if (owner.emailAddress === req.currentUser.emailAddress) {
    await Article.destroy({ where: { id: req.params.id } })
      .then(res.status(204).end());
  } else {
    res.status(403).end();
  }
}));

module.exports = router;