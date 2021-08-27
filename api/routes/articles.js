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


// GET finds and displays all the articles and basic info on their owners
router.get('/', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress'] } ] });

  res.status(200).json(articles);
}));

// GET finds and sends back a specific articles by tag
router.get('/tag/:tag', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'], 
    include: [{ model: User, attributes: ['firstName', 'lastName', 'emailAddress']}],
    where: { tags: { [Op.substring]: req.params.tag } }
  });

  if( articles ) {
    res.status(200).json(articles);
  } else {
    res.status(404).end();
  }
}));

// GET finds and sends back specific articles by query
router.get('/query/:query', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'topicId', 'published', 'credits'], 
    include: [{ model: User, attributes: ['firstName', 'lastName', 'emailAddress']}],
    where: { 
      [Op.or]: [
      { title: { [Op.substring]: req.params.query } },
      { topic: { [Op.substring]: req.params.query } },
      { intro: { [Op.substring]: req.params.query } },
      { body:  { [Op.substring]: req.params.query } },
      { tags:  { [Op.substring]: req.params.query } }
    ]}
  });

  if( articles ) {
    res.status(200).json(articles);
  } else {
    res.status(404).end();
  }
}));

// GET finds specified article and basic info on its owner
router.get('/:id', asyncHandler(async (req, res) => {
  const article = await Article.findByPk(req.params.id, { 
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'published', 'credits'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress', 'occupation', 'mostActiveField', 'articles', 'credits', 'followers', 'following', 'imgURL'] } ] });
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).end();
  }
}));

// GET finds and displays all the articles and basic info on their owners
router.get('/owner/:id', asyncHandler(async (req, res) => {
  const articles = await Article.findAll(({
    attributes: ['id', 'title', 'topic', 'intro', 'body', 'tags', 'userId', 'published', 'credits'], 
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
  const topic = await Topic.findOne({ where: { name: req.body.topic } });
  if (topic) {
    req.body.topicId = topic.id;
    const article = await Article.create(req.body);
    res.location(`/api/articles/${article.id}`).status(201).end();
  } else {
    res.status(400).send(`Unable to find '${req.body.topic}'.`);
  }
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